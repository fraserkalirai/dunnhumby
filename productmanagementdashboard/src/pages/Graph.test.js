import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Graph from './Graph';
import '@testing-library/jest-dom';

global.fetch = jest.fn();

beforeEach(() => {
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve({
      items: [
        { id: 1, category: 'Book', stockQuantity: 12 },
        { id: 2, category: 'Book', stockQuantity: 8 },
        { id: 3, category: 'Toy', stockQuantity: 15 },
        { id: 4, category: 'Toy', stockQuantity: 10 },
        { id: 5, category: 'Electronics', stockQuantity: 7 }
      ]
    })
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Render the loading of the chart, then the chart', async () => {
  render(<Graph />);

  expect(screen.getByText('Loading PDM chart...')).toBeInTheDocument();

  await waitFor(() => {
    const canvasElement = screen.getByRole('img');
    expect(canvasElement).toBeInTheDocument();
  });
});
