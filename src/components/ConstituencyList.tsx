import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ConstituencyList: React.FC = () => {
  const [constituencies, setConstituencies] = useState([]);

  useEffect(() => {
    axios.get('/api/constituencies')
      .then(response => setConstituencies(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <ul>
        {constituencies.map((constituency: any) => (
          <li key={constituency.id}>{constituency.name} - {constituency.state}</li>
        ))}
      </ul>
    </div>
  );
};

export default ConstituencyList;
