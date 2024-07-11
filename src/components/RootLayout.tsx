import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const RootLayout: React.FC = () => (
  <div>
    <h1 className="text-center my-3 italic font-mono text-xs tracking-widest font-bold">
      ScaleVote
    </h1>
    <nav>
      <div className="flex gap-3 px-3 text-xs md:text-base flex-wrap justify-center items-center w-full">
        <div className="flex gap-3">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 border border-black p-1 px-2 rounded"
                : "border border-black p-1 px-2 rounded"
            }
            to={BASE_URL + "parties"}
          >
            Parties
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 border border-black p-1 px-2 rounded"
                : "border border-black p-1 px-2 rounded"
            }
            to={BASE_URL + "candidates"}
          >
            Candidates
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 border border-black p-1 px-2 rounded"
                : "border border-black p-1 px-2 rounded"
            }
            to={BASE_URL + "constituencies"}
          >
            Constituencies
          </NavLink>
        </div>
        <div className="flex gap-3">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 border border-black p-1 px-2 rounded"
                : "border border-black p-1 px-2 rounded"
            }
            to={BASE_URL + "vote"}
          >
            Cast Vote
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-yellow-500 border border-black p-1 px-2 rounded"
                : "border border-black p-1 px-2 rounded"
            }
            to={BASE_URL + "results/Haryana"}
          >
            Results
          </NavLink>
        </div>
      </div>
    </nav>
    <Outlet />
  </div>
);

export default RootLayout;
