import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '../utils/test-utils';
import Dashboard from '../../pages/Dashboard';

vi.mock('../../contexts/AuthContext', async () => {
  const actual = await vi.importActual<
    typeof import('../../contexts/AuthContext')
  >('../../contexts/AuthContext');

  return {
    ...actual,
    useAuth: () => ({
      user: { name: 'Test User', email: 'test@test.com' },
      logout: vi.fn(),
    }),
  };
});

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
  },
}));

describe('Dashboard Page', () => {
  it('debería renderizar el dashboard', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(screen.getByText(/resumen financiero/i)).toBeDefined();
    });
  });

  it('debería mostrar el nombre del usuario en el menú', async () => {
    render(<Dashboard />);

    const menuButton = document.querySelector(
      '.p-2.rounded-xl.bg-slate-800'
    );

    if (menuButton) {
      (menuButton as HTMLElement).click();
    }

    await waitFor(() => {
      expect(screen.getByText(/Test User/i)).toBeDefined();
    });
  });
});