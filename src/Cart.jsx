import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify"; // Only import toast here
import emailjs from "@emailjs/browser";
import "./Cart.css";
import {
  clearCart,
  decrementCart,
  incrementCart,
  orderDetails,
  removeCart,
} from "./Store";

function Cart() {
  const cartObjects = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentDiscount, setDiscount] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponName, setCouponName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("qr");
  const [customerMail, setCustomerMail] = useState("");

  // Card details state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");

  const couponRef = useRef();

  const applyCoupon = () => {
    const code = couponRef.current.value.trim().toUpperCase();
    switch (code) {
      case "SAVE10":
        setCouponDiscount(10);
        setCouponName("Save 10%");
        toast.success("Coupon SAVE10 applied!");
        break;
      case "SAVE20":
        setCouponDiscount(20);
        setCouponName("Save 20%");
        toast.success("Coupon SAVE20 applied!");
        break;
      case "SAVE30":
        setCouponDiscount(30);
        setCouponName("Save 30%");
        toast.success("Coupon SAVE30 applied!");
        break;
      default:
        toast.error("Invalid coupon code. Please try again.");
    }
  };

  const calculateAmount = () => {
    const totalPrice = cartObjects.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const discountAmount = (totalPrice * (currentDiscount + couponDiscount)) / 100;
    const priceAfterDiscount = totalPrice - discountAmount;
    const tax = priceAfterDiscount * 0.1; // 10% tax
    const finalPrice = priceAfterDiscount + tax;
    return { totalPrice, priceAfterDiscount, tax, finalPrice, discountAmount };
  };

  const { totalPrice, priceAfterDiscount, tax, finalPrice, discountAmount } =
    calculateAmount();

  const orderId = Math.floor(100000 + Math.random() * 900000);
  const purchaseDate = new Date().toLocaleDateString();
  const purchaseDetails = {
    order_id: orderId,
    date: purchaseDate,
    items: [...cartObjects],
    finalPrice,
  };

  const handleCompletePurchase = () => {
    if (!paymentMethod) {
      toast.warn("Please select a payment method.");
      return;
    }

    if (!customerMail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerMail)) {
      toast.error("Please provide a valid email address.");
      return;
    }

    if (cartObjects.length === 0) {
      toast.info("Your cart is empty.");
      return;
    }

    if (paymentMethod === "card") {
      if (
        !cardNumber ||
        !cardName ||
        !cardExpiry ||
        !cardCVV ||
        cardNumber.length < 12 ||
        cardCVV.length < 3
      ) {
        toast.error("Please enter valid card details.");
        return;
      }
    }

    const templateParams = {
      order_id: purchaseDetails.order_id,
      orders: cartObjects.map((item) => ({
        name: item.name,
        image_url: item.image,
        price: item.price,
        units: item.quantity,
      })),
      cost: {
        totalAmount: totalPrice,
        discountPrice: discountAmount,
        taxAmount: tax,
        couponPrice: couponDiscount,
        finalAmount: finalPrice,
      },
      email: customerMail,
    };

    emailjs
      .send("service_2tf8imh", "template_hcnq7b8", templateParams, "n5eiALGKun6AO5vsQ")
      .then(() => {
        alert('Email sent successfully!');
      })
      .catch((error) => {
        alert(`Error sending email: ${error.text || error.message}`);
        
      });

    dispatch(clearCart());
    dispatch(orderDetails(purchaseDetails));
    alert('Order Purchased Successfully');
    setTimeout(() => navigate("/orders"), 1000);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Shopping Cart</h1>

      {cartObjects.length === 0 ? (
        <p className="empty-cart">Your cart is empty!</p>
      ) : (
        <div>
          <ul className="cart-list">
            {cartObjects.map((item, idx) => (
              <li key={idx} className="cart-item">
                <div className="cart-item-image-container">
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                </div>
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="cart-item-quantity-controls">
                  <button
                    className="quantity-btn decrement-btn"
                    onClick={() => dispatch(decrementCart(item))}
                  >
                    −
                  </button>
                  <span className="cart-item-quantity">{item.quantity}</span>
                  <button
                    className="quantity-btn increment-btn"
                    onClick={() => dispatch(incrementCart(item))}
                  >
                    +
                  </button>
                </div>
                <button
                  className="remove-cart-btn"
                  onClick={() => {
                    dispatch(removeCart(item));
                    toast.info(`${item.name} removed from cart`);
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="discount-coupon-section">
            <ToastContainer position="top-right" autoClose={1000} />
            <h2 className="section-title">Discounts</h2>
            <div className="discounts">
              {[10, 20, 30].map((value) => (
                <button
                  key={value}
                  className={`discount-btn discount-${value}`}
                  onClick={() => {
                    setDiscount(value);
                    toast.success(`${value}% Discount Applied!`);
                  }}
                >
                  {value}% Discount
                </button>
              ))}
            </div>
            <div className="coupon-input-container">
              <input
                ref={couponRef}
                className="coupon-input"
                placeholder="Enter coupon code"
              />
              <button className="apply-coupon-btn" onClick={applyCoupon}>
                Apply
              </button>
              {couponName && <p className="coupon-text">Applied: {couponName}</p>}
            </div>
          </div>

          <div className="order-summary">
            <h3 className="section-title">Order Summary</h3>
            <p>
              <span>Total Price:</span> ₹{totalPrice.toFixed(2)}
            </p>
            <p>
              <span>Discount:</span> ₹{discountAmount.toFixed(2)}
            </p>
            <p>
              <span>Tax (10%):</span> ₹{tax.toFixed(2)}
            </p>
            <p className="final-price">
              <span>Total:</span> ₹{finalPrice.toFixed(2)}
            </p>
            {paymentMethod === "qr" && (
              <QRCode
                value={`Payment for Order ID: ${orderId}, Amount: ₹${finalPrice.toFixed(2)}`}
                size={128}
              />
            )}
          </div>

          <div className="payment-buttons">
            <button
              className={`payment-btn ${paymentMethod === "qr" ? "active" : ""}`}
              onClick={() => setPaymentMethod("qr")}
            >
              Pay via QR Code
            </button>
            <button
              className={`payment-btn ${paymentMethod === "card" ? "active" : ""}`}
              onClick={() => setPaymentMethod("card")}
            >
              Pay via Card
            </button>
          </div>

          {paymentMethod === "card" && (
            <div className="card-payment-form">
              <h4 className="section-title">Card Details</h4>
              <input
                type="text"
                className="card-input"
                placeholder="Card Number"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <input
                type="text"
                className="card-input"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />
              <input
                type="text"
                className="card-input"
                placeholder="Expiry Date (MM/YY)"
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
              />
              <input
                type="password"
                className="card-input"
                placeholder="CVV"
                value={cardCVV}
                onChange={(e) => setCardCVV(e.target.value)}
              />
            </div>
          )}

          <div className="email-input-container">
            <input
              type="email"
              className="email-input"
              value={customerMail}
              onChange={(e) => setCustomerMail(e.target.value)}
              placeholder="Enter your email address"
            />
          </div>

          <center>
            <button className="payment-btn complete-purchase-btn" onClick={handleCompletePurchase}>
              Complete Purchase
            </button>
          </center>
        </div>
      )}
    </div>
  );
}

export default Cart;
