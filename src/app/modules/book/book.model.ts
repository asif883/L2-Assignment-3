import { Schema, model } from 'mongoose';
import { IBook, BookModel, IBookMethods } from './book.interface';

const bookSchema = new Schema<IBook, BookModel, IBookMethods>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: {
      type: String,
      required: true,
      enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY'],
    },
    isbn: { type: String, required: true, unique: true },
    description: { type: String },
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

// Instance method to borrow book copies
bookSchema.methods.borrowBook = async function (quantity: number) {
  if (this.copies < quantity) {
    throw new Error('Not enough copies available.');
  }
  this.copies -= quantity;
  if (this.copies === 0) {
    this.available = false;
  }
  await this.save();
};

// Static method to get available books
bookSchema.statics.getAvailableBooks = function () {
  return this.find({ available: true });
};

// Middleware to ensure available flag consistency
bookSchema.pre('save', function (next) {
  if (this.copies === 0) {
    this.available = false;
  } else {
    this.available = true;
  }
  next();
});

// Remove __v from JSON output
bookSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Book = model<IBook, BookModel>('Book', bookSchema);
