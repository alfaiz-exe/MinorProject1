import React from "react";
import { useNavigate, Link  } from "react-router-dom"; 
import "./CSS/Feature.css"; 

const Feature = () => {
  const navigate = useNavigate();
  const features = [
    { title: "Topic Mode", description: "Dive deep into specific topics" , route : "/topic" },
    { title: "Therapy Ai", description: "Your Friendly Ai" , route : "/therapy" },
    { title: "Practice Quiz", description: "Test your knowledge with quick quizzes" , route : "/quiz"  },
    { title: "Read Articles", description: "Stay updated with curated articles" , route : "/Articles" },
    { title: "Pdf Creator", description: "Create pdf with this" , route : "/pdf" },
    { title: "NoteMaking", description: "Store your notes here" , route : "/note" }
  ];

  return (
    <div className="feature-page">
      <div className="feature-header">Explore Modes</div>
      <div className="feature-grid">
        
        {features.map((feature, index) => (
          
          <Link key={index} className="feature-card" to={feature.route} >
            <div className="feature-title">{feature.title}</div>
            <div className="feature-desc">{feature.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Feature;
