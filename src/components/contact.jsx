import React from "react";
import "./Contact.css";

export default function Contact() {
  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <p>We’d love to hear from you! Reach out using the details below:</p>
      
      <div className="contact-info">
        <p><strong>Phone:</strong> +91 98765 43210</p>
        <p><strong>Email:</strong> contact@dual-luxe.com</p>
        <p><strong>Address:</strong> 123 Luxury Street, Mumbai, India</p>
      </div>
    </div>
  );
}
