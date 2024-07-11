export interface Party {
  id: number;
  name: string;
  symbol: string;
}

export interface Constituency {
  id: number;
  name: string;
  state: string;
}

export interface Candidate {
  id: number;
  name: string;
  party: Party;
  constituency: Constituency;
}

export interface VoteCount {
  id: number;
  name: string;
  votes: number;
  party: Party;
}

export interface WinningCandidate {
  id: number;
  name: string;
  votes: number;
}

export interface WinningParty {
  id: number;
  name: string;
  symbol: string;
}

export interface ConstituencyResult {
  margin: number;
  constituency: Constituency;
  voteCounts: VoteCount[];
  totalVotes: number;
  winningCandidate: WinningCandidate | null;
  winningParty: WinningParty | null;
}

export interface StateResult {
  constituencies: ConstituencyResult[];
  totalVotes: number;
  winningParty: {
    id: number;
    name: string;
    symbol: string;
    votes: number;
  };
}

// Response interfaces for each endpoint
export type GetCandidatesResponse = Candidate[];
export type GetCandidateByIdResponse = Candidate;
export type GetConstituenciesResponse = Constituency[];
export type GetConstituencyByIdResponse = Constituency;
export type GetPartiesResponse = Party[];
export type GetPartyByIdResponse = Party;
export type GetStateResultsResponse = StateResult;
export type GetConstituencyResultsResponse = ConstituencyResult;
