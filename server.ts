import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Fast offline API route returning lightweight static telemetry to prevent any quota usage or rate-limiting
  app.get("/api/nasa/data", (req, res) => {
    res.json({
      status: "static-offline",
      apod: {
        title: "Andromeda Galaktikasi va Somon Yo'li",
        explanation: "Koinotimizdagi eng go'zal galaktikalar to'qnashuvi.",
        url: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1000",
        hdurl: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&q=80&w=1400",
        date: "2026-06-01"
      },
      news: []
    });
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
