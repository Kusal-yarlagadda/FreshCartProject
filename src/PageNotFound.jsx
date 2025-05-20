import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'; // Import the external CSS

const PageNotFound = () => {
  return (
    <div className="pagenotfound-container">
      <img
        src="/images/page-not-found.jpg" // Replace with your preferred image in public/images
        alt="Page Not Found"
        className="pagenotfound-image"
      />
      <h1 className="pagenotfound-heading">Oops! Page Not Found</h1>
      <p className="pagenotfound-message">
        We couldn't find the page you were looking for. It might have been removed, renamed, or doesn't exist.
      </p>
      <Link to="/home" className="pagenotfound-button">
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
