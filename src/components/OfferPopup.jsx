import React from "react";
import "./OfferPopup.css";

const OfferPopup = ({ onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-box">
        {/* ✅ Single close button */}
        <button
          className="popup-close"
          onClick={() => {
            console.log("Close Button Clicked ✅");
            if (onClose) onClose(); // ensures function exists
          }}
        >
          ✕
        </button>

        <div className="popup-header-icon">💬</div>
        <h2 className="popup-heading">Get Rs. 500 OFF on your first order</h2>

        <form className="popup-form">
          <input type="text" placeholder="Name*" required />
          <input type="email" placeholder="Email*" required />
          <input type="text" placeholder="Mobile*" required />
          <input type="text" placeholder="Location*" required />

          <button type="submit" className="popup-submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferPopup;
