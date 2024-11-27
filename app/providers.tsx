'use client';

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { toast } from 'sonner';

interface ProvidersProps {
  children: React.ReactNode;
}

const DEFAULT_ERROR = 'Something went wrong';
const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
  queryCache: new QueryCache({
    onError: cause => {
      const { response } = cause as AxiosError<BaseResponse>;
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        duration: 3000,
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: cause => {
      const { response } = cause as AxiosError<BaseResponse>;
      toast.error(response?.data.message ?? DEFAULT_ERROR, {
        duration: 3000,
      });
    },
  }),
});

const Providers: React.FC<ProvidersProps> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default Providers;
