import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from './app/modules/book/book.route';

const app: Application = express();

// middleware
app.use(cors());
app.use(express.json());


// Book API routes
app.use('/api/books', bookRoutes);

// root route
app.get('/', (req: Request, res: Response) => {
  res.send('Library Management API is Running');
});

export default app;
