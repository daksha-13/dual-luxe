import React from "react";
import "./SplashScreen.css";
import splashVideo from "../assets/splash.mp4";

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      <video
        className="splash-video"
        src={splashVideo}
        autoPlay
        muted
        playsInline
        onEnded={() => console.log("Splash ended")}
      />
      <h1 className="splash-text">Welcome to Our Store</h1>
    </div>
  );
};

export default SplashScreen;
