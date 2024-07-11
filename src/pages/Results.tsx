import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import SlickTable from "../components/SlickTable";
import { ConstituencyResult, GetStateResultsResponse } from "../utils/types";
import { fetchStateResults } from "../utils/apiFunctions";
import { Link, useParams } from "react-router-dom";

const Results: React.FC = () => {
  let { state } = useParams();
  const [stateResults, setStateResults] =
    useState<GetStateResultsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStateResults("Haryana").then((data) => {
      setStateResults(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    {
      header: "Constituency",
      accessor: (row: ConstituencyResult) => (
        <Link to={"/results/" + state + "/" + row.constituency.name} className="font-bold text-blue-600">
          {row.constituency.name}
        </Link>
      ),
    },
    {
      header: "Total Votes",
      accessor: "totalVotes" as keyof ConstituencyResult,
    },
    {
      header: "Winning Candidate",
      accessor: (row: ConstituencyResult) =>
        row.winningCandidate?.name ?? "N/A",
    },
    {
      header: "Winning Party",
      accessor: (row: ConstituencyResult) => row.winningParty?.name ?? "N/A",
    },
    { header: "Margin", accessor: "margin" as keyof ConstituencyResult },
  ];

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6">
            <PageHeader>Overall State Results</PageHeader>
            <div className="flex justify-between">
              <span>Total Votes: {stateResults?.totalVotes}</span>
              <span>
                Winning Party: {stateResults?.winningParty.name} (
                {stateResults?.winningParty.symbol})
              </span>
            </div>
          </div>
          <SlickTable
            columns={columns}
            data={stateResults?.constituencies ?? []}
          />
        </>
      )}
    </div>
  );
};

export default Results;
