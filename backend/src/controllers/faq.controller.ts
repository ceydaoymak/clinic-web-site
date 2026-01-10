import { Request, Response } from 'express';
import * as faqService from '../services/faq.service';

export const getAllFAQs = async (req: Request, res: Response) => {
  const faqs = await faqService.getAllFAQs();
  res.json(faqs);
};

export const getFAQById = async (req: Request, res: Response) => {
  const faq = await faqService.getFAQById(req.params.id);
  if (!faq) return res.status(404).json({ message: 'FAQ not found' });
  res.json(faq);
};

export const createFAQ = async (req: Request, res: Response) => {
  const { question, answer } = req.body;
  if (!question || !answer) return res.status(400).json({ message: 'Question and answer required' });
  const faq = await faqService.createFAQ(question, answer);
  res.status(201).json(faq);
};

export const updateFAQ = async (req: Request, res: Response) => {
  const { question, answer } = req.body;
  const { id } = req.params;
  if (!question || !answer) return res.status(400).json({ message: 'Question and answer required' });
  try {
    const faq = await faqService.updateFAQ(id, question, answer);
    res.json(faq);
  } catch (e) {
    res.status(404).json({ message: 'FAQ not found' });
  }
};

export const deleteFAQ = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await faqService.deleteFAQ(id);
    res.status(204).end();
  } catch (e) {
    res.status(404).json({ message: 'FAQ not found' });
  }
};
