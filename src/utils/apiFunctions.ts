import axios from "axios";
import { Candidate, Constituency, Party, Vote } from "./types";
import { API_URL } from "./constants";

console.log("BASEURL is " + import.meta.env.BASE_URL);

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchParties = async (): Promise<Party[]> => {
  const response = await axiosClient.get("/parties");
  return response.data;
};

export const fetchCandidates = async (): Promise<Candidate[]> => {
  const response = await axiosClient.get("/candidates");
  return response.data;
};

export const fetchConstituencies = async (): Promise<Constituency[]> => {
  const response = await axiosClient.get("/constituencies");
  return response.data;
};

export const castVote = async (vote: Vote): Promise<string> => {
  const response = await axiosClient.post("/votes/cast", vote);
  return response.data;
};

export const bulkCastVotes = async (
  constituencyId: number,
  numberOfVotes: number
): Promise<string> => {
  const response = await axiosClient.post(
    `/votes/bulk-cast?constituencyId=${constituencyId}&numberOfVotes=${numberOfVotes}`
  );
  return response.data;
};

export const fetchStateResults = async (state: string): Promise<any[]> => {
  const response = await axiosClient.get(`/results/state/${state}`);
  return response.data;
};

export const fetchConstituencyResults = async (
  constituencyId: number
): Promise<any> => {
  const response = await axiosClient.get(
    `/results/constituency/${constituencyId}`
  );
  return response.data;
};
