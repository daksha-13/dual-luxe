import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact"; // ✅ capitalized correctly
import Products from "./components/Products";
import Cart from "./components/Cart"; // ✅ capitalized correctly
import DailyRates from "./pages/DailyRates";
import Checkout from "./components/Checkout";
import Review from "./components/Review";
import ProductDetails from "./components/ProductDetails.jsx";
import SplashScreen from "./components/SplashScreen";
import { CartProvider } from "./context/CartContext";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./components/Login";
import OfferPopup from "./components/OfferPopup"; // ✅ FIXED import

function App() {
  const [page, setPage] = useState("home");
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [showSplash, setShowSplash] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [showOffer, setShowOffer] = useState(true); // 👈 popup visibility

const updateCartCount = () => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartCount(storedItems.length);
  };
   useEffect(() => {
    updateCartCount();

    window.addEventListener("storage", updateCartCount); // listen for cart updates
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  // ✅ Also update when page changes (backup)
  useEffect(() => {
    updateCartCount();
  }, [page]);
  // Hide splash after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <CartProvider>
      <div className="app">
        <Navbar setPage={setPage} cartCount={cartCount} />

        <div className="content">
          {page === "home" && <Home setPage={setPage} />}
          {page === "products" && <Products setPage={setPage} />}
          {page === "cart" && (
            <Cart
              setPage={setPage}
              setCheckoutProducts={setCheckoutProducts}
              setCartCount={setCartCount}
            />
          )}
          {page === "checkout" && (
            <Checkout setPage={setPage} initialProducts={checkoutProducts} />
          )}
          {page === "contact" && <Contact />}
          {page === "daily-rates" && <DailyRates />}
          {page === "review" && <Review />}
          {page === "productdetails" && <ProductDetails setPage={setPage} />}
          {page === "login" && <Login setPage={setPage} />}
        </div>
      </div>

      {/* ✅ Footer stays at bottom */}
      <Footer />

      {/* ✅ Offer popup displayed when website loads */}
      {showOffer && <OfferPopup onClose={() => setShowOffer(false)} />}

    </CartProvider>
  );
}

export default App;
