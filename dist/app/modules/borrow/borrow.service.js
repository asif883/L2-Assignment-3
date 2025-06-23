"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorrowSummary = exports.createBorrow = void 0;
const borrow_model_1 = require("./borrow.model");
const book_model_1 = require("../book/book.model");
const createBorrow = (borrowData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findById(borrowData.book);
    if (!book) {
        throw new Error('Book not found.');
    }
    yield book.borrowBook(borrowData.quantity);
    const newBorrow = yield borrow_model_1.Borrow.create(borrowData);
    return newBorrow;
});
exports.createBorrow = createBorrow;
const getBorrowSummary = () => __awaiter(void 0, void 0, void 0, function* () {
    return borrow_model_1.Borrow.aggregate([
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
});
exports.getBorrowSummary = getBorrowSummary;
