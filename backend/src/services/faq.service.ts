import { PrismaClient, FAQ } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllFAQs = async (): Promise<FAQ[]> => {
  return prisma.fAQ.findMany({ orderBy: { createdAt: 'desc' } });
};

export const getFAQById = async (id: string): Promise<FAQ | null> => {
  return prisma.fAQ.findUnique({ where: { id } });
};

export const createFAQ = async (question: string, answer: string): Promise<FAQ> => {
  return prisma.fAQ.create({ data: { question, answer } });
};

export const updateFAQ = async (id: string, question: string, answer: string): Promise<FAQ> => {
  return prisma.fAQ.update({ where: { id }, data: { question, answer } });
};

export const deleteFAQ = async (id: string): Promise<FAQ> => {
  return prisma.fAQ.delete({ where: { id } });
};
