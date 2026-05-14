import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { icon: '📊', label: 'Dashboard', path: '/dashboard' },
    { icon: '💰', label: 'Transacciones', path: '/transactions' },
    { icon: '🏷️', label: 'Categorías', path: '/categories' },
    { icon: '👤', label: 'Mi Perfil', path: '/profile' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition z-50"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-0.5 bg-white rounded-full transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {isOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
        />
      )}

      {/* Menú lateral */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 border-r border-slate-800 shadow-2xl z-40 transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header del menú */}
        <div className="p-6 pt-20 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-xl font-bold text-white">$</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Finance Dashboard</h2>
              <p className="text-xs text-slate-400">Personal Finance</p>
            </div>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
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

        {/* Items del menú */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMenu}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                location.pathname === item.path
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
              {location.pathname === item.path && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
              )}
            </Link>
          ))}
        </nav>

        {/* Botón de logout */}
        <div className="absolute bottom-6 left-0 right-0 px-4">
          <button
            onClick={() => {
              closeMenu();
              logout();
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;