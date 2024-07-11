import React, { useEffect, useState } from "react";
import { Party } from "../utils/types";
import { fetchParties } from "../utils/apiFunctions";
import SlickTable from "../components/SlickTable";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";

const Parties: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchParties().then((data) => {
      setParties(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Party },
    { header: "Name", accessor: "name" as keyof Party },
    { header: "Symbol", accessor: "symbol" as keyof Party },
  ];

  return (
    <div className="container mx-auto p-4">
      <PageHeader>List of Parties</PageHeader>
      {loading ? (
        <Loader />
      ) : (
        <SlickTable columns={columns} data={parties} />
      )}{" "}
    </div>
  );
};

export default Parties;
