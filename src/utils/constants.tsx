import BJP_LOGO from "../assets/BJP_Election_Symbol.svg";
import AAP_LOGO from "../assets/AAP_symbol.svg";
import BSP_LOGO from "../assets/bsp_logo.png";
import HAND_LOGO from "../assets/hand_congress.svg";
import SP_LOGO from "../assets/bicycle.svg";

const API_URL_LIVE = "https://scalevote.up.railway.app";
// const API_URL_LOCAL = "http://localhost:8080";
export const BASE_URL = import.meta.env.BASE_URL;
// export const API_URL = import.meta.env.DEV ? API_URL_LOCAL : API_URL_LIVE;
export const API_URL = API_URL_LIVE;

export const apiEndpoints = {
  candidates: "/api/candidates",
  candidateById: (id: number) => `/api/candidates/${id}`,
  constituencies: "/api/constituencies",
  constituencyById: (id: number) => `/api/constituencies/${id}`,
  parties: "/api/parties",
  partyById: (id: number) => `/api/parties/${id}`,
  stateResults: (state: string) => `/api/results/state/${state}`,
  constituencyResults: (state: string, constituency: string) =>
    `/api/results/state/${state}/${constituency}`,
  constituencyResultsById: (constituencyId: number) =>
    `/api/results/constituency/${constituencyId}`,
  castVote: "/api/votes/cast",
  bulkCastVote: "/api/votes/bulk-cast",
};

const iconMap: { [key: string]: React.ReactNode } = {
  Lotus: <img src={BJP_LOGO} />,
  Broom: <img src={AAP_LOGO} />,
  Hand: <img src={HAND_LOGO} />,
  Elephant: <img src={BSP_LOGO} />,
  Bicycle: <img src={SP_LOGO} />,
};

export const getPartyIcon = (symbol: string): React.ReactNode => {
  return iconMap[symbol] || null; // Return null if the symbol is not found
};
