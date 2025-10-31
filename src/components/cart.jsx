import React, { useEffect, useState } from "react";

const Cart = ({ setPage, setCheckoutProducts, setCartCount }) => {
  const [cart, setCart] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // ✅ Load cart from localStorage and update count
  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(storedItems);
    if (setCartCount) setCartCount(storedItems.length); // update badge count
  }, [setCartCount]);

  const removeFromCart = (index) => {
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));

    // ✅ update count when item removed
    if (setCartCount) setCartCount(updatedCart.length);
  };

  const toggleSelect = (itemIndex) => {
    if (selectedProducts.includes(itemIndex)) {
      setSelectedProducts(selectedProducts.filter((i) => i !== itemIndex));
    } else {
      setSelectedProducts([...selectedProducts, itemIndex]);
    }
  };

  const selectedItems = selectedProducts.map((i) => cart[i]);
  const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);

  const handleShopNow = () => {
    if (selectedProducts.length === 0) {
      alert("Please select at least one product to buy!");
      return;
    }
    setCheckoutProducts(selectedItems);
    setPage("checkout");
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>🛍 Your Luxury Cart</h2>

      {cart.length === 0 ? (
        <p style={styles.text}>Your cart is empty.</p>
      ) : (
        <div style={styles.container}>
          {cart.map((item, index) => (
            <div key={index} style={styles.card}>
              <input
                type="checkbox"
                checked={selectedProducts.includes(index)}
                onChange={() => toggleSelect(index)}
                style={styles.checkbox}
              />

              <img src={item.image} alt={item.name} style={styles.image} />
              <h3 style={styles.name}>{item.name}</h3>
              <p style={styles.price}>₹{item.price.toLocaleString()}</p>
              <p style={styles.description}>{item.description}</p>

              <div style={styles.btnGroup}>
                <button
                  style={styles.removeBtn}
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

                <button
                  style={styles.shopNowBtn}
                  onClick={() => {
                    setCheckoutProducts([item]);
                    setPage("checkout");
                  }}
                >
                  Shop Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <>
          <p style={styles.total}>
            Total Selected: ₹{totalPrice.toLocaleString()}
          </p>
          {selectedProducts.length > 0 && (
            <button style={styles.mainShopBtn} onClick={handleShopNow}>
              Proceed with Selected Items →
            </button>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  page: {
    padding: "40px 20px",
    textAlign: "center",
    backgroundColor: "transparent",
    minHeight: "100vh",
    color: "#d4af37",
  },
  title: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#d4af37",
    marginBottom: "30px",
  },
  text: { fontSize: "18px", color: "#d4af37" },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "25px",
    maxHeight: "70vh",
    overflowY: "auto",
    paddingRight: "10px",
    scrollbarColor: "#d4af37 transparent",
    scrollbarWidth: "thin",
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    width: "250px",
    padding: "15px",
    textAlign: "center",
    position: "relative",
    color: "#d4af37",
  },
  checkbox: {
    position: "absolute",
    top: "10px",
    left: "10px",
    transform: "scale(1.3)",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "contain",
    borderRadius: "10px",
  },
  name: { fontSize: "18px", fontWeight: 600, marginTop: "10px" },
  price: { color: "#d4af37", fontWeight: "bold", margin: "5px 0" },
  description: { fontSize: "13px", marginBottom: "10px" },
  btnGroup: { display: "flex", flexDirection: "column", gap: "8px" },
  removeBtn: {
    backgroundColor: "#ff6f61",
    border: "none",
    borderRadius: "20px",
    color: "#fff",
    padding: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  shopNowBtn: {
    backgroundColor: "#d4af37",
    border: "none",
    borderRadius: "20px",
    color: "#1c1c1c",
    padding: "8px",
    cursor: "pointer",
    fontWeight: 600,
  },
  total: {
    fontWeight: "700",
    fontSize: "18px",
    marginTop: "30px",
  },
  mainShopBtn: {
    backgroundColor: "#d4af37",
    color: "#1c1c1c",
    border: "none",
    borderRadius: "30px",
    padding: "12px 30px",
    marginTop: "10px",
    cursor: "pointer",
    fontWeight: 700,
    boxShadow: "0 4px 10px rgba(212,175,55,0.4)",
  },
};

export default Cart;
