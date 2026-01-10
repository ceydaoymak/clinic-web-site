import { Response } from 'express';
import { AuthRequest } from '../middleware/auth';
import {
  getAllServices,
  getServiceBySlug,
  getServiceById,
  createService,
  updateService,
  deleteService,
  createSlug,
} from '../services/service.service';

export const getServices = async (req: AuthRequest, res: Response) => {
  try {
    const services = await getAllServices();
    res.json(services);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getService = async (req: AuthRequest, res: Response) => {
  try {
    const { slug } = req.params;
    const service = await getServiceBySlug(slug);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createServiceController = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, content, icon, image, order } = req.body;

    if (!title || !description || !content) {
      return res.status(400).json({ error: 'Title, description, and content are required' });
    }

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const slug = createSlug(title);
    const existing = await getServiceBySlug(slug);
    
    if (existing) {
      return res.status(400).json({ error: 'A service with this title already exists' });
    }

    const service = await createService({
      title,
      slug,
      description,
      content,
      icon,
      image,
      order: order || 0,
    });

    res.status(201).json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateServiceController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, content, icon, image, order } = req.body;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const existing = await getServiceById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (content !== undefined) updateData.content = content;
    if (icon !== undefined) updateData.icon = icon;
    if (image !== undefined) updateData.image = image;
    if (order !== undefined) updateData.order = order;

    if (title && title !== existing.title) {
      const newSlug = createSlug(title);
      const slugExists = await getServiceBySlug(newSlug);
      if (slugExists && slugExists.id !== id) {
        return res.status(400).json({ error: 'A service with this title already exists' });
      }
      updateData.slug = newSlug;
    }

    const service = await updateService(id, updateData);
    res.json(service);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteServiceController = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    if (!req.userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const existing = await getServiceById(id);
    if (!existing) {
      return res.status(404).json({ error: 'Service not found' });
    }

    await deleteService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

