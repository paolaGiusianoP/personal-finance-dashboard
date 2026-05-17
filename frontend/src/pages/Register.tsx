import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      const msg = 'Las contraseñas no coinciden';
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password.length < 6) {
      const msg = 'La contraseña debe tener al menos 6 caracteres';
      setError(msg);
      toast.error(msg);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await register(email, password, name);
      
      toast.success('¡Cuenta creada exitosamente!');
      toast.success('Bienvenido a Finance Dashboard');
      
      navigate('/dashboard');
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Error al registrar usuario';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center px-4 py-8">
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8">
        
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          
          <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-5">
            <span className="text-2xl font-bold text-white">$</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Crear Cuenta
          </h1>

          <p className="text-slate-400 text-center mt-2">
            Gestiona tus finanzas de forma inteligente
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
              className="
                w-full
                rounded-xl
                border
                border-slate-700
                bg-slate-800
                px-4
                py-3
                text-white
                placeholder:text-slate-500
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-transparent
                transition
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-4
                  py-3
                  pr-12
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-800
                  px-4
                  py-3
                  pr-12
                  text-white
                  placeholder:text-slate-500
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                  focus:border-transparent
                  transition
                "
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showConfirmPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-500
              py-3
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-blue-600
              hover:shadow-lg
              hover:shadow-blue-500/30
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registrando...
              </div>
            ) : (
              'Crear Cuenta'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-slate-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            to="/login"
            className="font-medium text-blue-400 hover:text-blue-300 transition"
          >
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;