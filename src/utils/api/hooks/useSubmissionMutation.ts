import { useMutation } from '@tanstack/react-query';

import { submissionForm } from '../requests';
import type { SubmissionParams } from '../requests';

export const useSubmissionMutation = (
  settings?: MutationSettings<SubmissionParams, typeof submissionForm>
) =>
  useMutation({
    mutationKey: ['submissionForm'],
    mutationFn: params =>
      submissionForm({
        params,
        ...(settings?.config && { config: settings.config.config }),
      }),
    ...settings?.options,
  });
