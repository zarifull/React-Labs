import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CurrencyConverter from './CurrencyConverter';

describe('CurrencyConverter Component', () => {
  
  // This helper function creates a fake fetch response
  const mockFetchResponse = (data: any, ok = true) => {
    return vi.fn().mockResolvedValue({
      ok,
      json: () => Promise.resolve(data),
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calculates conversion correctly when the rate is fetched', async () => {
    const fetchMock = mockFetchResponse({ rates: { KGS: 89.0 } });
    vi.stubGlobal('fetch', fetchMock);

    render(<MemoryRouter><CurrencyConverter /></MemoryRouter>);

    const resultText = await screen.findByText(/89.00 KGS/i);
    expect(resultText).toBeInTheDocument();
  });

  it('updates the converted amount when the input changes', async () => {
    const fetchMock = mockFetchResponse({ rates: { KGS: 89.0 } });
    vi.stubGlobal('fetch', fetchMock);

    render(<MemoryRouter><CurrencyConverter /></MemoryRouter>);

    const input = screen.getByRole('spinbutton');
    fireEvent.change(input, { target: { value: '10' } });

    await waitFor(() => {
      expect(screen.getByText(/890.00 KGS/i)).toBeInTheDocument();
    });
  });

  it('displays an error message when the API request fails', async () => {
    // We mock a rejection to trigger the 'catch' block in your component
    const fetchMock = vi.fn().mockRejectedValue(new Error("Network Error"));
    vi.stubGlobal('fetch', fetchMock);

    render(<MemoryRouter><CurrencyConverter /></MemoryRouter>);

    const errorMessage = await screen.findByText(/Could not update exchange rate/i);
    expect(errorMessage).toBeInTheDocument();
  });
});