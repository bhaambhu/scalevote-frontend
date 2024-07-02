import React, { useEffect, useState } from 'react';
import { Party } from '../utils/types';
import { fetchParties } from '../utils/apiFunctions';
import SlickTable from '../components/SlickTable';

const PartiesListPage: React.FC = () => {
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    fetchParties().then((data) => setParties(data));
  }, []);

  const columns = [
    { header: 'ID', accessor: 'id' as keyof Party },
    { header: 'Name', accessor: 'name' as keyof Party },
    { header: 'Symbol', accessor: 'symbol' as keyof Party },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 italic text-center">List of Parties</h1>
      <SlickTable columns={columns} data={parties} />
    </div>
  );
};

export default PartiesListPage;