import { HttpClient } from './http-client';

export const apiReq = new HttpClient({
  baseURL: 'https://tools.qa.public.ale.ai/api/tools/candidates',
});
