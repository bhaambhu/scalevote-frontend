import axios from "axios";
import {
  GetCandidateByIdResponse,
  GetCandidatesResponse,
  GetConstituenciesResponse,
  GetConstituencyByIdResponse,
  GetConstituencyResultsResponse,
  GetPartiesResponse,
  GetPartyByIdResponse,
  GetStateResultsResponse,
} from "./types";
import { API_URL, apiEndpoints } from "./constants";

console.log("BASEURL is " + import.meta.env.BASE_URL);

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchParties = async (): Promise<GetPartiesResponse> => {
  const response = await axiosClient.get(apiEndpoints.parties);
  return response.data;
};

export const fetchPartyById = async (
  id: number
): Promise<GetPartyByIdResponse> => {
  const response = await axiosClient.get(apiEndpoints.partyById(id));
  return response.data;
};

export const fetchCandidates = async (): Promise<GetCandidatesResponse> => {
  const response = await axiosClient.get(apiEndpoints.candidates);
  return response.data;
};

export const fetchCandidateById = async (
  id: number
): Promise<GetCandidateByIdResponse> => {
  const response = await axiosClient.get(apiEndpoints.candidateById(id));
  return response.data;
};

export const fetchConstituencies =
  async (): Promise<GetConstituenciesResponse> => {
    const response = await axiosClient.get(apiEndpoints.constituencies);
    return response.data;
  };

export const fetchConstituencyById = async (
  id: number
): Promise<GetConstituencyByIdResponse> => {
  const response = await axiosClient.get(apiEndpoints.constituencyById(id));
  return response.data;
};

export const castVote = async (
  voterName: string,
  age: number,
  candidateId: number
): Promise<string> => {
  const response = await axiosClient.post(apiEndpoints.castVote, {
    voterName: voterName,
    age: age,
    candidateId: candidateId,
  });
  return response.data;
};

export const bulkCastVotes = async (
  constituencyId: number,
  numberOfVotes: number
): Promise<string> => {
  const response = await axiosClient.post(apiEndpoints.bulkCastVote, {
    constituencyId: constituencyId,
    numberOfVotes: numberOfVotes,
  });
  return response.data;
};

export const fetchStateResults = async (
  state: string
): Promise<GetStateResultsResponse> => {
  const response = await axiosClient.get(apiEndpoints.stateResults(state));
  return response.data;
};

export const fetchConstituencyResults = async (
  state: string,
  constituency: string
): Promise<GetConstituencyResultsResponse> => {
  const response = await axiosClient.get(
    apiEndpoints.constituencyResults(state, constituency)
  );
  return response.data;
};

export const fetchConstituencyResultsByID = async (
  constituencyId: number
): Promise<GetConstituencyResultsResponse> => {
  const response = await axiosClient.get(
    apiEndpoints.constituencyResultsById(constituencyId)
  );
  return response.data;
};
