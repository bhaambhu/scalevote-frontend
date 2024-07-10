import React, { useEffect, useState } from "react";
import { Candidate } from "../utils/types";
import { fetchCandidates } from "../utils/apiFunctions";
import SlickTable from "../components/SlickTable";
import Loader from "../components/Loader";

const Candidates: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchCandidates().then((data) => {
      setCandidates(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Candidate },
    { header: "Name", accessor: "name" as keyof Candidate },
    {
      header: "Constituency",
      accessor: (row: Candidate) =>
        row.constituency.name + " (" + row.constituency.state + ")",
    },
    { header: "Party", accessor: (row: Candidate) => row.party.name },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 italic text-center">List of Candidates</h1>
      {loading ? (
        <Loader />
      ) : (
        <SlickTable columns={columns} data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
