import React, { useState } from 'react';
import axios from 'axios';

const CastSingleVote: React.FC = () => {
  const [voterName, setVoterName] = useState('');
  const [age, setAge] = useState('');
  const [constituencyId, setConstituencyId] = useState('');
  const [candidateId, setCandidateId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/votes/cast', { voterName, age, constituencyId, candidateId })
      .then(response => alert(response.data))
      .catch(error => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cast Single Vote</h2>
      <input type="text" value={voterName} onChange={e => setVoterName(e.target.value)} placeholder="Voter Name" required />
      <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
      <input type="text" value={constituencyId} onChange={e => setConstituencyId(e.target.value)} placeholder="Constituency ID" required />
      <input type="text" value={candidateId} onChange={e => setCandidateId(e.target.value)} placeholder="Candidate ID" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CastSingleVote;
