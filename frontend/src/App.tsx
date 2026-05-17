import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Profile from './pages/Profile';
import Budgets from './pages/Budgets';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center overflow-hidden relative">
        {/* Background blur effects */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        {/* Loader */}
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-2xl border-4 border-slate-700 border-t-blue-500 animate-spin" />

          <div className="text-center">
            <h2 className="text-xl font-bold text-white">
              Cargando...
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              Preparando tu dashboard financiero
            </p>
          </div>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="/transactions"
        element={
          <PrivateRoute>
            <Transactions />
          </PrivateRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/budgets"
        element={
          <PrivateRoute>
            <Budgets />
          </PrivateRoute>
        }
      />

      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,

              style: {
                background: 'rgba(15, 23, 42, 0.95)',
                color: '#ffffff',
                borderRadius: '18px',
                padding: '14px 18px',
                border: '1px solid rgba(51, 65, 85, 0.8)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 10px 30px rgba(0, 0, 0, 0.35)',
                fontSize: '14px',
                fontWeight: '500',
              },

              success: {
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#ffffff',
                },

                style: {
                  border:
                    '1px solid rgba(16, 185, 129, 0.25)',
                },
              },

              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#ffffff',
                },

                style: {
                  border:
                    '1px solid rgba(239, 68, 68, 0.25)',
                },
              },
            }}
          />

          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;