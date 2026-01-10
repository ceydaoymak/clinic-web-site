import prisma from '../config/database';
import { Media } from '@prisma/client';
import path from 'path';
import { config } from '../config/env';

export const createMedia = async (
  filename: string,
  originalName: string,
  mimeType: string,
  size: number
): Promise<Media> => {
  const url = `/uploads/${filename}`;
  const filePath = path.join(config.uploadDir, filename);

  return prisma.media.create({
    data: {
      filename,
      originalName,
      mimeType,
      size,
      path: filePath,
      url,
    },
  });
};

export const getAllMedia = async (): Promise<Media[]> => {
  return prisma.media.findMany({
    orderBy: { createdAt: 'desc' },
  });
};

export const deleteMedia = async (id: string): Promise<void> => {
  const media = await prisma.media.findUnique({ where: { id } });
  if (media) {
    const fs = require('fs');
    try {
      if (fs.existsSync(media.path)) {
        fs.unlinkSync(media.path);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
  await prisma.media.delete({ where: { id } });
};

