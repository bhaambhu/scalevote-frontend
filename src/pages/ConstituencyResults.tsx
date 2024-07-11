import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import SlickTable from "../components/SlickTable";
import { ConstituencyResult, VoteCount } from "../utils/types";
import { fetchConstituencyResults } from "../utils/apiFunctions";
import { Link, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { BASE_URL } from "../utils/constants";

export default function ConstituencyResults() {
  const { state, constituency } = useParams<{
    state: string;
    constituency: string;
  }>();
  const [constituencyResults, setConstituencyResults] =
    useState<ConstituencyResult | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchConstituencyResults(state ?? "", constituency ?? "").then((data) => {
      setConstituencyResults(data);
      setLoading(false);
    });
  }, [constituency]);

  const columns = [
    { header: "Candidate Name", accessor: "name" as keyof VoteCount },
    { header: "Votes", accessor: "votes" as keyof VoteCount },
    { header: "Party", accessor: (row: VoteCount) => row.party.name },
  ];

  return (
    <div className="container mx-auto p-4">
      <PageHeader>Constituency Results</PageHeader>
      {loading ? (
        <Loader />
      ) : (
        constituencyResults && (
          <>
            <div className="mb-6">
              <div className="font-bold mb-2 flex gap-2">
                <Link
                  to={
                    BASE_URL +
                    "results/" +
                    constituencyResults.constituency.state
                  }
                  className="text-blue-600"
                >
                  {constituencyResults.constituency.state}
                </Link>
                <span className="font-mono font-medium cursor-default">
                  {">"}
                </span>
                <span className="cursor-default">
                  {constituencyResults.constituency.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Votes: {constituencyResults.totalVotes}</span>
                <span>
                  Winning Candidate:{" "}
                  {constituencyResults.winningCandidate?.name || "N/A"}
                </span>
                <span>
                  Winning Party:{" "}
                  {constituencyResults.winningParty?.name || "N/A"} (
                  {constituencyResults.winningParty?.symbol || ""})
                </span>
              </div>
            </div>
            <SlickTable
              columns={columns}
              data={constituencyResults.voteCounts}
            />
          </>
        )
      )}
    </div>
  );
}
