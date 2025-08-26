# RESTful Web Service (Node.js + MongoDB)

Simple CRUD web app for managing people using Express, Mongoose, and EJS.

## Requirements
- Node.js 18+
- MongoDB (local service or connection string via `MONGODB_URI`)

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start MongoDB locally or set env var:
   - Default: `mongodb://127.0.0.1:27017/people_db`
   - Override: set `MONGODB_URI`
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open:
   - http://localhost:3000/person

## Endpoints
- GET `/person`: List table of people
- GET `/person/new`: Form to create
- POST `/person`: Create
- GET `/person/:id/edit`: Form to edit
- PUT `/person/:id`: Update
- GET `/person/:id/delete`: Delete confirmation
- DELETE `/person/:id`: Delete

Fields: Name, Age, Gender, Mobile number

## Seeding
Seed database with up to 10 Indian names (updates existing and inserts missing):
```bash
node src/scripts/seed.js
```

## Tech Stack
- Express 5
- Mongoose 8
- EJS Views
- method-override (HTML forms for PUT/DELETE)
- morgan logger

## Scripts
- `npm run dev` – start with nodemon
- `npm start` – start once