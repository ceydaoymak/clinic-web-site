import prisma from '../config/database';

export const getSettings = async () => {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = await prisma.settings.create({ data: {} });
  }
  return settings;
};

export const updateSettings = async (data: {
  profilePhotoUrl?: string;
  heroPhotoUrl?: string;
}) => {
  let settings = await prisma.settings.findFirst();
  if (!settings) {
    settings = await prisma.settings.create({ data: {} });
  }
  return prisma.settings.update({
    where: { id: settings.id },
    data,
  });
};
