import React from "react";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">

      <div className="particles">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
      </div>

      <div className="home-text slide-from-top">
        <h1 className="brand-name">Dual-Luxe</h1>
        <p className="tagline">Unfold Your Golden Elegance</p>
      </div>

      {/* ✅ Banner below branding text */}
      <div className="banner-section slide-from-left">
        <img src="/banner.jpg" alt="Jewellery Banner" className="banner-img" />
      </div>

    </div>
  );
}
