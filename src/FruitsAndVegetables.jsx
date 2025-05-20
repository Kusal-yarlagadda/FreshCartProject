import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './FruitsAndVegetables.css';
import { addToCart } from './Store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FruitsAndVegetables() {
  const fruitProducts = useSelector((state) => state.products.fruits) || [];
  const dispatch = useDispatch();

  const priceRanges = [
    { value: 'Rs 1 to Rs 40', min: 1, max: 40 },
    { value: 'Rs 40 to Rs 80', min: 40, max: 80 },
    { value: 'Rs 80 to Rs 120', min: 80, max: 120 },
    { value: 'Rs 120 to Rs 160', min: 120, max: 160 },
    { value: 'Above Rs 160', min: 160, max: Infinity },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRanges, setSelectedRanges] = useState([]);

  const handleCheckBoxChange = (priceRange) => {
    if (selectedRanges.includes(priceRange)) {
      setSelectedRanges(selectedRanges.filter((range) => range !== priceRange));
    } else {
      setSelectedRanges([...selectedRanges, priceRange]);
    }
    setCurrentPage(1); // Reset to page 1 after changing filters
  };

  const clearFilters = () => {
    setSelectedRanges([]);
    setCurrentPage(1);
  };

  const activeRanges = priceRanges.filter((range) =>
    selectedRanges.includes(range.value)
  );

  const filteredProducts =
    selectedRanges.length === 0
      ? fruitProducts
      : fruitProducts.filter((product) =>
          activeRanges.some(
            (range) => product.price >= range.min && product.price <= range.max
          )
        );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (page) => setCurrentPage(page);

  const FruitItemsList = currentItems.map((product, index) => (
    <div className="product-card" key={`fruit-${index}`}>
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
    <div className="fruits-vegetables-container">
      {/* ToastContainer added here */}
      <ToastContainer position="top-right" autoClose={3000} />
      <h1>Fruits and Vegetables</h1>
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
      <div className="category-section">
        <h2>Fruits</h2>
        <div className="products-container">{FruitItemsList}</div>
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
    </div>
  );
}

export default FruitsAndVegetables;
