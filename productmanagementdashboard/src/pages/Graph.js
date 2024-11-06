import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement);

const Graph = () => {
  const [chartData, setChartData] = useState(null);  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5102/api/products/get`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sortBy: 'DateAdded',
            sortOrder: 'desc',
            page: 1,
            pageSize: 100000000,
            filter: {},
          }),
        });

        const response_json = await response.json();
        const products = response_json.items;
        const totalsPerCategory = products.reduce((acc, product) => {
          const { category, stockQuantity } = product;
          acc[category] = (acc[category] || 0) + stockQuantity;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(totalsPerCategory),
          datasets: [
            {
              label: 'Total Stock Quantity',
              data: Object.values(totalsPerCategory),
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
              borderColor: 'rgba(0, 0, 0, 0.5)', 
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error while attempting to fetch product data:", error);
      }
    };
    
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Stock Quantity per Category</h1>
        <div style={{ width: '75vw', height: '70vh', margin: 'auto', paddingTop: '4rem' }}>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: {
                    text: 'Product Category',
                    color: 'black',
                    display: true,
                    font: {
                      size: 28,
                      family: 'Times New Roman',
                      weight: 'bold',
                    },
                  },
                  ticks: {
                    color: 'black',
                    font: {
                      size: 20,
                      family: 'Times New Roman',
                    },
                  },
                },
                y: {
                  beginAtZero: true,
                  title: {
                    text: 'Total Stock Quantity',
                    color: 'black',
                    display: true,
                    font: {
                      size: 28,
                      family: 'Times New Roman',
                      weight: 'bold',
                    },
                    padding: {
                      bottom: 20,
                    },
                  },
                  ticks: {
                    color: 'black',
                    font: {
                      size: 20,
                      family: 'inherit',
                    },
                  },
                },
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'black',
                    font: {
                      size: 28,
                      family: 'Times New Roman',
                    },
                  },
                },
              },
            }}
          />
        ) : (<p>Loading PDM chart...</p>)}
      </div>
    </div>  
  );
};

export default Graph;
