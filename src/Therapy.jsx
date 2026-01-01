import React, { useState } from 'react';
import ollama from 'ollama';
import './CSS/therapy.css';
import Navbar from "./Navbar.jsx";

const prompts = [
  "I'm feeling stuck and anxious about work.",
  "I need help winding down before sleep.",
  "Guide me through a quick grounding exercise.",
];

const Therapy = () => {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const cleanContent = (text = '') => {
    return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
  };

  const limitWords = (text = '', max = 100) => {
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= max) return text.trim();
    return words.slice(0, max).join(' ') + '…';
  };

  async function generateArticle(customPrompt) {
    try {
      setIsLoading(true);
      const response = await ollama.chat({
        model: `gemma3:1b`,
        messages: [
          {
            role: 'system',
            content:
              'You are a calm, empathetic therapist. Reply in under 100 words. Offer one grounded suggestion and one kind reassurance. Avoid <think> tags.',
          },
          { role: 'user', content: customPrompt },
        ],
      });
      const content = limitWords(cleanContent(response.message?.content || ''), 100);
      setOutput((prevOutput) => [content || 'No response received.', ...prevOutput]);
    } catch (error) {
      setOutput((prevOutput) => ['Error: ' + error.message, ...prevOutput]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGenerate = (text) => {
    const prompt = text ?? topic;
    if (!prompt.trim()) return;
    generateArticle(prompt);
  };

  return (
    <div className="therapy-page">
      <Navbar/>
      <div className="therapy-hero">
        <div>
          <p className="eyebrow">Therapy Mode</p>
          <h1 className="gradient-title">Gentle, supportive answers on demand.</h1>
          <p className="lede">Share what’s on your mind or tap a quick prompt to get a calm, empathetic response.</p>
          <div className="prompt-chips">
            {prompts.map((p) => (
              <button key={p} className="chip" onClick={() => handleGenerate(p)}>{p}</button>
            ))}
          </div>
        </div>
        <div className="breath-card">
          <p className="eyebrow">Quick calm</p>
          <h3>4–7–8 breathing</h3>
          <ol>
            <li>Inhale through your nose for 4.</li>
            <li>Hold for 7.</li>
            <li>Exhale slowly for 8.</li>
          </ol>
        </div>
      </div>

      <div className="therapy-grid">
        <div className="panel">
          <div className="panel-header">
            <p className="eyebrow">Share</p>
            <h3>What would you like to talk about?</h3>
          </div>
          <textarea
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Describe how you feel or what you need help with…"
            className="input area"
            rows={4}
          />
          <button className="primary-btn" onClick={() => handleGenerate()} disabled={isLoading || !topic.trim()}>
            {isLoading ? 'Responding…' : 'Send'}
          </button>
        </div>

        <div className="panel output-panel">
          <div className="panel-header">
            <p className="eyebrow">Responses</p>
            <h3>Latest first</h3>
          </div>
          <div className="output-stack">
            {isLoading && (
              <div className="output-card placeholder spinner-card">
                <div className="spinner" aria-label="Loading"></div>
                <span>Preparing a gentle response…</span>
              </div>
            )}
            {output.length === 0 && !isLoading && (
              <div className="output-card placeholder">Your gentle responses will appear here.</div>
            )}
            {output.map((item, index) => (
              <div className="output-card" key={index}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Therapy;