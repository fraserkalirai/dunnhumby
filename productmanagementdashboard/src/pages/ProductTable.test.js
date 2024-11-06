import { render, screen, waitFor, act } from '@testing-library/react';
import ProductsTable from './ProductTable'; // Adjust the import if needed
import '@testing-library/jest-dom';

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          items: [
            { id: 1, category: 'Book', name: 'Fantastic Mr Fox', productCode: 'product_code_1', price: 12.58, stockQuantity: 12, dateAdded: '2024-11-01' },
            { id: 2, category: 'Book', name: 'James and the Giant Peach', productCode: 'product_code_2', price: 9.59, stockQuantity: 25, dateAdded: '2024-10-28' },
            { id: 3, category: 'Toy', name: 'Nerf Gun', productCode: 'product_code_3', price: 199.03, stockQuantity: 2, dateAdded: '2024-10-20' }
          ],
          totalCount: 3,
          maxPrice: 200,
          hasNextPage: false,
          hasPreviousPage: false
        })
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

test('Render the inital loading message', () => {
  render(<ProductsTable />);
  expect(screen.getByText(/Loading Products.../i)).toBeInTheDocument();
});

test('fetches products and displays them correctly', async () => {
  await act(async () => {
    render(<ProductsTable />);
  });
  
  await waitFor(() => expect(screen.getByText('Fantastic Mr Fox')).toBeInTheDocument());

  // Check all products are displayed on the page.
  expect(screen.getByText('Fantastic Mr Fox')).toBeInTheDocument();
  expect(screen.getByText('James and the Giant Peach')).toBeInTheDocument();
  expect(screen.getByText('Nerf Gun')).toBeInTheDocument();

  // Check other columns.
  expect(screen.getByText('Toy')).toBeInTheDocument();
  expect(screen.getByText('product_code_3')).toBeInTheDocument();
  expect(screen.getByText('199.03')).toBeInTheDocument();
});

test('Check the pagination buttons are correctly disabled', async () => {
  await act(async () => {
    render(<ProductsTable />);
  });
  
  await waitFor(() => screen.getByText('Fantastic Mr Fox'));
  
  const previousButton = screen.getByText('Previous').closest('button');
  const nextButton = screen.getByText('Next').closest('button');
  
  expect(previousButton).toBeDisabled();
  expect(nextButton).toBeDisabled();
});
