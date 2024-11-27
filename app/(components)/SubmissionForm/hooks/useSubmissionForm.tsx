import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { useSubmissionMutation } from '@/utils/api/hooks/useSubmissionMutation';
import { useQueryClient } from '@tanstack/react-query';

import type { SubmissionParams } from '@/utils/api/requests';
import { CACHE_KEY } from '@/constants';
import { submissionSchema } from '../constants';

export const useSubmissionForm = () => {
  const router = useRouter();
  const submissionForm = useForm<SubmissionParams>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      name: '',
      email: '',
      assignment_description: '',
      github_repo_url: '',
    },
  });
  const submissionMutation = useSubmissionMutation();
  const queryClient = useQueryClient();

  const onSubmit = submissionForm.handleSubmit(async values => {
    const submissionResponse = await submissionMutation.mutateAsync(values);
    queryClient.setQueryData(CACHE_KEY, submissionResponse);

    toast.success(`${submissionResponse.message}👍`, {
      description: 'Thank you for submitting your assignment! 🎉',
      duration: 3000,
    });

    router.replace('/thank-you');
  });

  return {
    state: { loading: submissionMutation.isPending },
    form: submissionForm,
    functions: { onSubmit },
  };
};