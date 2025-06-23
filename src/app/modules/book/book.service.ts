import { Book } from './book.model';
import { IBook } from './book.interface';

interface GetAllBooksQuery {
  filter?: string;
  sortBy?: string;
  sort?: 'asc' | 'desc';
  limit?: number | string;
}

export const createBook = async (bookData: IBook): Promise<IBook> => {
  return await Book.create(bookData);
};

export const getAllBooks = async (queryParams: GetAllBooksQuery): Promise<IBook[]> => {
  const { filter, sortBy = 'createdAt', sort = 'desc', limit = 10 } = queryParams;

  const filterCondition: any = {};
  if (filter) {
    filterCondition.genre = filter;
  }

  const sortCondition: any = {};
  sortCondition[sortBy] = sort === 'asc' ? 1 : -1;

  return Book.find(filterCondition).sort(sortCondition).limit(Number(limit));
};

export const getAvailableBooks = async (): Promise<IBook[]> => {
  return Book.getAvailableBooks();
};

export const getBookById = async (bookId: string): Promise<IBook | null> => {
  return Book.findById(bookId);
};

export const updateBook = async (bookId: string, updatedData: Partial<IBook>): Promise<IBook | null> => {
  return Book.findByIdAndUpdate(bookId, updatedData, { new: true });
};

export const deleteBook = async (bookId: string): Promise<null> => {
  await Book.findByIdAndDelete(bookId);
  return null;
};
