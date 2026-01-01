import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/Articles.css";

const Articles = () => {
  const navigate = useNavigate();

  const languages = [
    { title: "C Programming", route: "/c/Articles" },
    { title: "Python", route: "/python/Articles" },
    { title: "JavaScript", route: "/javascript/Articles" },
  ];

  return (
    <div className="articles-page">
      <div className="articles-header">Choose a Language</div>
      <div className="articles-grid">
        {languages.map((lang, index) => (
          <div
            key={index}
            className="articles-card"
            onClick={() => navigate(lang.route)}
          >
            <div className="articles-title">{lang.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
