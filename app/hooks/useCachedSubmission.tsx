import { CACHE_KEY } from '@/constants';
import { SubmissionParams } from '@/utils/api/requests';
import { useQueryClient } from '@tanstack/react-query';

type SubmissionCacheData = {
  data: SubmissionParams;
};

export const useCachedSubmission = () => {
  const queryClient = useQueryClient();
  const queryKey = CACHE_KEY;

  return queryClient.getQueryData<SubmissionCacheData>(queryKey);
};
