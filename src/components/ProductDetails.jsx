import React, { useEffect, useState } from "react";

const ProductDetails = ({ setPage }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
    setProduct(storedProduct);
  }, []);

  if (!product) return <p style={{ color: "#fff" }}>Loading...</p>;

  const mrp = product.mrp ? product.mrp : product.price + 4000;
  const discount = mrp - product.price;
  const discountPercent = Math.round((discount / mrp) * 100);

  return (
    <div style={styles.page}>
      <div style={styles.wrapper}>
        <img src={product.image} alt={product.name} style={styles.image} />

        <div style={styles.details}>
          <h2 style={styles.name}>{product.name}</h2>

          <p style={styles.price}>
            ₹{product.price.toLocaleString()}
            <span style={styles.mrp}> ₹{mrp.toLocaleString()}</span>
          </p>

          <p style={styles.discount}>
            ✓ You Save ₹{discount.toLocaleString()} ({discountPercent}% Off)
          </p>

          {/* METAL INFO */}
          <div style={styles.section}>
            <h3 style={styles.title}>Metal Information</h3>
            <table style={styles.table}>
              <tbody>
                <tr><td>Metal</td><td>{product.metal || "White"}</td></tr>
                <tr><td>Purity</td><td>{product.purity || "925 Sterling Silver"}</td></tr>
                <tr><td>Stone</td><td>{product.stone || "CZ Blend"}</td></tr>
                <tr><td>Weight</td><td>{product.weight || "7.6 g"}</td></tr>
              </tbody>
            </table>
          </div>

          {/* PRODUCT INFO */}
          <div style={styles.section}>
            <h3 style={styles.title}>Product Information</h3>
            <table style={styles.table}>
              <tbody>
                <tr><td>Product Code</td><td>{product.productCode || "N/A"}</td></tr>
                <tr><td>Brand</td><td>{product.brand || "Dual Luxe"}</td></tr>
                <tr><td>Height</td><td>{product.height || "5.26 mm"}</td></tr>
                <tr><td>Width</td><td>{product.width || "16.83 mm"}</td></tr>
              </tbody>
            </table>
          </div>

          {/* DIAMOND INFO */}
          <div style={styles.section}>
            <h3 style={styles.title}>Diamond Information</h3>
            <table style={styles.table}>
              <tbody>
                <tr><td>Color & Clarity</td><td>{product.diamondInfo || "KL-I"}</td></tr>
                <tr><td>Diamond Weight</td><td>{product.diamondWeight || "N/A"}</td></tr>
              </tbody>
            </table>
          </div>

          <button style={styles.backBtn} onClick={() => setPage("products")}>
            ← Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
  width: "100%",
  minHeight: "100vh",
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "20px 0 0 0"
},


  wrapper: {
    background: "#ffffff",
    borderRadius: "20px",
    padding: "18px",
    display: "flex",
    gap: "15px",
    maxWidth: "750px",
    width: "95%",
    alignItems: "flex-start",
    boxShadow: "0 0 15px rgba(212,175,55,0.25)"
  },
  image: {
    width: "40%",
    height: "260px",
    objectFit: "contain",
    borderRadius: "10px"
  },
  details: {
    width: "60%",
    display: "flex",
    flexDirection: "column"
  },
  name: {
    fontSize: "20px",
    fontFamily: "'Playfair Display', serif",
    color: "#6b4f1d"
  },
  price: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#b8860b",
    marginTop: "6px"
  },
  mrp: {
    textDecoration: "line-through",
    fontSize: "14px",
    color: "#777",
    marginLeft: "8px"
  },
  discount: {
    fontSize: "14px",
    color: "#d35400",
    marginTop: "6px",
    marginBottom: "10px"
  },
  section: {
    marginTop: "10px",
    background: "#fdf3d7",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid rgba(212,175,55,0.3)"
  },
  title: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#a67c00",
    marginBottom: "6px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: "13px",
    color: "#5c4519"
  },
  backBtn: {
    marginTop: "18px",
    backgroundColor: "transparent",
    border: "2px solid #d4af37",
    color: "#d4af37",
    padding: "8px 16px",
    borderRadius: "25px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "13px"
  }
};

localStorage.setItem("selectedProduct", JSON.stringify({
  name: "Elegant Pearl Necklace",
  image: "pearls.jpg",
  price: 22000,
  productCode: "DUAL-NECK-001",
  purity: "925 Silver",
  stone: "Pearl",
  metal: "White Silver",
  weight: "8.2 g",
  height: "50 mm",
  width: "10 mm",
  diamondInfo: "None",
  brand: "Dual Luxe"
}));


export default ProductDetails;
