import { Request, Response } from 'express';
import { createBook, getAllBooks } from './book.service';

export const addBook = async (req: Request, res: Response) => {
  const bookData = req.body;
  const newBook = await createBook(bookData);
  res.status(201).json({
    success: true,
    message: 'Book created successfully',
    data: newBook,
  });
};

export const fetchBooks = async (_req: Request, res: Response) => {
  const books = await getAllBooks();
  res.status(200).json({
    success: true,
    message: 'Books retrieved successfully',
    data: books,
  });
};
