import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      {/* Ícono de menú hamburguesa */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
      >
        <div className="w-5 h-4 flex flex-col justify-between">
          <span className="w-5 h-0.5 bg-white rounded-full" />
          <span className="w-5 h-0.5 bg-white rounded-full" />
          <span className="w-5 h-0.5 bg-white rounded-full" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-900 shadow-xl z-50 overflow-hidden">
          {/* Información del usuario */}
          <div className="p-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <span className="text-sm font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Opciones del menú */}
          <div className="p-2">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-300 rounded-xl hover:bg-slate-800 transition"
            >
              <span className="text-lg">📊</span>
              Dashboard
            </Link>
            <Link
              to="/transactions"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-300 rounded-xl hover:bg-slate-800 transition"
            >
              <span className="text-lg">💰</span>
              Transacciones
            </Link>
            <Link
              to="/categories"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-300 rounded-xl hover:bg-slate-800 transition"
            >
              <span className="text-lg">🏷️</span>
              Categorías
            </Link>
            <Link
              to="/budgets"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-300 rounded-xl hover:bg-slate-800 transition"
            >
              <span className="text-lg">📋</span>
              Presupuestos
            </Link>
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-slate-300 rounded-xl hover:bg-slate-800 transition"
            >
              <span className="text-lg">👤</span>
              Mi Perfil
            </Link>
            <div className="border-t border-slate-800 my-2" />
            <button
              onClick={() => {
                setIsOpen(false);
                logout();
              }}
              className="flex items-center gap-3 w-full px-3 py-2 text-sm text-red-400 rounded-xl hover:bg-red-500/10 transition"
            >
              <span className="text-lg">🚪</span>
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;