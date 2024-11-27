import { apiReq } from '../../instance';

export type SubmissionParams = {
  name: string;
  email: string;
  assignment_description: string;
  github_repo_url: string;
  candidate_level: string;
};

type SubmissionResponse = {
  message?: string;
  error?: string[];
  data?: SubmissionParams;
};

export const submissionForm = ({
  params,
  config,
}: RequestConfig<SubmissionParams>) =>
  apiReq.post<SubmissionResponse>('assignments', params, config);
