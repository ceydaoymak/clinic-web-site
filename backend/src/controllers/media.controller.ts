import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import { createMedia, getAllMedia, deleteMedia } from '../services/media.service';

export const uploadMedia = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const media = await createMedia(
      req.file.filename,
      req.file.originalname,
      req.file.mimetype,
      req.file.size
    );

    res.status(201).json(media);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getMedia = async (req: AuthRequest, res: Response) => {
  try {
    const media = await getAllMedia();
    res.json(media);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteMediaController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    await deleteMedia(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

