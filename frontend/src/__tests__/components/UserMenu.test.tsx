import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import UserMenu from '../../components/Layout/UserMenu';

const mockLogout = vi.fn();

vi.mock('../../../contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { name: 'Test User', email: 'test@test.com' },
    logout: mockLogout,
  }),
}));

describe('UserMenu Component', () => {
  it('debería renderizar el botón del menú', () => {
    render(<UserMenu />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeDefined();
  });

  it('debería abrir el menú al hacer clic', () => {
    render(<UserMenu />);
    
    const menuButton = screen.getByRole('button');
    fireEvent.click(menuButton);
    
    expect(screen.getByText(/mi perfil/i)).toBeDefined();
    expect(screen.getByText(/cerrar sesión/i)).toBeDefined();
  });
});