import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateList: React.FC = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    axios.get('/api/candidates')
      .then(response => setCandidates(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ul>
        {candidates.map((candidate: any) => (
          <li key={candidate.id}>{candidate.name} - {candidate.party.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default CandidateList;
