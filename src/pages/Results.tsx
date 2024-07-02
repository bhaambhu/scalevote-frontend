import React from 'react';
import StateResult from '../components/StateResult';
import ConstituencyResult from '../components/ConstituencyResult';

const Results: React.FC = () => (
  <div>
    <h1>Results</h1>
    <StateResult />
    <ConstituencyResult />
  </div>
);

export default Results;
