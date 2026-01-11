# 📚 Book Management API

A RESTful Book Management API built with **Node.js, Express, TypeScript, MongoDB**, supporting CRUD operations, CSV bulk import with validation, and unit testing using Jest.

This project was built as part of a technical assignment.

---

## 🚀 Features

- CRUD operations for books
- Bulk CSV import (`POST /books/import`)
- Manual validation of CSV rows (no csv-parser / fast-csv used)
- TypeScript for type safety
- Centralized error handling
- Logging with morgan
- File uploads using multer
- Unit testing using Jest + Supertest
- Postman collection included

---

## 🧱 Tech Stack

- Node.js  
- Express  
- TypeScript  
- MongoDB + Mongoose  
- Multer (file upload)  
- Jest + Supertest (testing)
- Morgan (logging)

---

## 📂 Project Structure
src/
controllers/
models/
routes/
middlewares/
utils/
test/
app.ts
server.ts
.env



---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone <your-github-repo-url>
cd creuto
npm install
PORT=3000
MONGO_URI=your_mongodb_connection_string
npm run dev

```
## API Endpoints

Base URL:
http://localhost:3000/api/v1/books

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Get all books |
| GET | /:id | Get book by ID |
| POST | / | Create a new book |
| PUT | /:id | Update a book |
| DELETE | /:id | Delete a book |
| POST | /import | Import books from CSV |

## CSV Import

Endpoint:
POST /api/v1/books/import

Upload a CSV file using `multipart/form-data`.

Field name must be:
file

Example CSV format:

title,author,publishedYear  
Clean Code,Robert Martin,2008  
Atomic Habits,James Clear,2018  

Response includes:
- Number of books added
- List of rows with validation errors

Note:
CSV validation is handled manually (no csv-parser or fast-csv used).

---

## 🧪 Running Tests
npm test


Tests implemented using Jest + Supertest.

## 📬 Postman Collection

Postman collection is included in the repository:

creuto.postman_collection.json


You can import it into Postman using:
Postman → Import → File → Select this JSON file

or

https://api.postman.com/collections/46197914-b4a206b7-a4d1-460a-9190-f8c508bbff0b?access_key=PMAT-01KEQKK100J7TVKXF39492E1DG


## 👨‍💻 Author

Anish Anand
GitHub: https://github.com/Anish05aa





