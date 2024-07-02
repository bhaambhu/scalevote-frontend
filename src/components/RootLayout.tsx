import React from "react";
import { Link, Outlet } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const RootLayout: React.FC = () => (
  <div>
    <h1 className="text-center my-3 italic">Welcome to ScaleVote</h1>
    <nav>
      <ul className="flex gap-3 px-3 text-xs md:text-base flex-wrap justify-center items-center w-full">
        <li className="border border-black p-1 px-2 rounded">
          <Link to={BASE_URL + "parties"}>Parties</Link>
        </li>
        <li className="border border-black p-1 px-2 rounded">
          <Link to={BASE_URL + "candidates"}>Candidates</Link>
        </li>
        <li className="border border-black p-1 px-2 rounded">
          <Link to={BASE_URL + "constituencies"}>Constituencies</Link>
        </li>
        <li className="border border-black p-1 px-2 rounded">
          <Link to={BASE_URL + "vote"}>Cast Vote</Link>
        </li>
        <li className="border border-black p-1 px-2 rounded">
          <Link to={BASE_URL + "results"}>Results</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
  </div>
);

export default RootLayout;
