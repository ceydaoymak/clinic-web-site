import prisma from '../config/database';
import { Service } from '@prisma/client';

export const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export interface CreateServiceData {
  title: string;
  slug: string;
  description: string;
  content: string;
  icon?: string;
  image?: string;
  order?: number;
}

export const getAllServices = async (): Promise<Service[]> => {
  return prisma.service.findMany({
    orderBy: { order: 'asc' },
  });
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  return prisma.service.findUnique({
    where: { slug },
  });
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  return prisma.service.findUnique({
    where: { id },
  });
};

export const createService = async (data: CreateServiceData): Promise<Service> => {
  return prisma.service.create({ data });
};

export const updateService = async (
  id: string,
  data: Partial<CreateServiceData>
): Promise<Service> => {
  return prisma.service.update({
    where: { id },
    data,
  });
};

export const deleteService = async (id: string): Promise<void> => {
  await prisma.service.delete({ where: { id } });
};

