To start up the project locally: docker-compose up --build

The React App 
  - The application is exposed on: http://localhost:3000/
  - Has pages / (Home), /register, /product_table and /graph

The Asp.net Api
  - The application is exposed on: http://localhost:5102/
  - Has endpoints:
    http://localhost:5102/api/products/get:
      Post request expecting JSON (example):
        {
          "sortBy": "Price",
          "sortOrder": "desc",
          "page": 1,
          "pageSize": 10,
          "filter": {
            "category": "Book",
            "name": "The",
            "productCode": "",
            "priceMin": 0,
            "priceMax": 50
          }
        }

    
    http://localhost:5102/api/products/register:
      Post request expecting JSON (example):
        {
          "category": "Book",
          "name": "The BFG",
          "productCode": "product_code_1",
          "price": 12.99,
          "stockQuantity": 3,
        }
  
Some inital next steps:
  1. Create a call to fecth all unique category and make the category filter a drop
     down as it expects an exact match.
  2. Implement a 2 sig fig rounding for maxPrice so the scale filter is pretty and is 
     not for example 0 - 128.
  3. Create a call for the graph or update the get call to allow there to be no pagination
     so that the graph doesn't have to pass page size <insert very large number>.