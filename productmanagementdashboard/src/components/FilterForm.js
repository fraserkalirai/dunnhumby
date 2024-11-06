import React, { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import "../styles/filter_form.css";

const FilterForm = ({ onApplyFilters, maxPrice, initialCategory, initialName, initialProductCode, initialPriceRange, initialAvaliable, initialSortBy, initialSortOrder }) => {
  const [sortBy, setSortBy] = useState(initialSortBy || '');
  const [sortOrder, setSortOrder] = useState(initialSortOrder || 'desc');
  const [category, setCategory] = useState(initialCategory || '');
  const [name, setName] = useState(initialName || '');
  const [productCode, setProductCode] = useState(initialProductCode || '');
  const [priceRange, setPriceRange] = useState(initialPriceRange || [0, maxPrice]);
  const [avaliable, setAvaliable] = useState(initialAvaliable || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [priceMin, priceMax] = priceRange;
    onApplyFilters({
      category,
      name,
      productCode,
      priceMin,
      priceMax,
      avaliable,
    }, sortBy, sortOrder);
  };

  return (
    <form onSubmit={handleSubmit} className="filter-form">
      <div>
        <label htmlFor="sortBy">Sort By</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="DateAdded">Date Added</option>
          <option value="Price">Price</option>
          <option value="Category">Category</option>
          <option value="Name">Name</option>
          <option value="ProductCode">Product Code</option>
          <option value="StockQuantity">Stock Quantity</option>
        </select>
      </div>
      <div>
        <label>Sort Order</label>
        <label>
          <input
            value="asc"
            type="radio"
            checked={sortOrder === 'asc'}
            onChange={() => setSortOrder('asc')}
          />
          Asc
        </label>
        <label>
          <input
            value="desc"
            type="radio"
            checked={sortOrder === 'desc'}
            onChange={() => setSortOrder('desc')}
          />
          Desc
        </label>
      </div>
      <div>
        <label>Category</label>
        <input
          value={category}
          type="text"
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div>
        <label>Name</label>
        <input
          value={name}
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Product Code</label>
        <input
          value={productCode}
          type="text"
          onChange={(e) => setProductCode(e.target.value)}
        />
      </div>
      <div>
        <label>Price Range</label>
        <Slider
          range
          min={0}
          max={maxPrice}
          value={priceRange}
          onChange={(range) => setPriceRange(range)}
        />
        <div>
          <span>£{priceRange[0]} - {priceRange[1]}</span>
        </div>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={avaliable}
            onChange={(e) => setAvaliable(e.target.checked)}
          />
          Only Avaliable
        </label>
        <div className='underline-buttons'>
          <button type="submit">
            <span className="button-text">Apply Filters</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default FilterForm;
