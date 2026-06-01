import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, Image, Calendar, ExternalLink, RefreshCw, Star, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  hdurl: string;
  date: string;
}

interface NewsItem {
  title: string;
  summary: string;
  sourceUrl: string;
  date: string;
  category: string;
}

interface NasaDataResponse {
  apod: ApodData;
  news: NewsItem[];
}

interface NasaNewsProps {
  theme: 'dark' | 'light';
  onAddPoints: (amount: number, reason: string) => void;
}

export const NasaNews: React.FC<NasaNewsProps> = ({ theme, onAddPoints }) => {
  const [data, setData] = useState<NasaDataResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showApodDetail, setShowApodDetail] = useState(false);
  const [claimedNewsPoints, setClaimedNewsPoints] = useState<boolean>(() => {
    return localStorage.getItem('nasa_news_points_claimed') === 'true';
  });

  const isDark = theme === 'dark';

  const fetchNasaData = async (isManual = false) => {
    try {
      setLoading(true);
      setError(null);
      const url = isManual ? "/api/nasa/data?force=true" : "/api/nasa/data";
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("NASA ma'lumotlarini yuklashda xatolik yuz berdi");
      }
      const json: NasaDataResponse = await res.json();
      setData(json);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Xizmatga ulanib bo'lmadi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNasaData(false);
  }, []);

  const handleClaimPoints = () => {
    if (!claimedNewsPoints) {
      onAddPoints(50, "Kun yangiliklarini mutolaa qilganingiz uchun!");
      setClaimedNewsPoints(true);
      localStorage.setItem('nasa_news_points_claimed', 'true');
    }
  };

  if (loading) {
    return (
      <div className={cn(
        "p-12 text-center rounded-2xl border transition-all duration-300 backdrop-blur-md mb-12",
        isDark ? "bg-space-900/40 border-white/5" : "bg-white border-slate-200"
      )}>
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <RefreshCw className="w-12 h-12 text-star-blue animate-spin" />
          <p className="font-display font-medium text-lg tracking-wide uppercase animate-pulse">
            NASA original saytidan live ma'lumotlar olinmoqda...
          </p>
          <p className={isDark ? "text-slate-500 text-xs font-mono" : "text-slate-400 text-xs font-mono"}>
            Mars rover, James Webb va APOD arxivlari sinxronizatsiya qilinmoqda
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-red-500/10 border border-red-500/30 p-8 rounded-2xl text-center mb-12">
        <p className="text-red-400 font-medium mb-4">Ma'lumot olishda xatolik: {error || "Sinxronizatsiya muvaffaqiyatsiz"}</p>
        <button onClick={() => fetchNasaData(true)} className="cyber-button px-6 py-2 bg-slate-800 text-white text-xs">
          Qaytadan urinish
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 mb-16" id="nasa-news-section">
      {/* Header and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 border-white/10">
        <div>
          <h2 className={cn(
            "text-3xl font-display font-bold flex items-center gap-2",
            isDark ? "text-white" : "text-slate-900"
          )}>
            <Image className="w-8 h-8 text-star-blue" />
            Kun Koinot Tasviri (APOD)
          </h2>
          <p className={isDark ? "text-slate-400 text-sm" : "text-slate-600 text-sm"}>
            NASA rasmiy observatoriyalaridan olingan har kunlik koinot fotosurati va ilmiy sharhi
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => fetchNasaData(true)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-lg transition-all border",
              isDark 
                ? "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300" 
                : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
            )}
            title="Tasvirni hozir yangilash"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Yangilash
          </button>

          {!claimedNewsPoints && (
            <button
              onClick={handleClaimPoints}
              className="flex items-center gap-2 px-4 py-2 text-xs font-display font-bold uppercase rounded-lg border border-yellow-500/35 bg-yellow-500/10 text-yellow-400 animate-pulse hover:bg-yellow-500/20 transition-all"
            >
              <Star className="w-4 h-4 fill-current" />
              Ball olish (+50 XP)
            </button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Daily Astronomy Picture Of The Day (APOD) - Beautifully Centered & Expanded */}
        <div className={cn(
          "rounded-2xl overflow-hidden shadow-2xl border flex flex-col justify-between transition-all duration-300",
          isDark ? "bg-space-900/60 border-white/10" : "bg-white border-slate-200"
        )}>
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-star-blue font-bold">
              <Image className="w-4 h-4 animate-pulse" />
              Bugungi kosmik telemetriya tasviri
            </span>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {data.apod.date}
            </span>
          </div>

          <div className="relative group overflow-hidden bg-slate-950 flex items-center justify-center">
            <img 
              src={data.apod.url} 
              alt={data.apod.title}
              className="w-full max-h-[550px] object-contain transition-transform duration-700 hover:scale-102"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-8 space-y-6">
            <div>
              <h3 className={cn(
                "text-2xl font-display font-bold leading-tight mb-4",
                isDark ? "text-white" : "text-slate-900"
              )}>
                {data.apod.title}
              </h3>
              
              <button
                onClick={() => setShowApodDetail(!showApodDetail)}
                className={cn(
                  "flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-star-blue transition-colors mb-3",
                  isDark ? "text-slate-400" : "text-slate-600"
                )}
              >
                <span>Ilmiy sharhni o'qish</span>
                {showApodDetail ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              <AnimatePresence initial={false}>
                {showApodDetail && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "text-sm leading-relaxed pr-2 mt-2",
                      isDark ? "text-slate-300" : "text-slate-600"
                    )}
                  >
                    {data.apod.explanation}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-2">
              <a
                href={data.apod.hdurl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "w-full text-center py-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 border flex items-center justify-center gap-1.5",
                  isDark 
                    ? "bg-white/5 hover:bg-star-blue/15 border-white/10 text-slate-300 hover:text-star-blue hover:border-star-blue/40" 
                    : "bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700"
                )}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Original yuqori sifatli (HD) tasvirni ochish
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
