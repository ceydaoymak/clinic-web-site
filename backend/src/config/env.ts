import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: Number(process.env.PORT) || 4000,
  nodeEnv: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
  databaseUrl: process.env.DATABASE_URL!,
  frontendUrl: process.env.FRONTEND_URL!,
  uploadDir: process.env.UPLOAD_DIR || "./uploads",
};

if (!config.jwtSecret) {
  throw new Error("JWT_SECRET is required");
}

if (!config.databaseUrl) {
  throw new Error("DATABASE_URL is required");
}

if (!config.frontendUrl) {
  throw new Error("FRONTEND_URL is required");
}
