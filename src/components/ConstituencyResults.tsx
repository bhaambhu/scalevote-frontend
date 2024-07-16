import { getPartyIcon } from "../utils/constants";
import { ConstituencyResult, VoteCount } from "../utils/types";
import PageHeader from "./PageHeader";
import SlickTable from "./SlickTable";

const consResultColumns = [
  {
    header: "Candidate",
    accessor: (row: VoteCount) => row.candidate.name,
  },
  { header: "Votes", accessor: "votes" as keyof VoteCount },
  { header: "Party", accessor: (row: VoteCount) => row.candidate.party.name },
];

export default function ConstituencyResults({
  constituencyResult,
}: {
  constituencyResult: ConstituencyResult;
}) {
  return (
    <div className=" flex flex-col items-center gap-3 cursor-default">
      {/* Winner party card */}
      <div className="w-full p-3 border border-gray-500 rounded-md flex flex-col gap-3 bg-gray-100">
        {/* Icon */}
        {constituencyResult.winningParty ? (
          <div className="flex flex-col gap-3 items-center">
            <div className="border border-gray-500 w-full text-sm flex bg-white justify-center p-1 rounded-md uppercase font-bold tracking-widest text-gray-700">
              {constituencyResult.constituency.name} Constituency
            </div>
            <div className="border border-gray-500 bg-white rounded-md w-full  flex items-center justify-center">
              <div className="w-40 max-w-40 h-40 mx-10 p-3 flex justify-center">
                {getPartyIcon(constituencyResult.winningParty.symbol)}
              </div>
            </div>
            <div className="flex justify-center p-1 w-full border border-gray-500 bg-white rounded-md font-bold tracking-wide text-gray-700 uppercase">
              {constituencyResult.winningParty.name}
            </div>
          </div>
        ) : (
          <div className="flex justify-center p-3 border border-gray-500 bg-white rounded-md">
            No Winning Party
          </div>
        )}

        {constituencyResult.totalVotes > 0 && (
          <SlickTable
            columns={consResultColumns}
            data={constituencyResult.voteCounts}
          />
        )}
      </div>
    </div>
  );
}
