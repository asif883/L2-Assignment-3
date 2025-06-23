# 📚 Library Management API

A full-featured REST API built using **Express**, **TypeScript**, and **MongoDB** to manage books and borrowing in a digital library system.

---
## Live URL: 

## 🚀 Features

- Create, Read, Update, Delete (CRUD) books
- Borrow books with inventory validation
- Aggregated summary of borrowed books
- Filtering, sorting, and pagination
- Centralized error handling with validation formatting
- Mongoose instance and static methods
- Pre-save middleware for availability logic

---

## 🔧 Technologies

- Node.js + Express.js
- TypeScript
- MongoDB + Mongoose

---

## 📁 Project Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── book/
│   │   │   ├── book.controller.ts
│   │   │   ├── book.service.ts
│   │   │   ├── book.model.ts
│   │   │   └── book.interface.ts
│   │   └── borrow/
│   │       ├── borrow.controller.ts
│   │       ├── borrow.service.ts
│   │       ├── borrow.model.ts
│   │       └── borrow.interface.ts
│   └── middleware/
│       └── errorHandler.ts
├── app.ts
└── server.ts
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/asif883/L2-Assignment-3.git
cd L2-Assignment-3
```

2. **Install dependencies**
```bash
npm install
```

3. **Create a `.env` file**
```env
PORT=5000
DATABASE_URL=mongodb://localhost:27017/libraryDB
```

4. **Start the development server**
```bash
npm run dev
```

---

## 📬 API Endpoints

### 1. Create Book
**POST** `/api/books`
```json
{
  "title": "The Theory of Everything",
  "author": "Stephen Hawking",
  "genre": "SCIENCE",
  "isbn": "9780553380163",
  "description": "An overview of cosmology and black holes.",
  "copies": 5,
  "available": true
}
```

### 2. Get All Books
**GET** `/api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5`

### 3. Get Book by ID
**GET** `/api/books/:bookId`

### 4. Update Book
**PUT** `/api/books/:bookId`
```json
{
  "copies": 10
}
```

### 5. Delete Book
**DELETE** `/api/books/:bookId`

### 6. Borrow Book
**POST** `/api/borrow`
```json
{
  "book": "<bookId>",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```

### 7. Borrow Summary
**GET** `/api/borrow`

---

## ✅ Response Format
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

## ❌ Error Format
```json
{
  "message": "Validation failed",
  "success": false,
  "error": { ...mongoose error object... }
}
```

---

## 🧪 Bonus Implementations

- Centralized error handler ✅
- Middleware with Mongoose `pre('save')` ✅
- Static + Instance methods ✅
- Aggregation pipeline for borrow summary ✅

---

## 📽️ Video Demo
Create a short video explaining the structure, features, and API endpoints for submission.

---

## 👨‍💻 Author
**Asif Iqbal**  
Frontend & Backend Developer 
---
