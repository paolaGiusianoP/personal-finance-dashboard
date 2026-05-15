import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import Register from '../../pages/Register';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debería renderizar el formulario de registro', () => {
    render(<Register />);
    
    expect(screen.getAllByText(/crear cuenta/i).length).toBeGreaterThan(0);
    
    expect(screen.getByPlaceholderText(/tu nombre/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/correo@ejemplo.com/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/mínimo 6 caracteres/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /crear cuenta/i })).toBeDefined();
  });

  it('debería tener enlace a login', () => {
    render(<Register />);
    
    const loginLink = screen.getByText(/iniciar sesión/i);
    expect(loginLink).toBeDefined();
  });
});