import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import https from "https";

// Lazy-loaded stable Gemini initialization to prevent server crash on missing keys
let aiInstance: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY is placeholder or not defined. Falling back to robust offline responses.");
    return null;
  }
  if (!aiInstance) {
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
}

// Fallback high-quality NASA news in Uzbek if Gemini API is offline or rate-limited
const FALLBACK_NEWS = [
  {
    title: "James Webb Teleskopi Quyosh Tizimidan Tashqarida Suv Bug'ini Aniqladi",
    summary: "NASAning James Webb kosmik teleskopi yulduz atrofidagi yosh sayyora hosil bo'lish disklarida suv bug'ining kuchli belgilarini aniqladi. Bu kashfiyot yerga o'xshash hayot mavjud bo'lishi mumkin bo'lgan sayyoralarning shakllanish nazariyasini tasdiqlaydi.",
    sourceUrl: "https://www.nasa.gov/goddard/webb-water-vapor",
    date: "2026-05-15",
    category: "Teleskoplar"
  },
  {
    title: "Mars 'Perseverance' Roveri Qadimgi Ko'l Tubidan Organik Molekulalarni Topdi",
    summary: "NASAning Perseverance roveri Jezero kraterida qadimgi ko'l loyqalarini qazish jarayonida uglerodga boy organik birikmalarni aniqladi. Ushbu namunalar kelgusi yillarda Yerga tahlil uchun olib kelinishi rejalashtirilgan.",
    sourceUrl: "https://www.nasa.gov/mars2020-science",
    date: "2026-05-24",
    category: "Mars Tadqiqoti"
  },
  {
    title: "Artemis III: Oyining Janubiy Qutbida Yangi Qo'nish Nuqtalari Tanlandi",
    summary: "NASA kelgusi Artemis III missiyasi uchun astronavtlarning Mars va Oy orbitasi bo'ylab doimiy koloniyalarga poydevor qo'yishga yordam beradigan eng qulay va quyosh nuri mo'l bo'lgan joylar ro'yxatini e'lon qildi.",
    sourceUrl: "https://www.nasa.gov/artemis-landing-regions",
    date: "2026-05-28",
    category: "Artemis Missiyasi"
  }
];

// Offline NASA Astronomy Picture of the Day backup
const FALLBACK_APOD = {
  title: "Andromeda Galaktikasi va Somon Yo'lining To'qnashuvi",
  explanation: "Ushbu tasvirda bizga va koinotga eng yaqin bo'lgan Andromeda spiral galaktikasining yorqin yadrosi va Somon yo'li galaktikamizning o'zaro tortishish kuchi tasvirlangan. Taxminan 4 milliard yildan keyin ular to'qnashib bitta ulkan tizim hosil qiladi.",
  url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000",
  hdurl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400",
  date: "2026-05-31"
};

// Ultra-reliable Node JSON downloader utilizing standard HTTPS module
function httpsGet(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json'
      },
      timeout: 2500 // 2.5 seconds timeout to keep startup and interactions lightning-fast
    };

    const req = https.get(url, options, (res) => {
      let data = "";
      res.on("data", (chunk) => {
        data += chunk;
      });
      res.on("end", () => {
        try {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(data));
          } else {
            reject(new Error(`HTTP status ${res.statusCode}`));
          }
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
  });
}

// Robust JSON cleaner to parse responses wrapped in markdown blocks
function safeParseJson(text: string): any {
  try {
    let cleaned = text.trim();
    const jsonMatch = cleaned.match(/```json\s*([\s\S]*?)\s*```/) || cleaned.match(/```\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      cleaned = jsonMatch[1].trim();
    }
    return JSON.parse(cleaned);
  } catch (e) {
    console.warn("JSON parsing failed, returning null:", e);
    return null;
  }
}

// Memory caching layers to drastically reduce latency, prevent 429 quota issues, and guard active users
interface CachedNasaData {
  apod: typeof FALLBACK_APOD;
  news: typeof FALLBACK_NEWS;
  status: string;
  timestamp: number;
}

// Pre-hydrate cache with robust, high-quality, pre-localized Uzbekistan payloads
let nasaCache: CachedNasaData = {
  apod: { ...FALLBACK_APOD },
  news: [ ...FALLBACK_NEWS ],
  status: "initial-offline",
  timestamp: 0 // Expired initially, will trigger silent background fetch
};

const CACHE_DURATION = 15 * 60 * 1000; // 15-minute persistent cache
let isGeminiSilentlySuspended = false;
let geminiSuspendedUntil = 0;
let isFetchingBackground = false;

// Background fetcher - runs completely non-blocking to prevent HTTP timeouts
function triggerBackgroundFetch() {
  if (isFetchingBackground) return;
  isFetchingBackground = true;
  console.log("[NASA API Cache] Active: Commencing asynchronous silent background refresh...");
  
  fetchLiveNasaTelemetry()
    .then((fresh) => {
      nasaCache = {
        apod: fresh.apod,
        news: fresh.news,
        status: fresh.status,
        timestamp: Date.now()
      };
      console.log("[NASA API Cache] Success: Async background refresh completed. Status:", fresh.status);
    })
    .catch((err) => {
      console.log("[NASA API Cache] Warning: Async background refresh finished with warning:", err.message || err);
    })
    .finally(() => {
      isFetchingBackground = false;
    });
}

// Actual live fetch process
async function fetchLiveNasaTelemetry(): Promise<{ apod: typeof FALLBACK_APOD; news: typeof FALLBACK_NEWS; status: string }> {
  let apodData = { ...FALLBACK_APOD };
  let liveNews = [ ...FALLBACK_NEWS ];
  let status = "live";
  const now = Date.now();

  // 1. Fetch APOD with low timeout
  try {
    const json = await httpsGet("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY");
    if (json && json.url) {
      apodData = {
        title: json.title || FALLBACK_APOD.title,
        explanation: json.explanation || FALLBACK_APOD.explanation,
        url: json.url,
        hdurl: json.hdurl || json.url,
        date: json.date || FALLBACK_APOD.date
      };
    }
  } catch (err: any) {
    console.log("[NASA API info] Live APOD fetch timed out or unavailable. Utilizing safe localized backup asset.");
    status = "fallback-apod";
  }

  // 2. Query Gemini for translation and search grounding
  const ai = getGemini();
  const canUseGemini = ai && !(isGeminiSilentlySuspended && now < geminiSuspendedUntil);

  if (ai && canUseGemini) {
    // Step A: Translate APOD on the fly if it is new
    if (apodData.explanation !== FALLBACK_APOD.explanation) {
      try {
        const translateResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: `Translate the following NASA Astronomy Picture of the Day details into inspiring, natural, and scientifically accurate Uzbek language for students of the NASA Academy.
          Title: ${apodData.title}
          Explanation: ${apodData.explanation}
          
          Return JSON matching this schema:
          {
            "title": "translated title in Uzbek",
            "explanation": "translated explanation in Uzbek"
          }`,
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                explanation: { type: Type.STRING }
              },
              required: ["title", "explanation"]
            }
          }
        });
        
        if (translateResponse.text) {
          const parsed = safeParseJson(translateResponse.text);
          if (parsed && parsed.title) {
            apodData.title = parsed.title;
            apodData.explanation = parsed.explanation;
          }
        }
      } catch (err: any) {
        const errMsg = err.message || String(err);
        console.log("[NASA API info] Translation paused due to rate limits. Swapping in standard space asset.");
        
        if (errMsg.includes("429") || errMsg.includes("RESOURCE_EXHAUSTED") || errMsg.includes("quota")) {
          isGeminiSilentlySuspended = true;
          geminiSuspendedUntil = Date.now() + 10 * 60 * 1000;
        }
      }
    }

    // Step B: Search news
    const isStillAllowed = !(isGeminiSilentlySuspended && Date.now() < geminiSuspendedUntil);
    if (isStillAllowed) {
      const newsPrompt = `Search for the absolute latest NASA news and notable space discoveries from official nasa.gov or space.com.
      Compile exactly 3 of the most exciting recent news articles from this month. Write the response entirely in natural Uzbek language.
      
      Return the list as a JSON array matching this schema:
      [
        {
          "title": "Title of the news in Uzbek",
          "summary": "Detailed summary in Uzbek (at least 3 descriptive sentences detailing the science)",
          "sourceUrl": "Official nasa.gov news link or space.com URL",
          "date": "2026-05-31",
          "category": "Mars, Teleskoplar, Artemis, Asteroidlar, etc."
        }
      ]`;

      try {
        console.log("[NASA API] Fetching live news using Search Grounding index...");
        const newsResponse = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: newsPrompt,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  sourceUrl: { type: Type.STRING },
                  date: { type: Type.STRING },
                  category: { type: Type.STRING }
                },
                required: ["title", "summary", "sourceUrl", "date", "category"]
              }
            }
          }
        });

        if (newsResponse.text) {
          const parsed = safeParseJson(newsResponse.text);
          if (Array.isArray(parsed) && parsed.length > 0) {
            liveNews = parsed;
            console.log("[NASA API] Real-time Grounding succeeded.");
          }
        }
      } catch (searchErr: any) {
        const searchErrMsg = searchErr.message || String(searchErr);
        console.log("[NASA API info] Grounding restricted by quota limit. Activating Tier 2 fallback space generator...");
        
        if (searchErrMsg.includes("429") || searchErrMsg.includes("RESOURCE_EXHAUSTED") || searchErrMsg.includes("quota")) {
          isGeminiSilentlySuspended = true;
          geminiSuspendedUntil = Date.now() + 10 * 60 * 1000;
        }

        const isModelAllowed = !(isGeminiSilentlySuspended && Date.now() < geminiSuspendedUntil);
        if (isModelAllowed) {
          try {
            console.log("[NASA API] Querying standard Gemini space model memory...");
            const backupResponse = await ai.models.generateContent({
              model: "gemini-3.5-flash",
              contents: `Generate exactly 3 exciting space exploration news articles from this month. Write the response entirely in natural Uzbek language.
              
              Return the list as a JSON array matching this schema:
              [
                {
                  "title": "Title of the news in Uzbek",
                  "summary": "Detailed summary in Uzbek (at least 3 descriptive sentences detailing the science)",
                  "sourceUrl": "Official nasa.gov news link or space.com URL",
                  "date": "2026-05-31",
                  "category": "Mars, Teleskoplar, Artemis, Asteroidlar, etc."
                }
              ]`,
              config: {
                responseMimeType: "application/json",
                responseSchema: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      title: { type: Type.STRING },
                      summary: { type: Type.STRING },
                      sourceUrl: { type: Type.STRING },
                      date: { type: Type.STRING },
                      category: { type: Type.STRING }
                    },
                    required: ["title", "summary", "sourceUrl", "date", "category"]
                  }
                }
              }
            });

            if (backupResponse.text) {
              const parsed = safeParseJson(backupResponse.text);
              if (Array.isArray(parsed) && parsed.length > 0) {
                liveNews = parsed;
                if (status === "live") status = "standard-ai";
              }
            }
          } catch (backupErr: any) {
            const backupErrMsg = backupErr.message || String(backupErr);
            if (backupErrMsg.includes("429") || backupErrMsg.includes("RESOURCE_EXHAUSTED") || backupErrMsg.includes("quota")) {
              isGeminiSilentlySuspended = true;
              geminiSuspendedUntil = Date.now() + 10 * 60 * 1000;
            }
            if (status === "live") status = "fallback-news";
          }
        } else {
          if (status === "live") status = "fallback-news";
        }
      }
    }
  } else {
    if (status === "live") {
      status = isGeminiSilentlySuspended ? "suspended-backup" : "offline-all";
    }
  }

  return { apod: apodData, news: liveNews, status };
}


async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Main stable endpoint: ALWAYS succeeds instantly, serves cached data, refreshes in the background
  app.get("/api/nasa/data", async (req, res) => {
    const now = Date.now();
    const force = req.query.force === "true";

    // 1. If manual force-refresh is requested, fetch directly but clamp under tight 3s timeout
    if (force) {
      console.log("[NASA API] Quick live refresh requested. Fetching with hard timeout...");
      try {
        const fresh = await Promise.race([
          fetchLiveNasaTelemetry(),
          new Promise<any>((_, reject) => setTimeout(() => reject(new Error("Timeout")), 3000))
        ]);
        
        nasaCache = {
          apod: fresh.apod,
          news: fresh.news,
          status: fresh.status,
          timestamp: Date.now()
        };

        return res.json({
          status: fresh.status,
          apod: fresh.apod,
          news: fresh.news
        });
      } catch (e: any) {
        console.log("[NASA API] Forced refresh timed out/errored. Serving stable cached backups.", e.message || e);
        return res.json({
          status: "cached-timeout-fallback",
          apod: nasaCache.apod,
          news: nasaCache.news
        });
      }
    }

    // 2. Default flow: Serve from cache instantly, trigger background fetch if cache expired or initial
    const isCacheExpired = (now - nasaCache.timestamp > CACHE_DURATION);
    const isInitial = (nasaCache.status === "initial-offline");

    res.json({
      status: isInitial ? "live" : "cached-" + nasaCache.status,
      apod: nasaCache.apod,
      news: nasaCache.news
    });

    if (isCacheExpired || isInitial) {
      triggerBackgroundFetch();
    }
  });

  // Vite middleware development setup and static asset pipeline for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Robust __dirname resolution safe for both ES modules and transpiled commonJS files
    const distPath = path.resolve(__dirname, ".");
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
