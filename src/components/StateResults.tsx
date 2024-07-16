import { PartySeats, StateResult } from "../utils/types";
import PageHeader from "./PageHeader";
import { getPartyIcon } from "../utils/constants";
import SlickTable from "./SlickTable";

export default function StateResults({
  stateResults,
}: {
  stateResults: StateResult;
}) {
  return (
    <div className=" flex flex-col items-center gap-3 cursor-default">
      {/* Winner party card */}
      <div className="w-fit p-3 border border-black flex flex-col gap-3 rounded-md bg-gray-100">
        <div className="border border-gray-500 flex text-sm bg-white justify-center p-1 rounded-md uppercase font-bold tracking-widest text-gray-700">
          Haryana
        </div>
        {/* Icon */}
        <div className="border border-gray-500 bg-white rounded-md w-full  flex items-center justify-center">
          <div className="w-40 max-w-40 h-40 mx-10 flex justify-center">
            {getPartyIcon(stateResults.winningParty.symbol)}
          </div>
        </div>
        <div className="flex justify-center p-1 w-full border border-gray-500 bg-white rounded-md font-bold tracking-wide text-gray-700 uppercase">
          {stateResults.winningParty.name}
        </div>
        <SlickTable<PartySeats>
          data={stateResults.partySeats}
          columns={[
            { header: "Party", accessor: (row: PartySeats) => row.party.name },
            { header: "Seats", accessor: "seats" as keyof PartySeats },
          ]}
        />
      </div>
    </div>
  );
}
