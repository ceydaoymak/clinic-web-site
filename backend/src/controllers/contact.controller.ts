import { Request, Response } from 'express';
import { createMessage, getAllMessages } from '../services/message.service';

export const sendContactMessage = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Zorunlu alanlar eksik.' });
  }
  const saved = await createMessage({ name, email, phone, message });
  return res.status(200).json({ success: true, message: saved });
};

export const getMessagesController = async (_req: Request, res: Response) => {
  const messages = await getAllMessages();
  return res.json(messages);
};
