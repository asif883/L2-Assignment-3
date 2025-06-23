import { Book } from './book.model';
import { IBook } from './book.interface';

export const createBook = async (bookData: IBook): Promise<IBook> => {
  const newBook = await Book.create(bookData);
  return newBook;
};

export const getAllBooks = async (): Promise<IBook[]> => {
  return Book.find();
};
