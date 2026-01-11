import express from "express";
import cors from "cors";
import { config } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";
import authRoutes from "./routes/auth.routes";
import blogRoutes from "./routes/blog.routes";
import mediaRoutes from "./routes/media.routes";
import serviceRoutes from "./routes/service.routes";
import settingsRoutes from "./routes/settings.routes";
import contactRoutes from "./routes/contact.routes";
import commentRoutes from "./routes/comment.routes";
import faqRoutes from "./routes/faq.routes";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      // Local dev
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // ALL Vercel deployments (prod + preview)
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS blocked: ${origin}`)
      );
    },
    credentials: true,
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    env: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

app.use(errorHandler);

const PORT = config.port;

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Server running on port ${PORT} (${config.nodeEnv})`
  );
});
