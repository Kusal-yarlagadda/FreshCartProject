import React from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import VegItems from './VegItems';
import NonVegItems from './NonVegItems';
import FruitsAndVegetables from './FruitsAndVegetables';
import DairyProducts from './DairyProducts';
import SignIn from './Signin';
import Cart from './Cart';
import Orders from './Orders';
import AboutUs from './AboutUs';
import ContactUs from './ContactUs';
import Home from './Home';

import './App.css';
import Signup from './Signup';
import { logout } from './store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageNotFound from './PageNotFound';

function Header() {
  const cartObject = useSelector((globalstate) => globalstate.cart);
  const totalCartCount = cartObject.reduce((count, item) => count + item.quantity, 0);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("You have been logged out.");
    navigate('/signin'); // optional: redirect to signin after logout
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="project-name">&#128722; FreshCart</h1>
        <nav className="navbar">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/veg" className="nav-link">&#x1F331; Veg</Link>
          <Link to="/non-veg" className="nav-link">&#x1F357; Non-Veg</Link>
          <Link to="/fruits-vegetables" className="nav-link">&#x1F34E; Fruits</Link>
          <Link to="/dairy-products" className="nav-link">&#x1F95B; Dairy Products</Link>
          <Link to="/cart-items" className="nav-link">&#x1F6D2; Cart ({totalCartCount})</Link>
          <Link to="/orders" className="nav-link">&#x1F6CD; Orders</Link>
          <Link to="/About-us" className="nav-link">&#x1F30D; About Us</Link>
          <Link to="/Contact-us" className="nav-link">&#x260E; Contact Us</Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="nav-link logout-button"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white' }}
            >
              &#x1F511; Logout
            </button>
          ) : (
            <Link to="/signin" className="nav-link">&#x1F511; Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      {/* ToastContainer must be placed here once */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/veg" element={<VegItems />} />
          <Route path="/non-veg" element={<NonVegItems />} />
          <Route path="/fruits-vegetables" element={<FruitsAndVegetables />} />
          <Route path="/dairy-products" element={<DairyProducts />} />
          <Route path="/cart-items" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/About-us" element={<AboutUs />} />
          <Route path="/Contact-us" element={<ContactUs />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
