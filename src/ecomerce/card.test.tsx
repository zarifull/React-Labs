import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {CartDisplay} from './cartDisplay'; 

describe('CartDisplay Component', () => {
    it('себет бош болгондо тийиштүү текстти көрсөтүшү керек', () => {
      render(<CartDisplay />);
      
      expect(screen.getByText(/The cart is empty/i)).toBeInTheDocument();
    });
  });