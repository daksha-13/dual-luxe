import React, { useState } from "react";
import Review from "./Review";

export default function Checkout({ setPage, initialProducts }) {
  const [cartItems] = useState(initialProducts || []); // Products from Cart
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("");
  const [details, setDetails] = useState({
    name: "",
    address: "",
    contact: "",
    altContact: "",
    landmark: "",
    pincode: "",
  });
  const [orderId] = useState(Math.floor(Math.random() * 1000000)); // Random order ID
  const [deliveryDate, setDeliveryDate] = useState("");
  const [showReview, setShowReview] = useState(false);

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const isFormValid =
    details.name && details.address && details.contact && details.pincode;

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString();
  };

  const handlePayment = (selectedPayment) => {
    setPayment(selectedPayment);
    setStep(3);
  };

  const handleConfirmOrder = () => {
    setDeliveryDate(getDeliveryDate());
    setStep(4);
  };

  // Total cart price
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={styles.page}>
      {/* Step 1: Cart */}
      {step === 1 && (
        <div style={styles.card}>
          <h2 style={styles.title}>🛍️ Your Cart</h2>
          {cartItems.length === 0 ? (
            <p style={styles.text}>Your cart is empty!</p>
          ) : (
            <div style={styles.cartItemsContainer}>
              {cartItems.map((item, index) => (
                <div key={index} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.cartItemImage} />
                  <div style={styles.cartItemDetails}>
                    <h3 style={styles.text}>{item.name}</h3>
                    <p style={styles.text}>₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {cartItems.length > 0 && (
            <p style={styles.total}>Total: ₹{totalPrice.toLocaleString()}</p>
          )}
          {cartItems.length > 0 && (
            <button style={styles.button} onClick={() => setStep(2)}>
              Proceed to Payment
            </button>
          )}
        </div>
      )}

      {/* Step 2: Payment */}
      {step === 2 && (
        <div style={styles.card}>
          <h2 style={styles.title}>💳 Choose Payment Method</h2>
          {["PhonePe", "GPay", "Paytm", "Cash on Delivery"].map((opt) => (
            <button
              key={opt}
              onClick={() => handlePayment(opt)}
              style={{
                ...styles.optionBtn,
                backgroundColor: payment === opt ? "#d4af37" : "rgba(255,255,255,0.2)",
                color: payment === opt ? "#fff" : "#d4af37",
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Delivery Details */}
      {step === 3 && (
        <div style={styles.card}>
          <h2 style={styles.title}>📦 Delivery Details</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (isFormValid) handleConfirmOrder();
            }}
            style={styles.form}
          >
            <input
              style={styles.input}
              name="name"
              placeholder="Full Name *"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="address"
              placeholder="Address *"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="landmark"
              placeholder="Landmark"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="pincode"
              placeholder="Pincode *"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="contact"
              placeholder="Contact Number *"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="altContact"
              placeholder="Alternate Contact (Optional)"
              onChange={handleChange}
            />
            <button type="submit" style={styles.button} disabled={!isFormValid}>
              Confirm Order
            </button>
          </form>
        </div>
      )}

      {/* Step 4: Order Confirmation */}
      {step === 4 && !showReview && (
        <div style={styles.card}>
          <h2 style={styles.title}>🎉 Order Confirmed!</h2>
          <p style={styles.text}>Your order will be delivered soon.</p>
          <p style={styles.text}>Order ID: {orderId}</p>
          <p style={styles.text}>Delivery Date: {deliveryDate}</p>
          <p style={styles.text}>
            Payment via: <b>{payment}</b>
          </p>
          <button style={styles.button} onClick={() => setShowReview(true)}>
            ⭐ Leave a Review
          </button>
        </div>
      )}

      {/* Step 5: Review */}
      {showReview && <Review setPage={setPage} />}
    </div>
  );
}

// Luxury Styles with Transparent Background
const styles = {
  page: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // Transparent page
    fontFamily: "'Playfair Display', serif",
    color: "#d4af37", // Luxury gold font
  },
  card: {
    background: "rgba(0,0,0,0.5)", // Semi-transparent card
    padding: "40px",
    borderRadius: "25px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
    textAlign: "center",
    width: "90%",
    maxWidth: "500px",
    transition: "all 0.3s ease-in-out",
  },
  title: { color: "#ffd700", marginBottom: "20px", fontSize: "26px" },
  text: { color: "#ffd700", marginBottom: "12px", fontSize: "16px" },
  optionBtn: {
    display: "block",
    width: "100%",
    padding: "15px",
    marginBottom: "12px",
    borderRadius: "15px",
    border: "2px solid #d4af37",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    transition: "all 0.2s",
    backgroundColor: "rgba(255,255,255,0.2)",
    color: "#d4af37",
  },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #d4af37",
    fontSize: "16px",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#ffd700",
  },
  button: {
    backgroundColor: "#d4af37",
    color: "#1c1c1c",
    padding: "15px",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "16px",
    marginTop: "10px",
    transition: "all 0.2s",
  },
  cartItemsContainer: {
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid rgba(212,175,55,0.3)",
  },
  cartItemImage: { width: "60px", height: "60px", objectFit: "cover", borderRadius: "10px" },
  cartItemDetails: { flex: 1, textAlign: "left", paddingLeft: "15px" },
  total: { fontWeight: 700, fontSize: "18px", marginBottom: "15px", color: "#ffd700" },
};
