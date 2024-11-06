import React, { useState } from 'react';
import "../styles/register.css"

const Register = () => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    productCode: '',
    price: '',
    stockQuantity: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5102/api/products/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Product registered successfully!'); 
        setFormData({
          category: '',
          name: '',
          productCode: '',
          price: '',
          stockQuantity: ''
        });
      } else {
        const error = await response.json();
        alert('Error while attempting to register product: ' + error.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error while attempting to register product. Please try again later.');
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="register-product-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="category">Category</label>
          <input
            name="category"
            id="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="name">Name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="productCode">Product Code</label>
          <input
            name="productCode"
            id="productCode"
            type="text"
            value={formData.productCode}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="price">Price</label>
          <input
            name="price"
            id="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-section">
          <label htmlFor="stockQuantity">Stock Quantity</label>
          <input
            name="stockQuantity"
            id="stockQuantity"
            type="number"
            value={formData.stockQuantity}
            onChange={handleChange}
            required
          />
        </div>

        <div className="button-container">
          <button type="submit">
            <span className="button-text">Register Product</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
