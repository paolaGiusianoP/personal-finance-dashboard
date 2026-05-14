# 🎨 Personal Finance Dashboard - Frontend

Frontend application for the Personal Finance Dashboard platform.

Built with React, TypeScript, Tailwind CSS, and Vite to provide a modern, responsive, and data-driven user experience.

---

# ✨ Features

## 🔐 Authentication
- Login and registration pages
- JWT session persistence
- Protected routes
- Authentication context
- Form validation

## 📊 Dashboard
- Financial summary cards
- Interactive charts with Recharts
- Monthly trends visualization
- Expense analytics
- Dynamic period filters

## 💳 Transactions
- Create transactions
- Edit transactions
- Delete transactions
- Advanced filters
- Real-time updates
- Responsive transaction table

## 🗂️ Categories
- Custom category management
- Emoji icons
- Income and expense categories
- Dynamic category filtering

## 🎨 UI/UX
- Modern dark mode design
- Glassmorphism effects
- Responsive layout
- Mobile navigation
- Smooth transitions
- Loading states
- Reusable UI components

---

# 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | UI Library |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Vite | Build tool |
| React Router DOM | Routing |
| Axios | API requests |
| Recharts | Data visualization |
| Context API | State management |

---

# 🏗️ Frontend Architecture

The frontend follows a modular and reusable component architecture focused on scalability and maintainability.

```txt
Pages
  ↓
Components
  ↓
Services/API
  ↓
Backend API
```

---

# 📁 Project Structure

```txt
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Auth/
│   │   ├── Categories/
│   │   ├── Dashboard/
│   │   ├── Layout/
|   |   └── Transactions/
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   │
│   ├── layouts/
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
|   |   ├── Profile.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Transactions.tsx
│   │   └── Categories.tsx
│   │
│   ├── routes/
│   │
│   ├── services/
│   │   └── api.ts
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
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
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Start development server

```bash
npm run dev
```

---

# 🔗 API Integration

The frontend communicates with the backend using Axios.

Example API service:

```ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default api;
```

---

# 🔐 Authentication Flow

```txt
User Login
    ↓
JWT Token Received
    ↓
Token Stored
    ↓
Protected Routes Access
    ↓
Authenticated API Requests
```

---

# 📊 Charts & Analytics

The dashboard includes interactive charts built with Recharts:

- Bar charts
- Pie charts
- Line charts
- Financial summaries
- Monthly trends

---

# 🎨 Design System

## UI Principles
- Minimalistic interface
- High contrast dark mode
- Consistent spacing
- Responsive design
- Reusable components

## Tailwind Usage
- Utility-first styling
- Responsive breakpoints
- Dynamic states
- Hover and focus effects
- Gradient backgrounds

---

# 📱 Responsive Design

The application is fully responsive for:

- Desktop
- Tablet
- Mobile devices

Responsive features include:
- Mobile navigation menu
- Flexible grids
- Adaptive tables
- Collapsible layouts

---

# 🧠 Frontend Concepts Demonstrated

- React component architecture
- TypeScript integration
- Responsive UI development
- API integration
- Authentication flow
- Protected routes
- Context API state management
- Reusable components
- Dynamic rendering
- Form handling
- Data visualization
- Clean UI design

---

# 🚧 Future Improvements

- Global state with Zustand
- Theme customization
- Advanced animations
- Skeleton loaders
- PWA support
- Offline mode
- Internationalization (i18n)
- Accessibility improvements
- Component testing
- Dark/light theme toggle

---

# 🚢 Deployment

## Recommended Platforms
- Vercel
- Netlify

## Build Command

```bash
npm run build
```

---

# 👩‍💻 Author

Frontend developed as part of a professional fullstack portfolio project focused on modern UI development, data visualization, and scalable frontend architecture.