import React from "react";
import { Link } from "react-router-dom"; 
import "./CSS/Background.css";
import Navbar from "./Navbar.jsx";
function Background() {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="cover-page">
      <Navbar/>
      <main className="main-content single">
        <div className="hero-copy">
          <p className="eyebrow">Welcome</p>
          <h2 className="title">Start your learning journey.</h2>
          <p className="description">
            Learn Python, JavaScript, and more — with interactive lessons, real projects, and guided support.
          </p>
          <button className="learn-button" onClick={scrollToBottom}>
            Start learning
          </button>
        </div>
      </main>
    </div>
  );
}

export default Background;
