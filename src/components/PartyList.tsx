import React, { useEffect, useState } from "react";
import { fetchParties } from "../utils/apiFunctions";
import { Party } from "../utils/types";

const PartyList: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    const getParties = async () => {
      const data = await fetchParties();
      setParties(data);
    };

    getParties();
  }, []);

  return (
    <div>
      <h1>Parties</h1>
      <ul>
        {parties.map(party => (
          <li key={party.id}>{party.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PartyList;
