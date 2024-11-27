import { apiReq } from '../../instance';

export type CandidateLevels = {
  levels: string[];
};

export const getCandidateLevels = ({ config }: RequestConfig) =>
  apiReq.get<CandidateLevels>('levels', config);
