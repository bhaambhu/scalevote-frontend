import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StateResult: React.FC = () => {
  const [state, setState] = useState('');
  const [results, setResults] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.get(`/api/results/state/${state}`)
      .then(response => setResults(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>State Results</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="State" required />
        <button type="submit">Get Results</button>
      </form>
      <ul>
        {results.map((result: any, index: number) => (
          <li key={index}>
            <strong>{result.constituency}</strong>: {result.winningCandidate} ({result.winningParty}) - {result.winningVotes} votes
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StateResult;
