import React, { useEffect, useState } from "react";
import { Constituency } from "../utils/types";
import { fetchConstituencies } from "../utils/apiFunctions";
import SlickTable from "../components/SlickTable";
import Loader from "../components/Loader";
import PageHeader from "../components/PageHeader";

const Constituencies: React.FC = () => {
  const [constituencies, setConstituencies] = useState<Constituency[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchConstituencies().then((data) => {
      setConstituencies(data);
      setLoading(false);
    });
  }, []);

  const columns = [
    { header: "ID", accessor: "id" as keyof Constituency },
    { header: "Name", accessor: "name" as keyof Constituency },
    { header: "State", accessor: "state" as keyof Constituency },
  ];

  return (
    <div className="container mx-auto p-4">
      <PageHeader>List of Constituencies</PageHeader>
      {loading ? (
        <Loader />
      ) : (
        <SlickTable columns={columns} data={constituencies} />
      )}
    </div>
  );
};

export default Constituencies;
