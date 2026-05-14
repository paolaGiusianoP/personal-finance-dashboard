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
- Profile management

## 📊 Dashboard
- Financial summary cards
- Interactive charts with Recharts
- Monthly trends visualization
- Expense analytics
- Dynamic period filters
- Financial KPIs

## 💳 Transactions
- Create transactions
- Edit transactions
- Delete transactions
- Advanced filters
- Real-time updates
- Responsive transaction table
- CSV export support

## 🗂️ Categories
- Custom category management
- Emoji icons
- Income and expense categories
- Dynamic category filtering

## 💰 Budgets
- Monthly budget limits
- Budget progress bars with color alerts
- Visual warnings when approaching limits
- Month/year selector
- Real-time budget vs actual spending
- Budget alerts

## 📥 Export
- Export all transactions to CSV
- Export financial summary to CSV
- Automatic filename with date
- UTF-8 encoding for special characters

## 🔔 User Experience
- Toast notifications for all CRUD actions
- Success and error feedback
- Loading states
- Confirmation dialogs

## 🎨 UI/UX
- Modern responsive design
- Glassmorphism effects
- Mobile navigation
- Smooth transitions
- Reusable UI components
- Responsive layout for desktop/tablet/mobile

---

# ✅ Implemented Features

- ✅ Authentication (login/register/profile)
- ✅ Transaction CRUD with filters
- ✅ Category management with icons
- ✅ Budget tracking with progress bars
- ✅ Dashboard with interactive charts
- ✅ CSV export for transactions and summary
- ✅ Toast notifications
- ✅ Responsive design (mobile/desktop)
- ✅ Protected routes
- ✅ TypeScript
- ✅ Tailwind CSS

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
| React Hot Toast | Notifications |
| PapaParse | CSV export |
| FileSaver | File download |

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
│   │   ├── Layout/
│   │   ├── Dashboard/
│   │   ├── Transactions/
│   │   ├── Categories/
│   │   └── Budgets/
│   │
│   ├── contexts/
│   │   └── AuthContext.tsx
│   │
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── Profile.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Transactions.tsx
│   │   ├── Categories.tsx
│   │   └── Budgets.tsx
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
│   │   ├── exportToCSV.ts
│   │   └── formatters.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
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
- Expense analytics
- Budget comparisons

---

# 🎨 Design System

## UI Principles
- Minimalistic interface
- Consistent spacing
- Responsive layouts
- Reusable components
- Clear visual hierarchy

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
- Responsive charts

---

# 🔔 Toast Notifications

The application includes real-time notifications for:
- Successful actions
- Error handling
- CRUD operations
- Authentication feedback
- Export actions

---

# 📥 CSV Export

Users can export:
- Transactions
- Financial summaries
- Reports with automatic filenames

Export features include:
- UTF-8 support
- Special character compatibility
- Downloadable CSV files

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
- Budget tracking and alerts
- Export capabilities (CSV)
- Toast notifications
- Clean UI design

---

# 🚧 Future Improvements

- ~~Toast notifications~~ ✅
- ~~CSV export~~ ✅
- ~~Budget tracking~~ ✅
- Dark/light theme toggle
- Global state with Zustand/Redux
- PWA support
- Offline mode
- Advanced animations
- Internationalization (i18n)
- Accessibility improvements
- Component testing with Vitest

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

