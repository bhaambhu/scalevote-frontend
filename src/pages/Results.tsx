import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import Loader from "../components/Loader";
import SlickTable from "../components/SlickTable";
import {
  ConstituencyResult,
  GetStateResultsResponse,
  VoteCount,
} from "../utils/types";
import { fetchStateResults } from "../utils/apiFunctions";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BASE_URL, getPartyIcon } from "../utils/constants";
import HaryanaConstituencyMap from "../components/HaryanaMap";

const Results: React.FC = () => {
  const { state, constituency } = useParams<{
    state: string;
    constituency: string;
  }>();

  let constituencyResult: ConstituencyResult | undefined = undefined;

  const [stateResults, setStateResults] =
    useState<GetStateResultsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchStateResults("Haryana").then((data) => {
      setStateResults(data);
      setLoading(false);
    });
  }, []);

  if (constituency && stateResults) {
    constituencyResult = stateResults.constituencies.find(
      (cons) => cons.constituency.name == constituency
    );
  }

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

  const consResultColumns = [
    { header: "Candidate Name", accessor: "name" as keyof VoteCount },
    { header: "Votes", accessor: "votes" as keyof VoteCount },
    { header: "Party", accessor: (row: VoteCount) => row.party.name },
  ];

  const constituencyCommonStyle = " hover:fill-yellow-100 cursor-pointer ";
  const selectedConstituencyStyle = " fill-yellow-500 ";

  const navigate = useNavigate();

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
          <div className="flex flex-col">
            <div className="flex ">
              {/* Haryana SVG Map */}
              <div className="w-full aspect-square">
                <HaryanaConstituencyMap
                  internalBordersColor={internalBordersColor}
                  stateOutlineColor={stateOutlineColor}
                  constituencyStyleMap={{
                    Ambala:
                      constituencyCommonStyle +
                      (constituency == "Ambala"
                        ? selectedConstituencyStyle
                        : ""),
                    "Bhiwani–Mahendragarh":
                      constituencyCommonStyle +
                      (constituency == "Bhiwani–Mahendragarh"
                        ? selectedConstituencyStyle
                        : ""),
                    Faridabad:
                      constituencyCommonStyle +
                      (constituency == "Faridabad"
                        ? selectedConstituencyStyle
                        : ""),
                    Gurgaon:
                      constituencyCommonStyle +
                      (constituency == "Gurgaon"
                        ? selectedConstituencyStyle
                        : ""),
                    Hisar:
                      constituencyCommonStyle +
                      (constituency == "Hisar"
                        ? selectedConstituencyStyle
                        : ""),
                    Karnal:
                      constituencyCommonStyle +
                      (constituency == "Karnal"
                        ? selectedConstituencyStyle
                        : ""),
                    Kurukshetra:
                      constituencyCommonStyle +
                      (constituency == "Kurukshetra"
                        ? selectedConstituencyStyle
                        : ""),
                    Rohtak:
                      constituencyCommonStyle +
                      (constituency == "Rohtak"
                        ? selectedConstituencyStyle
                        : ""),
                    Sirsa:
                      constituencyCommonStyle +
                      (constituency == "Sirsa"
                        ? selectedConstituencyStyle
                        : ""),
                    Sonipat:
                      constituencyCommonStyle +
                      (constituency == "Sonipat"
                        ? selectedConstituencyStyle
                        : ""),
                  }}
                  constituencyTextMap={{
                    Ambala: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Ambala"
                    )?.winningParty?.name,
                    Hisar: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Hisar"
                    )?.winningParty?.name,
                    "Bhiwani–Mahendragarh": stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Bhiwani–Mahendragarh"
                    )?.winningParty?.name,
                    Faridabad: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Faridabad"
                    )?.winningParty?.name,
                    Gurgaon: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Gurgaon"
                    )?.winningParty?.name,
                    Karnal: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Karnal"
                    )?.winningParty?.name,
                    Kurukshetra: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Kurukshetra"
                    )?.winningParty?.name,
                    Rohtak: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Rohtak"
                    )?.winningParty?.name,
                    Sirsa: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Sirsa"
                    )?.winningParty?.name,
                    Sonipat: stateResults.constituencies.find(
                      (constituency) =>
                        constituency.constituency.name == "Sonipat"
                    )?.winningParty?.name,
                  }}
                  onClickConstituency={(consName: string) =>
                    navigate(BASE_URL + "results/" + state + "/" + consName)
                  }
                />
              </div>
              <div className="w-full flex flex-col items-center gap-3">
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
            <div>
              {constituencyResult && (
                <div className="w-full flex flex-col items-center gap-3">
                  <PageHeader>
                    {constituencyResult.constituency.name} Results
                  </PageHeader>
                  {/* Winner party card */}
                  <div className=" p-3 border border-red-800 flex flex-row gap-3 rounded-sm">
                    {/* Icon */}
                    <div>
                      {constituencyResult.winningParty ? (
                        <div className="flex flex-col gap-3 items-center">
                          {/* <div className="border w-full border-red-800 flex justify-center p-3">
                          Winning Party
                        </div> */}
                          <div className="flex justify-center p-3 w-full border border-red-800">
                            Winning Party:{" "}
                            {constituencyResult.winningParty.name}
                          </div>
                          <div className="border border-red-800 w-full  flex items-center justify-center">
                            <div className="w-72 max-w-72 flex justify-center">
                              {getPartyIcon(
                                constituencyResult.winningParty.symbol
                              )}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center p-3 border border-red-800">
                          No Winning Party
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex justify-center border border-red-800 p-3 mb-3">
                        Total Votes: {constituencyResult.totalVotes}
                      </div>
                      {constituencyResult.totalVotes > 0 && (
                        <SlickTable
                          columns={consResultColumns}
                          data={constituencyResult.voteCounts}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
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
