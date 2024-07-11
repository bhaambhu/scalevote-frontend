import React, { useEffect, useState } from "react";
import { Candidate } from "../utils/types";
import { fetchCandidates } from "../utils/apiFunctions";
import SlickTable from "../components/SlickTable";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";

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
      <PageHeader>List of Candidates</PageHeader>
      {loading ? (
        <Loader />
      ) : (
        <SlickTable columns={columns} data={candidates} />
      )}
    </div>
  );
};

export default Candidates;
