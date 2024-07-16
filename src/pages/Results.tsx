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
import ConstituencyResults from "../components/ConstituencyResults";
import StateResults from "../components/StateResults";

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
  const colorDarkGray = "#374151";
  const stateOutlineColor = colorDarkGray;
  const internalBordersColor = colorDarkGray;

  const constituencyCommonStyle = " hover:fill-yellow-100 cursor-pointer ";
  const selectedConstituencyStyle =
    " fill-yellow-400 hover:fill-yellow-400 cursor-pointer";

  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 transition-all ease-in-out duration-1000">
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
          <div className="flex gap-3 flex-wrap justify-center">
            <div className="w-fit p-3 border border-black flex flex-col gap-3 rounded-md bg-gray-100">
              <div className="flex gap-0.5 text-xs md:text-sm">
                <Link
                  to={BASE_URL + "results/Haryana"}
                  className="cursor-pointer hover:bg-yellow-100 border border-gray-500 flex bg-white justify-center p-1 px-2 rounded-md uppercase font-bold tracking-widest text-gray-700"
                >
                  Haryana
                </Link>
                {constituencyResult && (
                  <>
                    <div className=" border-gray-500 font-mono flex justify-center p-1 rounded-md uppercase font-bold tracking-widest text-gray-700">
                      {">"}
                    </div>
                    <div className=" border border-gray-500 flex  bg-white justify-center p-1 px-2 rounded-md uppercase font-bold tracking-widest text-gray-700">
                      {constituencyResult.constituency.name}
                    </div>
                  </>
                )}
              </div>
              <div className="flex aspect-square p-1 px-2 md:px-3 justify-center items-center border border-gray-500 rounded-md bg-white">
                <HaryanaConstituencyMap
                  internalBordersColor={internalBordersColor}
                  stateOutlineColor={stateOutlineColor}
                  constituencyStyleMap={{
                    Ambala:
                      constituency == "Ambala"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    "Bhiwani–Mahendragarh":
                      constituency == "Bhiwani–Mahendragarh"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Faridabad:
                      constituency == "Faridabad"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Gurgaon:
                      constituency == "Gurgaon"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Hisar:
                      constituency == "Hisar"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Karnal:
                      constituency == "Karnal"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Kurukshetra:
                      constituency == "Kurukshetra"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Rohtak:
                      constituency == "Rohtak"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Sirsa:
                      constituency == "Sirsa"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
                    Sonipat:
                      constituency == "Sonipat"
                        ? selectedConstituencyStyle
                        : constituencyCommonStyle,
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
            </div>
            {constituencyResult && (
              <ConstituencyResults constituencyResult={constituencyResult} />
            )}
            <StateResults stateResults={stateResults} />
          </div>
        </>
      )}
    </div>
  );
};

export default Results;
