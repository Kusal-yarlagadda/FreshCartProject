import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NonVegItems.css';
import { addToCart } from './Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NonVegItems() {
  let nonVegProducts = useSelector((globalstate) => globalstate.products.nonVeg) || [];
  const dispatch = useDispatch();

  const priceRanges = [
    
    { value: 'Rs 200 to Rs 250', min: 200, max: 250 },
    { value: 'Rs 250 to Rs 300', min: 250, max: 300 },
    { value: 'Rs 300 to Rs 350', min: 300, max: 350 },
    { value: 'Rs 350 to Rs 400', min: 350, max: 400 },
    { value: 'Rs 400 to Rs 450', min: 400, max: 450 },
    { value: 'Above Rs 450', min: 450, max: Infinity },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRanges, setSelectedRanges] = useState([]);

  // Handle checkbox changes
  const handleCheckBoxChange = (priceRange) => {
    if (selectedRanges.includes(priceRange)) {
      setSelectedRanges(selectedRanges.filter((range) => range !== priceRange));
    } else {
      setSelectedRanges([...selectedRanges, priceRange]);
    }
    setCurrentPage(1); // Reset to page 1 after changing filters
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  // Active ranges based on selected filters
  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  // Filtered products based on selected price ranges
  const filteredProducts =
    selectedRanges.length === 0
      ? nonVegProducts
      : nonVegProducts.filter((product) =>
          activeRanges.some(
            (range) => product.price >= range.min && product.price <= range.max
          )
        );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  // Render product cards
  const NonVegItemsList = currentItems.map((product, index) => (
    <div className="nonveg-card" key={index}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button
        onClick={() => {
          dispatch(addToCart(product));
          toast.success("Product added to cart successfully!");
        }}
      >
        Add to Cart
      </button>
    </div>
  ));

  return (
    <div className="nonveg-items-container">
      {/* ToastContainer added here */}
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>These are Non-Veg Products</h1>
      <div className="filters-container">
        {priceRanges.map((range) => (
          <label key={range.value}>
            <input
              type="checkbox"
              onChange={() => handleCheckBoxChange(range.value)}
              checked={selectedRanges.includes(range.value)}
            />
            {range.value}
          </label>
        ))}
        <button className="clear-filters-button" onClick={clearFilters}>
          Clear Filters
        </button>
      </div>
      <div className="nonveg-products-container">
        {NonVegItemsList.length > 0 ? (
          NonVegItemsList
        ) : (
          <p>No products match the selected filters.</p>
        )}
      </div>
      <div className="pagination-container">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'current-page' : ''}
            onClick={() => goToPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default NonVegItems;
