import React, { useState } from 'react';
import axios from 'axios';

const CastBulkVote: React.FC = () => {
  const [constituencyId, setConstituencyId] = useState('');
  const [numberOfVotes, setNumberOfVotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/votes/bulk-cast', { constituencyId, numberOfVotes })
      .then(response => alert(response.data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cast Bulk Votes</h2>
      <input type="text" value={constituencyId} onChange={e => setConstituencyId(e.target.value)} placeholder="Constituency ID" required />
      <input type="number" value={numberOfVotes} onChange={e => setNumberOfVotes(e.target.value)} placeholder="Number of Votes" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CastBulkVote;
