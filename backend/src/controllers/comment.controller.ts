import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export const getComments = async (req: Request, res: Response) => {
  const comments = await commentService.getComments();
  res.json(comments);
};

export const createComment = async (req: Request, res: Response) => {
  const { initials, rating, content } = req.body;
  const comment = await commentService.createComment({ initials, rating, content });
  res.status(201).json(comment);
};

export const updateComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const comment = await commentService.updateComment(id, data);
  res.json(comment);
};

export const deleteComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  await commentService.deleteComment(id);
  res.status(204).send();
};
