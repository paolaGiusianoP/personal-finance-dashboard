import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../utils/test-utils';
import Login from '../../pages/Login';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el formulario de login', () => {
    render(<Login />);
    
    expect(screen.getByText(/bienvenido de vuelta/i)).toBeDefined();
    expect(screen.getByLabelText(/correo electrónico/i)).toBeDefined();
    expect(screen.getByLabelText(/contraseña/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /ingresar/i })).toBeDefined();
  });

  it('debería tener enlace a registro', () => {
    render(<Login />);
    
    const registerLink = screen.getByText(/regístrate gratis/i);
    expect(registerLink).toBeDefined();
  });
});