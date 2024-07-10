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
  constituencyResults: (constituencyId: number) =>
    `/api/results/constituency/${constituencyId}`,
  castVote: "/api/votes/cast",
  bulkCastVote: "/api/votes/bulk-cast",
};
