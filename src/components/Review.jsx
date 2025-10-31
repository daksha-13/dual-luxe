import React, { useState } from "react";

export default function Review({ setPage }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const ratingsText = ["Poor", "Fair", "Good", "Very Good", "Excellent"];

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please rate your order before submitting!");
      return;
    }
    setSubmitted(true);
    setTimeout(() => setPage("home"), 2000); // redirect after 2s
  };

  return (
    <div style={styles.page}>
      {!submitted ? (
        <div style={styles.card}>
          <h2 style={styles.title}>⭐ Rate Your Order</h2>

          {/* Stars */}
          <div style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                style={{
                  fontSize: "45px",
                  cursor: "pointer",
                  color: star <= (hover || rating) ? "#FFD700" : "#dcdcdc",
                  textShadow:
                    star <= (hover || rating)
                      ? "0 0 12px rgba(255,215,0,0.7)"
                      : "none",
                  transition: "transform 0.2s, color 0.2s",
                  transform: star <= (hover || rating) ? "scale(1.2)" : "scale(1)",
                }}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                ★
              </span>
            ))}
          </div>

          {rating > 0 && (
            <p style={styles.ratingText}>{ratingsText[rating - 1]}</p>
          )}

          {/* Comment Box */}
          <textarea
            style={styles.textarea}
            placeholder="Share your thoughts about your order..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          {/* Submit Button */}
          <button style={styles.button} onClick={handleSubmit}>
            Submit Review
          </button>
        </div>
      ) : (
        <div style={styles.thankYou}>
          <h2 style={styles.thankTitle}>💎 Thank You!</h2>
          <p style={styles.thankText}>
            Your feedback helps us make Dual-Luxe even better.
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent", // transparent background
    fontFamily: "'Poppins', sans-serif",
    color: "#FFD700", // luxury gold text
  },
  card: {
    background: "rgba(0,0,0,0.5)", // semi-transparent card for contrast
    padding: "40px 30px",
    borderRadius: "25px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "450px",
    animation: "fadeIn 0.5s ease-in",
    color: "#FFD700",
  },
  title: {
    color: "#FFD700",
    marginBottom: "20px",
    fontSize: "26px",
  },
  stars: {
    marginBottom: "10px",
  },
  ratingText: {
    fontWeight: "600",
    marginBottom: "10px",
    color: "#FFD700",
  },
  textarea: {
    width: "100%",
    height: "90px",
    borderRadius: "12px",
    border: "1px solid #d4af37",
    padding: "10px",
    marginTop: "15px",
    marginBottom: "20px",
    outline: "none",
    resize: "none",
    fontSize: "14px",
    transition: "box-shadow 0.3s",
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "#FFD700",
  },
  button: {
    backgroundColor: "#d4af37",
    color: "#1c1c1c",
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "16px",
    transition: "background 0.3s, transform 0.2s",
  },
  thankYou: {
    textAlign: "center",
    background: "rgba(0,0,0,0.5)", // semi-transparent background
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
    color: "#FFD700",
  },
  thankTitle: {
    color: "#FFD700",
    fontSize: "32px",
    marginBottom: "10px",
  },
  thankText: {
    color: "#FFD700",
    fontSize: "16px",
  },
};
