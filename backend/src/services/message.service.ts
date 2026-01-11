import prisma from '../config/database';

export const createMessage = async (data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) => {
  return prisma.message.create({ data });
};

export const getAllMessages = async () => {
  return prisma.message.findMany({ orderBy: { createdAt: 'desc' } });
};
