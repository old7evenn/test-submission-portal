import { z } from 'zod';

export const submissionSchema = z.object({
  name: z
    .string({
      required_error: 'Name must not be empty.',
    })
    .nonempty({ message: 'Name must not be empty.' })
    .min(1, { message: 'Name is too short' }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .nonempty({ message: 'Email must not be empty.' })
    .email({ message: 'Invalid email' }),
  assignment_description: z
    .string({
      required_error: 'Assignment Description must not be empty.',
    })
    .nonempty({ message: 'Assignment description must not be empty.' })
    .min(10, {
      message: 'Assignment description must be at least 10 characters',
    }),
  github_repo_url: z
    .string({
      required_error: 'GitHub repository URL must not be empty',
    })
    .nonempty({ message: 'GitHub repository URL must not be empty' })
    .url({ message: 'GitHub repository URL must be a valid URL.' }),
  candidate_level: z.string({
    required_error: 'Please select an Candidate Level.',
  }),
});
