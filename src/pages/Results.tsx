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
  const stateOutlineColor = colorBrickRed;
  const internalBordersColor = colorBrickRed;

  const constituencyCommonStyle = " hover:fill-yellow-100 cursor-pointer ";
  const selectedConstituencyStyle =
    " fill-yellow-400 hover:fill-yellow-400 cursor-pointer";

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
          <div className="flex gap-3 flex-wrap justify-center">
            {/* Haryana SVG Map */}
            <div className="flex aspect-square p-2 md:p-3 justify-center items-center">
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
                    (constituency) => constituency.constituency.name == "Ambala"
                  )?.winningParty?.name,
                  Hisar: stateResults.constituencies.find(
                    (constituency) => constituency.constituency.name == "Hisar"
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
                    (constituency) => constituency.constituency.name == "Karnal"
                  )?.winningParty?.name,
                  Kurukshetra: stateResults.constituencies.find(
                    (constituency) =>
                      constituency.constituency.name == "Kurukshetra"
                  )?.winningParty?.name,
                  Rohtak: stateResults.constituencies.find(
                    (constituency) => constituency.constituency.name == "Rohtak"
                  )?.winningParty?.name,
                  Sirsa: stateResults.constituencies.find(
                    (constituency) => constituency.constituency.name == "Sirsa"
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
