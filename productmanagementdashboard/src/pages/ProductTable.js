import React, { useState, useEffect, useCallback } from 'react';
import FilterForm from '../components/FilterForm';
import "../styles/product_table.css";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [maxPrice, setMaxPrice] = useState(0);
  const [sortBy, setSortBy] = useState('DateAdded');
  const [sortOrder, setSortOrder] = useState('desc');
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [filter, setFilter] = useState({priceMin: 0});

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5102/api/products/get`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sortBy,
          sortOrder,
          page,
          pageSize,
          filter,
        }),
      });

      console.log(response);

      const data = await response.json();
      setProducts(data.items);
      setMaxPrice(data.maxPrice);
      setHasNextPage(data.hasNextPage);
      setHasPreviousPage(data.hasPreviousPage);
      setPage(data.page);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filter, sortBy, sortOrder]);

  const applyFilters = (newFilter, newSortBy, newSortOrder) => {
    setFilter(newFilter);
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    setPage(1);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [page, fetchProducts]);

  return (
    <div>
      <h1>Products</h1>
      {loading ? (
        <p>Loading Products...</p>
      ) : (
        <div className='filter-table-container'>
          <FilterForm 
            onApplyFilters={applyFilters}
            maxPrice={maxPrice}
            initialCategory={filter.category}
            initialName={filter.name}
            initialProductCode={filter.productCode}
            initialPriceRange={[filter.priceMin, filter.priceMax || maxPrice]}
            initialAvaliable={filter.avaliable}
            initialSortBy={sortBy}
            initialSortOrder={sortOrder}
          />
          <div className="product-table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Name</th>
                  <th>Product Code</th>
                  <th>Price (£)</th>
                  <th>Stock Quantity</th>
                  <th>Date Added</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.category}</td>
                    <td>{product.name}</td>
                    <td>{product.productCode}</td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>{product.stockQuantity}</td>
                    <td>{new Date(product.dateAdded).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="underline-buttons">
              <button onClick={() => setPage(page - 1)} disabled={!hasPreviousPage}>
                <span className="button-text">Previous</span>
              </button>
              <span>Page {page}</span>
              <button onClick={() => setPage(page + 1)} disabled={!hasNextPage}>
                <span className="button-text">Next</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );  
};

export default ProductsTable;
