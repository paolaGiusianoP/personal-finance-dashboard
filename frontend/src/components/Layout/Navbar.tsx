import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface NavbarProps {
  currentPage: 'dashboard' | 'transactions' | 'categories';
}

const Navbar: React.FC<NavbarProps> = ({ currentPage }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20"
          >
            <span className="text-xl font-bold text-white">$</span>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Finance Dashboard</h1>
            <p className="text-sm text-slate-400">Gestión financiera personal</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className={`transition ${
              currentPage === 'dashboard'
                ? 'text-blue-400 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/transactions"
            className={`transition ${
              currentPage === 'transactions'
                ? 'text-blue-400 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Transacciones
          </Link>
          <Link
            to="/categories"
            className={`transition ${
              currentPage === 'categories'
                ? 'text-blue-400 font-medium'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Categorías
          </Link>
          <div className="text-right">
            <p className="text-sm text-slate-500">Hola</p>
            <p className="font-semibold text-white">{user?.name}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;