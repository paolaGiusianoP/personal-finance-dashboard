# 💰 Personal Finance Dashboard

Modern fullstack web application for personal finance management, built to showcase professional frontend, backend, and data visualization skills.

The platform allows users to manage income and expenses, analyze financial trends, track budgets, and visualize data through an interactive dashboard with charts and KPIs.

---

## ✨ Features

### 🔐 Authentication
- JWT authentication
- User registration and login
- Protected routes
- Persistent sessions
- Profile management
- Password change

### 💰 Budgets
- Monthly budget limits per category
- Budget progress bars with color alerts
- Visual warnings (80%, 90%, 100%)
- Month/year selector
- Real-time budget vs actual spending

### 💳 Transactions
- Create, edit, and delete transactions
- Income and expense management
- Real-time updates
- Date, category, and type filters
- CSV export (transactions and summary)

### 📊 Dashboard & Analytics
- Financial KPIs (income, expenses, balance)
- Interactive charts (bar, pie, line)
- Monthly trends
- Expense distribution by category
- Period filters (week/month/year)

### 🗂️ Categories
- Custom categories with emoji icons
- Income and expense separation
- Default categories for new users
- Delete protection for default categories

### 🔔 User Experience
- Toast notifications for all actions
- Loading states and skeletons
- Confirmation dialogs
- Responsive design (mobile/desktop/tablet)

---

## 🚀 Key Technical Highlights

- Layered backend architecture (Controller → Service → Repository)
- JWT authentication with protected routes
- Interactive financial analytics with Recharts
- Budget tracking and alerts
- CSV export functionality
- Swagger/OpenAPI documentation
- Responsive UI optimized for desktop and mobile
- Dockerized PostgreSQL environment
- Validation with Zod
- Security best practices with Helmet and Rate Limiting

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |
| React Router DOM | Routing |
| Axios | API client |
| Recharts | Data visualization |
| React Hot Toast | Notifications |
| PapaParse + FileSaver | CSV export |

### Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express | Web framework |
| Prisma ORM | Database access |
| PostgreSQL | Database |
| JWT | Authentication |
| Bcrypt | Password hashing |
| Zod | Validation |
| Swagger/OpenAPI | API documentation |
| Winston | Logging |
| Helmet | Security headers |
| Express Rate Limit | API protection |

### DevOps & Tools

| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container |
| Vercel | Frontend deployment |
| Render/Railway | Backend deployment |

---

## 🏗️ Architecture

The backend follows a layered architecture focused on scalability, maintainability, and clean code principles.

```txt
Controller (HTTP layer)
     ↓
Service (Business logic)
     ↓
Repository (Data access)
     ↓
Database (Prisma + PostgreSQL)
```

---

## 🔒 API Features

- RESTful API architecture
- JWT authentication
- Request validation with Zod
- Centralized error handling
- Rate limiting
- Swagger/OpenAPI documentation
- Structured logging with Winston
- Secure HTTP headers with Helmet

---

## 📚 Backend Layers

| Layer | Responsibility |
|------|----------------|
| Controllers | HTTP request handling, response formatting |
| Services | Business logic, calculations, validation |
| Repositories | Database queries, Prisma operations |
| Middlewares | Authentication, error handling, validation |

---

## 🎨 Frontend Structure

```txt
Pages (Views)
     ↓
Components (Reusable UI)
     ↓
Services (API calls)
     ↓
Context (State management)
     ↓
Backend API
```

---

## 📁 Project Structure

```txt
personal-finance-dashboard/
│
├── backend/
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middlewares/
│   │   ├── routes/
│   │   ├── validations/
│   │   ├── utils/
│   │   └── index.js
│   │
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── types/
│   │   ├── utils/
│   │   └── App.tsx
│   │
│   └── package.json
│
├── screenshots/
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Docker (optional, for PostgreSQL)
- npm or yarn

---

## ⚙️ Backend Setup

```bash
cd backend

cp .env.example .env

# Edit .env with your database credentials

npm install

npx prisma generate

npx prisma db push

npm run dev
```

---

## 🎨 Frontend Setup

```bash
cd frontend

cp .env.example .env

# Edit .env with your API URL

npm install

npm run dev
```

---

## 🐳 Docker Setup (Optional)

```bash
docker-compose up -d
```

---

## 📡 API Documentation

Once the backend is running, access the interactive API documentation at:

```txt
http://localhost:5000/api-docs
```

---

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000

DATABASE_URL="postgresql://postgres:password@localhost:5432/personal_finance"

JWT_SECRET="your_secret_key"
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🚢 Deployment

### Backend Deployment (Railway/Render)

1. Push code to GitHub
2. Connect repository to Railway/Render
3. Add environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set environment variable: `VITE_API_URL`
4. Deploy

---

## ✅ Implemented Features Checklist

- ✅ JWT Authentication
- ✅ Transaction CRUD with filters
- ✅ Category management with icons
- ✅ Budget tracking with progress bars
- ✅ Dashboard with interactive charts (Recharts)
- ✅ CSV export (transactions and summary)
- ✅ Toast notifications
- ✅ Responsive design (mobile/desktop/tablet)
- ✅ Swagger/OpenAPI documentation
- ✅ Rate limiting and security headers
- ✅ Global error handling
- ✅ Zod validation
- ✅ Winston logging
- ✅ Docker support

---

## 🚧 Future Improvements

- Dark/light theme toggle
- PWA support
- Offline mode
- Email notifications
- Password recovery
- Unit and integration tests
- CI/CD pipeline
- Redis caching
- Refresh tokens
- Accessibility improvements

---

## 📄 License

MIT

---

## 👩‍💻 Author

Developed as part of a professional fullstack portfolio project focused on:

- Clean architecture
- Modern API development
- Responsive UI design
- Data visualization
- Security best practices
- Professional documentation



