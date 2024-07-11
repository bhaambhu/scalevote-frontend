import React from "react";
import PageHeader from "../components/PageHeader";
import CastSingleVote from "../components/CastSingleVote";
import CastBulkVote from "../components/CastBulkVote";
import HaryanaConstituencyMap from "../components/HaryanaMap";

const Vote: React.FC = () => {
  const colorMidGray = "#6E6E6E";
  const colorBrickRed = "#A80000";
  const stateOutlineColor = colorBrickRed;
  const internalBordersColor = colorBrickRed;
  const hoverCommonStyle = "hover:fill-yellow-500 cursor-pointer";
  return (
    <div className="container mx-auto p-4">
      <PageHeader>Cast Vote</PageHeader>
      <div className="columns-2">
        {/* Haryana SVG Map */}
        <div className="w-full aspect-square">
          <HaryanaConstituencyMap
            internalBordersColor={internalBordersColor}
            stateOutlineColor={stateOutlineColor}
            constituencyStyle="hover:fill-yellow-500"
            onClickConstituency={alert}
          />
        </div>
        <div className="w-full aspect-square">
          <CastSingleVote />
          <CastBulkVote />
        </div>
      </div>
    </div>
  );
};

export default Vote;
