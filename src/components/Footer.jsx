import React from "react";

const Footer = () => {
  return (
    <>
      {/* Store Locator Bar */}
      <div style={styles.storeBar}>
        <h4 style={styles.storeText}>📍 STORE LOCATOR</h4>
        <p style={styles.storeSub}>Find our showroom</p>
      </div>

      {/* Main Footer */}
      <footer style={styles.footer}>
        <div style={styles.columnsWrapper}>

          {/* Overview */}
          <div style={styles.column}>
            <h4 style={styles.heading}>OVERVIEW</h4>
            <p style={styles.link}>Collections</p>
            <p style={styles.link}>About Us</p>
            <p style={styles.link}>Contact Us</p>
            <p style={styles.link}>FAQs</p>
          </div>

          {/* Policies */}
          <div style={styles.column}>
            <h4 style={styles.heading}>OUR POLICIES</h4>
            <p style={styles.link}>Return & Exchange</p>
            <p style={styles.link}>Shipping Policy</p>
            <p style={styles.link}>Cancellation Policy</p>
            <p style={styles.link}>Privacy Policy</p>
          </div>

          {/* Customer Delight */}
          <div style={styles.column}>
            <h4 style={styles.heading}>CUSTOMER DELIGHT</h4>
            <p style={styles.link}>Track Your Order</p>
            <p style={styles.link}>Best Price Assurance</p>
            <p style={styles.link}>Jewellery Care</p>
          </div>

          {/* Education */}
          <div style={styles.column}>
            <h4 style={styles.heading}>EDUCATION</h4>
            <p style={styles.link}>Diamond Guide</p>
            <p style={styles.link}>Metal Guide</p>
            <p style={styles.link}>Sizing Guide</p>
          </div>

          {/* Contact */}
          <div style={styles.column}>
            <h4 style={styles.heading}>GET IN TOUCH</h4>
            <p style={styles.link}>1800-123-4567 (Toll Free)</p>
            <p style={styles.link}>9876543210 (WhatsApp)</p>
            <p style={styles.link}>(10am to 6pm | Mon to Sat)</p>
            <p style={styles.link}>support@dualluxe.com</p>
          </div>

        </div>

        {/* Bottom Bar */}
        <p style={styles.copy}>
          © {new Date().getFullYear()} Dual Luxe. All rights reserved. |
          Privacy Policy | Terms & Conditions
        </p>
      </footer>
    </>
  );
};

const styles = {
  storeBar: {
    backgroundColor: "#0e292b",
    padding: "12px 25px",
    color: "#fff",
    textAlign: "left"
  },
  storeText: {
    margin: 0,
    fontWeight: 700,
    letterSpacing: "0.5px"
  },
  storeSub: {
    margin: 0,
    fontSize: "12px",
    opacity: 0.9
  },
  footer: {
    backgroundColor: "#f5f5f5",
    padding: "35px 25px",
    color: "#1a1a1a",
    width: "100%"
  },
  columnsWrapper: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px 40px",
    marginBottom: "20px"
  },
  column: {
    minWidth: "150px"
  },
  heading: {
    fontWeight: "700",
    fontSize: "15px",
    marginBottom: "10px",
    color: "#000"
  },
  link: {
    fontSize: "13px",
    margin: "6px 0",
    cursor: "pointer"
  },
  copy: {
    textAlign: "center",
    fontSize: "12px",
    opacity: 0.6,
    marginTop: "15px"
  }
};

export default Footer;
