import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VegItems.css'; 
import { addToCart } from './Store';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

function VegItems() {
  let vegProducts = useSelector((globalstate) => globalstate.products.veg) || [];
  const dispatch = useDispatch();

  const priceRanges = [
    { value: 'Rs 1 to Rs 40', min: 1, max: 40 },
    { value: 'Rs 40 to Rs 80', min: 40, max: 80 },
    { value: 'Rs 80 to Rs 120', min: 80, max: 120 },
    { value: 'Rs 120 to Rs 160', min: 120, max: 160 },
    { value: 'Rs 160 to Rs 200', min: 160, max: 200 },
    { value: 'Above Rs 200', min: 200, max: Infinity },
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
      ? vegProducts
      : vegProducts.filter((product) =>
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
  const VegItemsList = currentItems.map((product, index) => (
    <div className="veg-card" key={index}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>Price: ₹{product.price}</p>
      <button onClick={() => {dispatch(addToCart(product));
    toast.success("product added  successfully")}}>Add to Cart</button>
    </div>
  ));

  return (
    <div className="veg-items-container">
      <ToastContainer position="top-right" autoClose={3000}/>
      <h1>These are Veg Products</h1>
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
      <div className="veg-products-container">
        {VegItemsList.length > 0 ? (
          VegItemsList
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

export default VegItems;
