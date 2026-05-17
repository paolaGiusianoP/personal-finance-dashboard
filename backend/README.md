# ⚙️ Personal Finance Dashboard - Backend

REST API for the Personal Finance Dashboard application.

Built with Node.js, Express, Prisma ORM, and PostgreSQL following a scalable layered architecture focused on clean code, maintainability, security, and professional backend practices.

---

# ✨ Features

## 🔐 Authentication
- JWT authentication
- User registration and login
- Password hashing with bcrypt
- Protected routes
- Persistent sessions
- Profile management

## 💳 Transactions
- Create, update, delete transactions
- Financial summaries and date filtering
- Category and type filtering
- **CSV and PDF export support**

## 🗂️ Categories
- Default categories for new users
- Custom categories with emoji icons
- Income and expense separation
- Delete protection for default categories

## 🤖 AI & Smart Features
- **Smart category suggestion** based on transaction description
- **Keyword-based categorization** (offline, no API required)
- **Automatic financial insights** generation
- **Monthly spending comparisons**
- **Personalized recommendations**

## 📊 Analytics
- Monthly summaries and expense statistics
- Financial KPIs and category aggregations
- Dashboard analytics
- **Daily average spending calculation**

## 💰 Budgets
- Monthly budgets with progress bars
- Budget alerts and expense monitoring
- Category-based budget tracking

---

## ✅ Implemented Features

- ✅ Swagger/OpenAPI documentation
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ Compression (Gzip)
- ✅ Winston logging
- ✅ Global error handler
- ✅ Zod validation
- ✅ Health check endpoint
- ✅ JWT authentication
- ✅ Docker support
- ✅ Environment configuration
- ✅ Budget management
- ✅ CSV export support
- ✅ **PDF export support**
- ✅ **AI category suggestion**
- ✅ **Financial insights automation**

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
| Zod | Validation |
| Swagger/OpenAPI | API documentation |
| Winston | Logging |
| Helmet | Security |
| Express Rate Limit | API protection |
| Compression | Response optimization |
| Docker | Containerization |

---

# 🏗️ Architecture

The backend follows a layered architecture:

```txt
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

---

# 📚 Layer Responsibilities

## Controllers
Responsible for:
- HTTP request handling
- Response formatting
- Status codes
- Request parsing

## Services
Responsible for:
- Business logic
- Financial calculations
- Validation rules
- Application workflows

## Repositories
Responsible for:
- Database access
- Prisma queries
- Data persistence
- Database abstraction

## Middlewares
Responsible for:
- Authentication
- Error handling
- Validation
- Security
- Logging

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
│   │   ├── categoryController.js
│   │   └── budgetController.js
│   │
│   ├── services/
│   │   ├── authService.js
│   │   ├── transactionService.js
│   │   ├── categoryService.js
│   │   └── budgetService.js
│   │
│   ├── repositories/
│   │   ├── userRepository.js
│   │   ├── transactionRepository.js
│   │   ├── categoryRepository.js
│   │   └── budgetRepository.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   ├── validateMiddleware.js
│   │   └── rateLimiter.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── transactionRoutes.js
│   │   ├── categoryRoutes.js
│   │   └── budgetRoutes.js
│   │
│   ├── validations/
│   │
│   ├── docs/
│   │
│   ├── utils/
│   │   ├── prisma.js
│   │   └── logger.js
│   │
│   └── index.js
│
├── package.json
├── .env
├── docker-compose.yml
└── README.md
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

## 4. Push database schema

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

# 📚 API Documentation

Once the server is running, access the interactive API documentation at:

```txt
http://localhost:5000/api-docs
```

---

# 🧪 API Testing

You can test all endpoints using:
- Swagger UI
- Postman
- Insomnia

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

# 🔒 Security Features

- Helmet security headers
- Rate limiting
- Password hashing with bcrypt
- JWT authentication
- Zod request validation
- Protected routes
- Global error handling

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

## Budgets

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/budgets` | Get budgets by month/year |
| POST | `/api/budgets` | Create/update budget |
| DELETE | `/api/budgets/:id` | Delete budget |
| GET | `/api/budgets/alerts` | Get budget alerts |

---

## Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | API health status |

---

## AI

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/ai/suggest-category` | AI-powered category suggestion |

---

## Insights

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/insights` | Get personalized financial insights |

---


# 🗄️ Database

Main entities:

- Users
- Transactions
- Categories
- Budgets
- Sessions

Relationships:

```txt
User
 ├── Transactions
 ├── Categories
 ├── Budgets
 └── Sessions

Category
 ├── Transactions
 └── Budgets
```

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
- API documentation
- Security best practices
- Logging system
- Validation with Zod
- Financial calculations
- Filtering and analytics
- Dockerized development
- Budget tracking and alerts
- Export capabilities (CSV)
- AI-powered category suggestion
- Automated financial insights

---

# 🚧 Future Improvements

- ~~API documentation with Swagger~~ ✅
- ~~Rate limiting~~ ✅
- ~~Logging system~~ ✅
- ~~Validation with Zod~~ ✅
- Unit testing
- Integration testing
- Refresh tokens
- Email verification
- Password recovery
- Pagination
- Redis caching
- CI/CD pipeline
- Background jobs
- Webhooks
- Notifications

---

# 🚢 Deployment

## Live Demo
- **Backend API**: https://personal-finance-dashboard-backend-nsk9.onrender.com

- **Health Check**: https://personal-finance-dashboard-backend-nsk9.onrender.com/health

## Database
- **Neon PostgreSQL**: Serverless PostgreSQL database hosted on Neon.tech

---
