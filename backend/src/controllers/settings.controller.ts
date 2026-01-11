import { Request, Response } from 'express';
import { getSettings, updateSettings } from '../services/settings.service';

export const getSettingsController = async (req: Request, res: Response) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSettingsController = async (req: Request, res: Response) => {
  try {
    const { profilePhotoUrl, heroPhotoUrl } = req.body;
    const updated = await updateSettings({ profilePhotoUrl, heroPhotoUrl });
    res.json(updated);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
