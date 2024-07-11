import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import SlickTable from "../components/SlickTable";
import { ConstituencyResult, GetStateResultsResponse } from "../utils/types";
import { fetchStateResults } from "../utils/apiFunctions";
import { Link, useParams } from "react-router-dom";
import { BASE_URL, getPartyIcon } from "../utils/constants";
import HaryanaConstituencyMap from "../components/HaryanaMap";

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

  const colorBrickRed = "#A80000";
  const stateOutlineColor = colorBrickRed;
  const internalBordersColor = colorBrickRed;

  const columns = [
    {
      header: "Constituency",
      accessor: (row: ConstituencyResult) => (
        <Link
          to={BASE_URL + "results/" + state + "/" + row.constituency.name}
          className="font-bold text-blue-600"
        >
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
      {loading || !stateResults ? (
        <Loader />
      ) : (
        <>
          <div className="mb-6">
            {/* <div className="flex justify-between">
              <span>Total Votes: {stateResults?.totalVotes}</span>
              <span>
                Winning Party: {stateResults?.winningParty.name} (
                {stateResults?.winningParty.symbol})
              </span>
            </div> */}
          </div>
          <div className="columns-2">
            {/* Haryana SVG Map */}
            <div className="w-full aspect-square">
              <HaryanaConstituencyMap
                internalBordersColor={internalBordersColor}
                stateOutlineColor={stateOutlineColor}
                constituencyStyleMap={{
                  Ambala: "hover:fill-yellow-500",
                  "Bhiwani–Mahendragarh": "hover:fill-yellow-500",
                  Faridabad: "hover:fill-yellow-500",
                  Gurgaon: "hover:fill-yellow-500",
                  Hisar: "hover:fill-yellow-500",
                  Karnal: "hover:fill-yellow-500",
                  Kurukshetra: "hover:fill-yellow-500",
                  Rohtak: "hover:fill-yellow-500",
                  Sirsa: "hover:fill-yellow-500",
                  Sonipat: "hover:fill-yellow-500",
                }}
                constituencyTextMap={{
                  Ambala: stateResults.constituencies.find(constituency => constituency.constituency.name == "Ambala")?.winningParty?.name,
                  Hisar: stateResults.constituencies.find(constituency => constituency.constituency.name == "Hisar")?.winningParty?.name,
                  "Bhiwani–Mahendragarh": stateResults.constituencies.find(constituency => constituency.constituency.name == "Bhiwani–Mahendragarh")?.winningParty?.name,
                  Faridabad: stateResults.constituencies.find(constituency => constituency.constituency.name == "Faridabad")?.winningParty?.name,
                  Gurgaon: stateResults.constituencies.find(constituency => constituency.constituency.name == "Gurgaon")?.winningParty?.name,
                  Karnal: stateResults.constituencies.find(constituency => constituency.constituency.name == "Karnal")?.winningParty?.name,
                  Kurukshetra: stateResults.constituencies.find(constituency => constituency.constituency.name == "Kurukshetra")?.winningParty?.name,
                  Rohtak: stateResults.constituencies.find(constituency => constituency.constituency.name == "Rohtak")?.winningParty?.name,
                  Sirsa: stateResults.constituencies.find(constituency => constituency.constituency.name == "Sirsa")?.winningParty?.name,
                  Sonipat: stateResults.constituencies.find(constituency => constituency.constituency.name == "Sonipat")?.winningParty?.name,
                }}
                onClickConstituency={alert}
              />
            </div>
            <div className="w-full aspect-square flex flex-col items-center gap-3">
              <PageHeader>Overall State Results</PageHeader>
              {/* Winner party card */}
              <div className="w-fit p-3 border border-red-800 flex flex-col gap-3 rounded-sm">
                {/* Icon */}
                <div className="border border-red-800 flex justify-center p-3">
                  Winning Party
                </div>
                <div className="border border-red-800 w-72 flex items-center justify-center">
                  {getPartyIcon(stateResults?.winningParty.symbol)}
                </div>
                <div className="flex justify-center p-3 border border-red-800">
                  {stateResults?.winningParty.name}
                </div>
                <div className="flex justify-center border border-red-800 p-3">
                  Total Votes: {stateResults?.totalVotes}
                </div>
              </div>
            </div>
          </div>
          {/* <SlickTable
            columns={columns}
            data={stateResults?.constituencies ?? []}
          /> */}
        </>
      )}
    </div>
  );
};

export default Results;
