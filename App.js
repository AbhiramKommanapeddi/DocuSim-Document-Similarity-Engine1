import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [doc1, setDoc1] = useState('');
  const [doc2, setDoc2] = useState('');
  const [score, setScore] = useState(null);

  const handleCompare = async () => {
    try {
      const res = await axios.post('http://localhost:5000/compare', { doc1, doc2 });
      setScore(res.data.similarity_score);
    } catch (error) {
      console.error('Error comparing documents:', error);
    }
  };

  return (
    <div className="App">
      <h1>Document Similarity Checker</h1>
      <textarea placeholder="Enter Document 1" rows="6" onChange={(e) => setDoc1(e.target.value)}></textarea>
      <textarea placeholder="Enter Document 2" rows="6" onChange={(e) => setDoc2(e.target.value)}></textarea>
      <button onClick={handleCompare}>Compare</button>
      {score !== null && (
        <p>Similarity Score: <strong>{score}</strong></p>
      )}
    </div>
  );
}

export default App;
