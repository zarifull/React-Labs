import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {CartDisplay} from './cartDisplay'; // Сенин компонентиңдин жолун текшер

describe('CartDisplay Component', () => {
    it('себет бош болгондо тийиштүү текстти көрсөтүшү керек', () => {
      render(<CartDisplay />);
      
      // Себет бош болгондо ушул текст чыгышы керек:
      expect(screen.getByText(/The cart is empty/i)).toBeInTheDocument();
    });
  });