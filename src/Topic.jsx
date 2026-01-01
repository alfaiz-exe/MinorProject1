import React, { useState } from 'react';
import ollama from 'ollama';
import './CSS/Topic.css';
import Navbar from "./Navbar.jsx";
const Topic = () => {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState([]);
  const [format, setFormat] = useState('text');
  const [examples, setExamples] = useState(true);
  const [tone, setTone] = useState('formal');
  const [language, setLanguage] = useState('English');
  const [maxLength, setMaxLength] = useState(50);
  const [relatedTopics, setRelatedTopics] = useState(false);
  const [depth, setDepth] = useState('detailed');
  const [loading, setLoading] = useState(false);

  async function generateArticle(customPrompt, parameter) {
    try {
      setLoading(true);
      const response = await ollama.chat({
        model: 'deepseek-r1:1.5b',
        messages: [{ role: 'user', content: customPrompt }],
      });
      const content = response.message.content;
  
      const cleanedContent = content.replace(/<think>.*?<\/think>/gs, '').trim();
      const result = cleanedContent.replace(/\*\*(.*?)\*\*/g, '');
      setOutput((prevOutput) => [result, ...prevOutput]);
    } catch (error) {
      setOutput((prevOutput) => ['Error: ' + error.message, ...prevOutput]);
    } finally {
      setLoading(false);
    }
  }
  

  const handleGenerate = () => {
    const customPrompt = `
Please generate a ${depth} explanation about the topic "${topic}".
- Format: ${format}
- Tone: ${tone}
- Language: ${language}
- Include examples: ${examples ? 'Yes' : 'No'}
- Include related topics: ${relatedTopics ? 'Yes' : 'No'}
- Response length: strictly should be around ${maxLength} characters.
Start your explanation below:
`;
    generateArticle(customPrompt, 'latest');
  };

  return (
    <div className="topic-page">
      <Navbar/>
      <div className="topic-hero">
        <div className="topic-hero-copy">
          <p className="eyebrow">Topic Mode</p>
          <h1 className="gradient-title">Study any subject with tailored depth and tone.</h1>
          <p className="lede">Pick the depth, format, and tone. We’ll generate concise, relevant explainer notes instantly.</p>
        </div>
        <div className="topic-hero-widget">
          <div className="pill-row">
            <button className={depth === 'brief' ? 'pill active' : 'pill'} onClick={() => setDepth('brief')}>Brief</button>
            <button className={depth === 'detailed' ? 'pill active' : 'pill'} onClick={() => setDepth('detailed')}>Detailed</button>
            <button className={depth === 'in-depth' ? 'pill active' : 'pill'} onClick={() => setDepth('in-depth')}>In-depth</button>
          </div>
          <div className="pill-row">
            <button className={format === 'text' ? 'pill active' : 'pill'} onClick={() => setFormat('text')}>Text</button>
            <button className={format === 'bullet' ? 'pill active' : 'pill'} onClick={() => setFormat('bullet')}>Bullets</button>
            <button className={format === 'summary' ? 'pill active' : 'pill'} onClick={() => setFormat('summary')}>Summary</button>
          </div>
          <div className="pill-row">
            <button className={tone === 'formal' ? 'pill active' : 'pill'} onClick={() => setTone('formal')}>Formal</button>
            <button className={tone === 'casual' ? 'pill active' : 'pill'} onClick={() => setTone('casual')}>Casual</button>
            <button className={tone === 'academic' ? 'pill active' : 'pill'} onClick={() => setTone('academic')}>Academic</button>
          </div>
        </div>
      </div>

      <div className="topic-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Prompt</p>
              <h3>What do you want to learn?</h3>
            </div>
            <div className="toggle-row">
              <label className="toggle">
                <input type="checkbox" checked={examples} onChange={() => setExamples(!examples)} />
                <span>Include examples</span>
              </label>
              <label className="toggle">
                <input type="checkbox" checked={relatedTopics} onChange={() => setRelatedTopics(!relatedTopics)} />
                <span>Related topics</span>
              </label>
            </div>
          </div>

          <div className="field-row">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., Quantum entanglement, Supply chain basics, Color theory"
              className="input main-input"
            />
          </div>

          <div className="field-row compact">
            <label>
              Language
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="input"
              />
            </label>
            <label>
              Target length
              <input
                type="number"
                value={maxLength}
                onChange={(e) => setMaxLength(Number(e.target.value))}
                min={100}
                max={2000}
                className="input"
              />
            </label>
          </div>

          <button onClick={handleGenerate} className="primary-btn" disabled={loading || !topic.trim()}>
            {loading ? 'Generating…' : 'Generate explainer'}
          </button>
        </div>

        <div className="panel output-panel">
          <div className="panel-header">
            <div>
              <p className="eyebrow">Output</p>
              <h3>Freshest response</h3>
            </div>
          </div>
          <div className="output-stack">
            {loading && (
              <div className="output-card placeholder spinner-card">
                <div className="spinner" aria-label="Loading"></div>
                <span>Generating your explainer…</span>
              </div>
            )}
            {output.length === 0 && !loading && (
              <div className="output-card placeholder">Generated text will appear here…</div>
            )}
            {output.map((item, index) => (
              <div className="output-card" key={index}>
                {item || 'No response received.'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topic;
