# ⚙️ Personal Finance Dashboard - Backend

REST API for the Personal Finance Dashboard application.

Built with Node.js, Express, Prisma ORM, and PostgreSQL following a layered architecture focused on scalability, maintainability, and clean code practices.

---

# ✨ Features

## 🔐 Authentication
- JWT authentication
- User registration and login
- Password hashing with bcrypt
- Protected routes
- Persistent sessions

## 💳 Transactions
- Create transactions
- Update transactions
- Delete transactions
- Financial summaries
- Filters by category, date, and type

## 🗂️ Categories
- Default categories for new users
- Custom categories
- Income and expense separation
- Delete protection for default categories

## 📊 Analytics
- Monthly summaries
- Expense statistics
- Category aggregations
- Financial KPIs

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | REST API |
| Prisma ORM | Database access |
| PostgreSQL | Database |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Docker | Containerization |

---

# 🏗️ Architecture

The backend uses a layered architecture:

```txt
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

## Layer Responsibilities

### Controllers
Handle:
- HTTP requests
- Request validation
- Response formatting
- Status codes

### Services
Handle:
- Business logic
- Financial calculations
- Validation rules
- Application workflows

### Repositories
Handle:
- Database queries
- Prisma operations
- Data persistence

### Middleware
Handle:
- Authentication
- Error handling
- Route protection

---

# 📁 Project Structure

```txt
backend/
│
├── prisma/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── transactionController.js
│   │   └── categoryController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── transactionService.js
│   │   └── categoryService.js
│   │
│   ├── repositories/
│   │   ├── userRepository.js
│   │   ├── transactionRepository.js
│   │   └── categoryRepository.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   └── categoryRoutes.js
│   │
│   ├── utils/
│   │   └── prisma.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
├── .env
└── docker-compose.yml
```

---

# 🚀 Getting Started

## 1. Install dependencies

```bash
npm install
```

---

## 2. Setup environment variables

Create a `.env` file:

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_finance"

JWT_SECRET="your_secret_key"
```

---

## 3. Generate Prisma client

```bash
npx prisma generate
```

---

## 4. Run database migrations

```bash
npx prisma db push
```

---

## 5. Start development server

```bash
npm run dev
```

---

# 🐳 Docker Setup

Run PostgreSQL with Docker:

```bash
docker-compose up -d
```

Example `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16
    container_name: personal-finance-db
    restart: always

    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: personal_finance

    ports:
      - '5432:5432'

    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

# 🔐 Authentication Flow

```txt
Client Login
     ↓
JWT Token Generation
     ↓
Token Returned to Client
     ↓
Protected Requests
     ↓
Auth Middleware Verification
```

---

# 📡 API Overview

## Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Current authenticated user |
| PUT | `/api/auth/profile` | Update profile |
| PUT | `/api/auth/change-password` | Change password |

---

## Transactions

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/transactions` | Get transactions |
| POST | `/api/transactions` | Create transaction |
| PUT | `/api/transactions/:id` | Update transaction |
| DELETE | `/api/transactions/:id` | Delete transaction |
| GET | `/api/transactions/summary` | Financial summary |
| GET | `/api/transactions/stats/categories` | Category stats |

---

## Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | Get categories |
| POST | `/api/categories` | Create category |
| PUT | `/api/categories/:id` | Update category |
| DELETE | `/api/categories/:id` | Delete category |

---

# 🧠 Backend Concepts Demonstrated

- REST API architecture
- JWT authentication
- Layered architecture
- Repository pattern
- Database modeling
- Prisma ORM
- Clean code practices
- Middleware architecture
- Protected routes
- Error handling
- Financial calculations
- API filtering

---

# 🗄️ Database

Main entities:

- Users
- Transactions
- Categories

Relationships:

```txt
User
 ├── Transactions
 └── Categories

Category
 └── Transactions
```

---

# 🚧 Future Improvements

- Unit testing
- Integration testing
- API documentation with Swagger
- Rate limiting
- Refresh tokens
- Email verification
- Password recovery
- Pagination
- Redis caching
- Logging system
- CI/CD pipeline

---

# 🚢 Deployment

## Recommended Backend Hosting
- Render
- Railway

## Recommended Database Hosting
- Neon PostgreSQL
- Supabase PostgreSQL
- Railway PostgreSQL

---

# 👩‍💻 Author

Backend developed as part of a professional fullstack portfolio project focused on clean architecture, scalability, and modern API development.