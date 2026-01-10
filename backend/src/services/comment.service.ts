import { PrismaClient, Comment } from '@prisma/client';

const prisma = new PrismaClient();

export const getComments = async () => {
  return prisma.comment.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
  });
};

export const createComment = async (data: {
  initials: string;
  rating: number;
  content: string;
}) => {
  return prisma.comment.create({ data });
};

export const updateComment = async (id: string, data: Partial<Comment>) => {
  return prisma.comment.update({
    where: { id },
    data,
  });
};

export const deleteComment = async (id: string) => {
  return prisma.comment.delete({ where: { id } });
};
