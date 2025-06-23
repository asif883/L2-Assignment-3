import { Borrow } from './borrow.model';
import { IBorrow } from './borrow.interface';
import { Book } from '../book/book.model';

export const createBorrow = async (borrowData: IBorrow): Promise<IBorrow> => {
  const book = await Book.findById(borrowData.book);
  if (!book) {
    throw new Error('Book not found.');
  }
  await book.borrowBook(borrowData.quantity); 
  const newBorrow = await Borrow.create(borrowData);
  return newBorrow;
};

export const getBorrowSummary = async () => {
  return Borrow.aggregate([
    {
      $group: {
        _id: '$book',
        totalQuantity: { $sum: '$quantity' },
      },
    },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'book',
      },
    },
    { $unwind: '$book' },
    {
      $project: {
        _id: 0,
        book: {
          title: '$book.title',
          isbn: '$book.isbn',
        },
        totalQuantity: 1,
      },
    },
  ]);
};
