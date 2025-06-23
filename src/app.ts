import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bookRoutes from './app/modules/book/book.route';
import borrowRoutes from './app/modules/borrow/borrow.route';
import { errorHandler } from './app/middleware/errorHandler';

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());


// book API routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);


// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Library Management API is Running');
});


app.use(errorHandler); 

export default app;
