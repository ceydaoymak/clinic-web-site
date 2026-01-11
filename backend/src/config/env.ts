import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || '',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  uploadDir: process.env.UPLOAD_DIR || './uploads',
  frontendUrl: process.env.FRONTEND_URL as string,
  databaseUrl: process.env.DATABASE_URL || '',
};

if (!config.jwtSecret) {
  throw new Error('JWT_SECRET is required');
}

if (!config.databaseUrl) {
  throw new Error('DATABASE_URL is required');
}

if (!config.frontendUrl) {
  throw new Error('FRONTEND_URL is required');
}

