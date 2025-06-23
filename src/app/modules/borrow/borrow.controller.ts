import { Request, Response } from 'express';
import { createBorrow, getBorrowSummary } from './borrow.service';

export const borrowBook = async (req: Request, res: Response) => {
  const borrow = await createBorrow(req.body);
  res.status(201).json({
    success: true,
    message: 'Book borrowed successfully',
    data: borrow,
  });
};

export const borrowedSummary = async (_req: Request, res: Response) => {
  const summary = await getBorrowSummary();
  res.status(200).json({
    success: true,
    message: 'Borrowed books summary retrieved successfully',
    data: summary,
  });
};
