import prisma from '../config/database';
import { Media } from '@prisma/client';
import path from 'path';
import { config } from '../config/env';

export const createMedia = async (
  filename: string, // In Cloudinary this is the public_id
  originalName: string,
  mimeType: string,
  size: number,
  url: string,
  filePath: string
): Promise<Media> => {
  // filePath in Cloudinary context is usually just the public_id or similar, 
  // but we store it to be compatible with the deletes later if needed (using API)

  return prisma.media.create({
    data: {
      filename, // public_id
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
    try {
      // Import dynamically to avoid top-level dependency issues if config not loaded
      const { cloudinary } = await import('../config/cloudinary.config');
      // media.filename holds the public_id provided by Cloudinary
      await cloudinary.uploader.destroy(media.filename);
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error);
    }
  }
  await prisma.media.delete({ where: { id } });
};

