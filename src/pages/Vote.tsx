import React from 'react';
import CastSingleVote from '../components/CastSingleVote';
import CastBulkVote from '../components/CastBulkVote';

const Vote: React.FC = () => (
  <div>
    <h1>Cast Vote</h1>
    <CastSingleVote />
    <CastBulkVote />
  </div>
);

export default Vote;
