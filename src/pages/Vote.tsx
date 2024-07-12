import React from "react";
import PageHeader from "../components/PageHeader";
import CastSingleVote from "../components/CastSingleVote";
import CastBulkVote from "../components/CastBulkVote";

const Vote: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <PageHeader>Cast Vote</PageHeader>
      <div className="columns-2">
        {/* Haryana SVG Map */}
        <div className="w-full aspect-square"></div>
        <div className="w-full aspect-square">
          <CastSingleVote />
          <CastBulkVote />
        </div>
      </div>
    </div>
  );
};

export default Vote;
