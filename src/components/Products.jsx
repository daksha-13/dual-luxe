import React, { useState, useRef, useEffect } from "react";

// Auto-import all images
const allImages = import.meta.glob("../assets/*.png", { eager: true });

// Categories
const womenCategories = {
  mangalsutra: [], ring: [], wedding: [], anklet: [], bangle: [], bellychain: [],
  bracelet: [], bridal: [], diamond: [], dailywear: [], engagement: [],
  watch: [], gold: [], earrings: [], nosering: [], necklace: [], rosegold: []
};
const menCategories = { ring: [], watch: [], bracelet: [], chain: [] };
const kidImages = [];

// Sorting images into categories
Object.entries(allImages).forEach(([path, img]) => {
  const name = path.toLowerCase();

  if (name.includes("mangalsutra")) womenCategories.mangalsutra.push(img.default);
  else if (name.includes("wring")) womenCategories.ring.push(img.default);
  else if (name.includes("wed")) womenCategories.wedding.push(img.default);
  else if (name.includes("ank")) womenCategories.anklet.push(img.default);
  else if (name.includes("bangle")) womenCategories.bangle.push(img.default);
  else if (name.includes("bc")) womenCategories.bellychain.push(img.default);
  else if (name.includes("bracelet")) womenCategories.bracelet.push(img.default);
  else if (name.includes("bridal")) womenCategories.bridal.push(img.default);
  else if (name.includes("dia")) womenCategories.diamond.push(img.default);
  else if (name.includes("dw")) womenCategories.dailywear.push(img.default);
  else if (name.includes("eg")) womenCategories.engagement.push(img.default);
  else if (name.includes("gwatch")) womenCategories.watch.push(img.default);
  else if (name.includes("gold")) womenCategories.gold.push(img.default);
  else if (name.includes("image")) womenCategories.earrings.push(img.default);
  else if (name.includes("np")) womenCategories.nosering.push(img.default);
  else if (name.includes("neck")) womenCategories.necklace.push(img.default);
  else if (name.includes("rg")) womenCategories.rosegold.push(img.default);

  else if (name.includes("mr")) menCategories.ring.push(img.default);
  else if (name.includes("mw")) menCategories.watch.push(img.default);
  else if (name.includes("mb")) menCategories.bracelet.push(img.default);
  else if (name.includes("mc")) menCategories.chain.push(img.default);

  else if (name.includes("kid")) kidImages.push(img.default);
});

const capitalizeWords = (str) =>
  str.replace(/([a-z])([A-Z])/g, "$1 $2")
     .replace(/\b\w/g, (c) => c.toUpperCase());

const generatePrice = (subCategory, i) => {
  let price = 15000 + Math.floor(Math.random() * 35001);
  return price + i * Math.floor(Math.random() * 2000);
};

const generateDescription = (name) => `Captivating ${capitalizeWords(name)} Jewelry`;

const Products = ({ setPage }) => {
  const [category, setCategory] = useState("all");
  const [subCategory, setSubCategory] = useState("all");
  const [allProducts, setAllProducts] = useState([]);
  const scrollRef = useRef(null);
  const [likedProducts, setLikedProducts] = useState({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const toggleLike = (id) => setLikedProducts(prev => ({ ...prev, [id]: !prev[id] }));

  const viewDetails = (item) => {
    localStorage.setItem("selectedProduct", JSON.stringify(item));
    setPage("productdetails");
  };

  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cartItems")) || [];
    cart.push(item);
    localStorage.setItem("cartItems", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  useEffect(() => {
    const createProducts = (categoryObj, categoryName) =>
      [].concat(
        ...Object.entries(categoryObj).map(([sub, imgs]) =>
          imgs.map((img, i) => ({
            id: `${sub}-${i}`,
            image: img,
            category: categoryName,
            subCategory: sub,
            name: capitalizeWords(sub),
            material: ["Gold", "Silver", "Diamond"][i % 3],
            price: generatePrice(sub, i),
            description: generateDescription(sub)
          }))
        )
      );

    const womenProducts = createProducts(womenCategories, "women");
    const menProducts = createProducts(menCategories, "men");
    const kidProducts = kidImages.map((img, i) => ({
      id: `kid-${i}`,
      image: img,
      category: "kids",
      subCategory: "kids",
      name: "Kids Jewelry",
      material: ["Gold", "Silver", "Diamond"][i % 3],
      price: generatePrice("kids", i),
      description: generateDescription("Kids Jewelry")
    }));

    setAllProducts([...womenProducts, ...menProducts, ...kidProducts]);
  }, []);

  const womenSub = Object.keys(womenCategories);
  const menSub = Object.keys(menCategories);

  // ✅ SPLIT WOMEN SUBCATEGORIES ONLY (9 + 8)
  const womenFirstRow = womenSub.slice(0, 9);
  const womenSecondRow = womenSub.slice(9);

  const currentSubs =
    category === "women" ? womenSub :
    category === "men" ? menSub :
    [];

  const categoryProducts =
    category === "women" ? allProducts.filter(p => p.category === "women") :
    category === "men" ? allProducts.filter(p => p.category === "men") :
    category === "kids" ? allProducts.filter(p => p.category === "kids") :
    allProducts;

  const products =
    subCategory === "all" ? categoryProducts :
    categoryProducts.filter(p => p.subCategory === subCategory);

  return (
    <div style={styles.page}>
      <div style={styles.topBar}>
        <button style={styles.homeBtn} onClick={() => setPage("home")}>🏠 Home</button>
        <button style={styles.cartBtn} onClick={() => setPage("cart")}>🛒 Cart</button>
      </div>

      <h2 style={styles.title}>Our Exclusive Luxury Jewelry Collection</h2>

      <div style={styles.categoryButtons}>
        {["all", "women", "men", "kids"].map(cat => (
          <button
            key={cat}
            style={{
              ...styles.button,
              backgroundColor: category === cat ? "#d4af37" : "#fff",
              color: category === cat ? "#fff" : "#333"
            }}
            onClick={() => { setCategory(cat); setSubCategory("all"); }}
          >
            {capitalizeWords(cat)}
          </button>
        ))}
      </div>

      {/* ✅ Women Subcategory - FIXED 9 + 8 layout */}
      {category === "women" && (
        <>
          <div style={styles.subCategoryRow}>
            {womenFirstRow.map(sub => (
              <button
                key={sub}
                style={{
                  ...styles.subButton,
                  backgroundColor: subCategory === sub ? "#d4af37" : "#fff",
                  color: subCategory === sub ? "#fff" : "#333"
                }}
                onClick={() => setSubCategory(sub)}
              >
                {capitalizeWords(sub)}
              </button>
            ))}
          </div>

          <div style={styles.subCategoryRow}>
            {womenSecondRow.map(sub => (
              <button
                key={sub}
                style={{
                  ...styles.subButton,
                  backgroundColor: subCategory === sub ? "#d4af37" : "#fff",
                  color: subCategory === sub ? "#fff" : "#333"
                }}
                onClick={() => setSubCategory(sub)}
              >
                {capitalizeWords(sub)}
              </button>
            ))}
          </div>
        </>
      )}

      {/* ✅ Men & Kids stay exactly same */}
      {category !== "women" && currentSubs.length > 0 && (
        <div style={styles.subCategoryRow}>
          {currentSubs.map(sub => (
            <button
              key={sub}
              style={{
                ...styles.subButton,
                backgroundColor: subCategory === sub ? "#d4af37" : "#fff",
                color: subCategory === sub ? "#fff" : "#333"
              }}
              onClick={() => setSubCategory(sub)}
            >
              {capitalizeWords(sub)}
            </button>
          ))}
        </div>
      )}

      {/* Products Scroll Section */}
      <div style={styles.scrollContainer} ref={scrollRef}>
        {products.map((item) => {
          const mrp = item.price + Math.floor(Math.random() * 5000 + 2000);
          const savings = mrp - item.price;
          const discountPercent = Math.round((savings / mrp) * 100);

          return (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageWrapper}>
                <button
                  onClick={() => toggleLike(item.id)}
                  style={{
                    ...styles.heartButtonTop,
                    color: likedProducts[item.id] ? "red" : "gray"
                  }}
                >
                  ♥
                </button>
                <img src={item.image} alt={item.name} style={styles.image} />
              </div>

              <h3 style={styles.cardTitle}>{item.name}</h3>

              <p style={styles.price}>
                ₹{item.price.toLocaleString()} &nbsp;
                <span style={{ fontSize: "13px" }}>
                  You Save ₹{savings.toLocaleString()}
                </span>
              </p>

              <p style={styles.discount}>
                {discountPercent}% Off (Inclusive of all taxes)
              </p>

              <div style={styles.cardFooter}>
                <button style={styles.viewBtn} onClick={() => viewDetails(item)}>
                  View Details
                </button>
                <button style={styles.addButton} onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

const styles = {
  page: { width: "100%", paddingTop: "60px" },
  topBar: { position: "fixed", top: "10px", right: "20px", display: "flex", gap: "12px", zIndex: 100 },
  homeBtn: btn("#d4af37"),
  cartBtn: btn("#b8860b"),
  title: { fontFamily: "'Playfair Display', serif", fontSize: "30px", color: "#6b4f1d", textAlign: "center", marginBottom: "15px" },
  categoryButtons: { display: "flex", gap: "10px", justifyContent: "center", marginBottom: "15px", flexWrap: "wrap" },

  // ✅ Two row layout, centered perfectly
  subCategoryRow: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "8px"
  },

  subButton: {
    border: "2px solid #d4af37",
    borderRadius: "20px",
    padding: "6px 12px",
    minWidth: "110px",
    cursor: "pointer",
    fontWeight: "600"
  },

  scrollContainer: {
    display: "flex",
    gap: "20px",
    padding: "10px",
    overflowX: "auto"
  },

  card: {
    minWidth: "230px",
    background: "#fff",
    borderRadius: "12px",
    padding: "12px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  },

  imageWrapper: {
    position: "relative",
    height: "180px",
    overflow: "hidden",
    borderRadius: "10px"
  },

  heartButtonTop: {
    position: "absolute",
    top: "8px",
    left: "8px",
    background: "#fff",
    borderRadius: "50%",
    padding: "4px 7px",
    border: "none",
    cursor: "pointer",
    zIndex: 10
  },

  image: { width: "100%", height: "100%", objectFit: "contain" },
  cardTitle: { fontSize: "20px", fontWeight: "600", color: "#6b4f1d", marginTop: "5px" },
  price: { fontSize: "18px", fontWeight: "700", color: "#b8860b" },
  discount: { fontSize: "14px", color: "#d35400" },
  cardFooter: { display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" },
  viewBtn: btn("#8b6f2f"),
  addButton: btn("#d4af37")
};

function btn(c){
  return {
    backgroundColor: c,
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    padding: "7px 10px",
    fontWeight: "600"
  };
}

export default Products;
