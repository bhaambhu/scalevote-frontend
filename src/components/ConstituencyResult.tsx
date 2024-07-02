import React, { useState } from 'react';
import axios from 'axios';

const ConstituencyResult: React.FC = () => {
  const [constituencyId, setConstituencyId] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.get(`/api/results/constituency/${constituencyId}`)
      .then(response => setResult(response.data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Constituency Results</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={constituencyId} onChange={e => setConstituencyId(e.target.value)} placeholder="Constituency ID" required />
        <button type="submit">Get Results</button>
      </form>
      {result && (
        <div>
          <h3>{result.constituency}</h3>
          <p><strong>Winning Candidate:</strong> {result.winningCandidate} ({result.winningParty})</p>
          <p><strong>Votes:</strong> {result.winningVotes}</p>
          <p><strong>Margin:</strong> {result.margin}</p>
          <p><strong>Total Votes:</strong> {result.totalVotes}</p>
        </div>
      )}
    </div>
  );
};

export default ConstituencyResult;
