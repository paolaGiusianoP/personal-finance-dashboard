# 💰 Personal Finance Dashboard

Modern fullstack web application for personal finance management, built to showcase professional frontend, backend, and data visualization skills.

The platform allows users to manage income and expenses, analyze financial trends, and visualize data through an interactive dashboard with charts and KPIs.

---

## 🌐 Live Demo

Frontend: `https://your-frontend-url.vercel.app`  
Backend API: `https://your-api-url.onrender.com`

---

## 📸 Screenshots

### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

### Transactions
![Transactions](./docs/screenshots/transactions.png)

### Analytics
![Analytics](./docs/screenshots/analytics.png)

### Authentication
![Login](./docs/screenshots/login.png)

---

# ✨ Features

## 🔐 Authentication
- JWT authentication
- User registration and login
- Protected routes
- Persistent sessions
- Profile management

## 💳 Transactions
- Create, edit, and delete transactions
- Income and expense management
- Real-time updates
- Date and category filters
- CSV export support

## 📊 Dashboard & Analytics
- Financial KPIs
- Interactive charts
- Monthly trends
- Expense distribution
- Balance tracking

## 🗂️ Categories
- Custom categories
- Emoji icons
- Income and expense separation
- Default categories for new users

## 🎨 UI/UX
- Modern dark interface
- Responsive design
- Glassmorphism effects
- Smooth animations
- Mobile-friendly layout

---

# 🛠️ Tech Stack

## Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios
- Recharts

## Backend
- Node.js
- Express
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Bcrypt

## DevOps & Tools
- Docker
- Docker Compose
- Vercel
- Render / Railway

---

# 🏗️ Architecture

The backend follows a layered architecture focused on scalability, maintainability, and clean code principles.

```txt
Controller
   ↓
Service
   ↓
Repository
   ↓
Database (Prisma + PostgreSQL)