import express from 'express';
import { addBook, fetchBooks } from './book.controller';

const router = express.Router();

router.post('/', addBook);
router.get('/', fetchBooks);

export default router;
