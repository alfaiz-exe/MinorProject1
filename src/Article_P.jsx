import { useState, useEffect } from "react";
import "./CSS/Article.css";
import topicsInfo from "./DATA/P";

function Article() {
  const [selectedTopic, setSelectedTopic] = useState("datatype");

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem("topicProgress");
    return saved ? JSON.parse(saved) : {};
  });

  const handleSelect = (topicName) => {
    setSelectedTopic(topicName);

    const newProgress = {
      ...progress,
      [topicName]: true, 
    };
    setProgress(newProgress);
    localStorage.setItem("topicProgress", JSON.stringify(newProgress));
  };

  const selectedTopicInfo = topicsInfo.find(
    (topic) => topic.topic === selectedTopic
  );

  return (
    <div className="article-container">
      <div className="contents">
        <h2>Contents</h2>
        <div className="progress-bar-wrapper">
          <p style={{ marginBottom: "6px", color: "#ccc" }}>
            Progress: {Object.keys(progress).filter((key) => progress[key]).length} / {topicsInfo.length}
          </p>
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${
                  (Object.keys(progress).filter((key) => progress[key]).length /
                    topicsInfo.length) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
        <ul>
          {topicsInfo.map((topic) => (
            <li
              key={topic.topic}
              className={`${selectedTopic === topic.topic ? "active" : ""} ${
                progress[topic.topic] ? "completed" : ""
              }`}
              onClick={() => handleSelect(topic.topic)}
            >
             {progress[topic.topic] ? "✅ " : ""}
             {topic.topic}
            </li>
          ))}
        </ul>
      </div>

      <div className="content-display">
        <h1>{selectedTopicInfo.topic}</h1>
        <p>{selectedTopicInfo.info}</p>
      </div>
    </div>
  );
}

export default Article;