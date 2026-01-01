import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import './CSS/Pdf.css';

const initialMCQs = [
  {
    question: "What does === do in JavaScript?",
    options: [
      "Assigns value",
      "Checks value only",
      "Checks value and type",
      "None of the above",
    ],
    correctAnswer: 2,
  },
  {
    question: "Which keyword is used to declare a constant?",
    options: ["let", "var", "const", "static"],
    correctAnswer: 2,
  },
  {
    question: "Which method converts a JSON string into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "parseJSON()", "convertJSON()"],
    correctAnswer: 0,
  },
  {
    question: "What is the output of '2' + 2 in JavaScript?",
    options: ["4", "'22'", "NaN", "undefined"],
    correctAnswer: 1,
  },
  {
    question: "What will `typeof null` return in JavaScript?",
    options: ["'null'", "'object'", "'undefined'", "'boolean'"],
    correctAnswer: 1,
  },
  {
    question: "Which of these is not a primitive data type in JavaScript?",
    options: ["String", "Number", "Object", "Boolean"],
    correctAnswer: 2,
  },
  {
    question: "What does `Array.isArray([])` return?",
    options: ["true", "false", "undefined", "null"],
    correctAnswer: 0,
  },
  {
    question: "Which of the following is used to stop an interval timer in JavaScript?",
    options: ["clearInterval", "stopInterval", "cancelInterval", "endInterval"],
    correctAnswer: 0,
  },
  {
    question: "What is the purpose of the `trim()` method in JavaScript?",
    options: [
      "To remove whitespace from both ends of a string",
      "To truncate a string",
      "To remove all spaces in a string",
      "To split a string",
    ],
    correctAnswer: 0,
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "#", "//", "/* */"],
    correctAnswer: 2,
  },
];

export default function Pdf() {
  const [mcqs, setMcqs] = useState(initialMCQs);
  const [pdfBlobUrl, setPdfBlobUrl] = useState("");
  const endRef = useRef(null);
  const currentBlobUrl = useRef(null);

  useEffect(() => {
    generatePDFPreview();
  }, [mcqs]);

  const scrollToBottom = () => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const updateQuestion = (index, value) => {
    const updated = [...mcqs];
    updated[index].question = value;
    setMcqs(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...mcqs];
    updated[qIndex].options[optIndex] = value;
    setMcqs(updated);
  };

  const updateCorrect = (qIndex, value) => {
    const updated = [...mcqs];
    updated[qIndex].correctAnswer = parseInt(value);
    setMcqs(updated);
  };

  const deleteMCQ = (index) => {
    const updated = mcqs.filter((_, i) => i !== index);
    setMcqs(updated);
  };

  const addMCQ = () => {
    setMcqs([
      ...mcqs,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const generatePDFContent = (doc) => {
    let y = 10;
    const pageHeight = doc.internal.pageSize.getHeight();

    mcqs.forEach((q, i) => {
      if (y > pageHeight - 30) {
        doc.addPage();
        y = 10;
      }
      doc.text(`${i + 1}) ${q.question}`, 10, y);
      y += 8;

      q.options.forEach((opt, j) => {
        if (y > pageHeight - 20) {
          doc.addPage();
          y = 10;
        }
        const label = String.fromCharCode(97 + j);
        const mark = j === q.correctAnswer ? "(correct answer)" : "";
        doc.text(`   ${label}) ${opt} ${mark}`, 15, y);
        y += 7;
      });

      y += 5;
    });
  };

  const generatePDFPreview = () => {
    const doc = new jsPDF();
    generatePDFContent(doc);
    const blob = doc.output("blob");

    if (currentBlobUrl.current) {
      URL.revokeObjectURL(currentBlobUrl.current);
    }

    const newUrl = URL.createObjectURL(blob);
    currentBlobUrl.current = newUrl;
    setPdfBlobUrl(newUrl);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    generatePDFContent(doc);
    doc.save("JavaScript_MCQ.pdf");
  };

  return (
    <div className="pdf-page">
      <header className="pdf-hero">
        <div>
          <p className="eyebrow">PDF Creator</p>
          <h1 className="pdf-title">Build MCQ sheets and export instantly.</h1>
          <p className="pdf-lede">Edit questions, mark the correct option, and preview before you download.</p>
        </div>
        <div className="pdf-hero-actions">
          <div className="pill-stat">{mcqs.length} questions</div>
          <button className="primary" onClick={downloadPDF}>📄 Download PDF</button>
        </div>
      </header>

      <div className="pdf-grid">
        <div className="pdf-editor">
          {mcqs.map((q, idx) => (
            <div key={idx} className="card">
              <div className="card-header">
                <span className="card-index">Q{idx + 1}</span>
                <button className="ghost" onClick={() => deleteMCQ(idx)}>🗑 Remove</button>
              </div>
              <textarea
                value={q.question}
                onChange={(e) => updateQuestion(idx, e.target.value)}
                placeholder="Enter question"
                rows={2}
              />
              {q.options.map((opt, i) => (
                <input
                  key={i}
                  value={opt}
                  onChange={(e) => updateOption(idx, i, e.target.value)}
                  placeholder={`Option ${i + 1}`}
                />
              ))}
              <select
                value={q.correctAnswer}
                onChange={(e) => updateCorrect(idx, e.target.value)}
              >
                <option value={0}>Correct: Option 1</option>
                <option value={1}>Correct: Option 2</option>
                <option value={2}>Correct: Option 3</option>
                <option value={3}>Correct: Option 4</option>
              </select>
            </div>
          ))}
          <div ref={endRef} />
          <div className="editor-actions">
            <button onClick={addMCQ} className="ghost">➕ Add Question</button>
            <button onClick={scrollToBottom} className="ghost">↧ Scroll to latest</button>
          </div>
        </div>

        <div className="pdf-preview">
          <div className="preview-header">
            <h3>PDF Preview</h3>
            <span className="pill-stat">Live</span>
          </div>
          {pdfBlobUrl ? (
            <iframe
              src={pdfBlobUrl}
              width="100%"
              height="100%"
              title="PDF Preview"
            />
          ) : (
            <div className="preview-placeholder">Generate a question to see the preview.</div>
          )}
        </div>
      </div>
    </div>
  );
}