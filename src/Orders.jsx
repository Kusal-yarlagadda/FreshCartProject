import React from 'react';
import { useSelector } from 'react-redux';
import './Orders.css';

function Orders() {
  const orderObjects = useSelector((state) => state.ordercomponents);

  const orderListItems = orderObjects.map((order, index) => (
    <li key={index} className="order-card">
      <div className="order-header">
        <p className="order-id"><strong>Order ID:</strong> {order.order_id}</p>
        <p className="order-date"><strong>Date:</strong> {order.date}</p>
      </div>
      <ul className="order-items-list">
        {order.items.map((item, idx) => (
          <li key={idx} className="order-item">
            <img src={item.image} alt={item.name} className="order-item-image" />
            <div className="order-item-details">
              <span className="order-item-name">{item.name}</span>
              <span className="order-item-quantity">Qty: {item.quantity}</span>
              <span className="order-item-price">₹{item.price}</span>
            </div>
          </li>
        ))}
      </ul>
      <p className="order-total"><strong>Final Price:</strong> ₹{order.finalPrice.toFixed(2)}</p>
    </li>
  ));

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>
      {orderObjects.length === 0 ? (
        <p className="no-orders">No orders yet!</p>
      ) : (
        <ul className="orders-list">{orderListItems}</ul>
      )}
    </div>
  );
}

export default Orders;
