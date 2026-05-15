import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor  } from '../utils/test-utils';
import CategoryList from '../../components/Categories/CategoryList';

vi.mock('../../services/api', () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: { data: [] } }),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('CategoryList Component', () => {
  it('debería renderizar el título de categorías', async () => {
    render(<CategoryList />);
    
    await waitFor(() => {
      expect(screen.getByText(/categorías/i)).toBeDefined();
    });
  });

  it('debería mostrar el botón de nueva categoría', async () => {
    render(<CategoryList />);
    
    await waitFor(() => {
      const newButton = screen.getByText(/nueva categoría/i);
      expect(newButton).toBeDefined();
    });
  });
});