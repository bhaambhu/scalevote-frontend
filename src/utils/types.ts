export interface Party {
    id: number;
    name: string;
    symbol: string;
  }
  
  export interface Candidate {
    id: number;
    name: string;
    party: Party;
    constituency: Constituency;
  }
  
  export interface Constituency {
    id: number;
    name: string;
    state: string;
  }
  
  export interface Vote {
    voterName: string;
    age: number;
    constituencyId: number;
    candidateId: number;
  }
  