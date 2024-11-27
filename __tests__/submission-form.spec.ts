import {
  submissionForm,
  SubmissionParams,
} from '@/utils/api/requests/submission-form/index';
import { apiReq } from '@/utils/api/instance';

jest.mock('@/utils/api/instance', () => ({
  apiReq: {
    post: jest.fn(),
  },
}));

describe('submissionForm', () => {
  it('should make a POST request with correct parameters and config', async () => {
    const mockParams: SubmissionParams = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      assignment_description: 'This is a sample assignment.',
      github_repo_url: 'https://github.com/johndoe/sample-repo',
      candidate_level: 'Intermediate',
    };

    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockResponse = { data: mockParams, message: 'Submission successful' };

    (apiReq.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await submissionForm({
      params: mockParams,
      config: mockConfig,
    });

    expect(apiReq.post).toHaveBeenCalledWith(
      'assignments',
      mockParams,
      mockConfig
    );
    expect(response).toEqual(mockResponse);
  });

  it('should handle errors from the API request', async () => {
    const mockParams: SubmissionParams = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      assignment_description: 'This is a sample assignment.',
      github_repo_url: 'https://github.com/johndoe/sample-repo',
      candidate_level: 'Intermediate',
    };

    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockErrorResponse = { error: ['Invalid request data'] };

    (apiReq.post as jest.Mock).mockRejectedValue(mockErrorResponse);

    await expect(
      submissionForm({ params: mockParams, config: mockConfig })
    ).rejects.toEqual(mockErrorResponse);
  });

  it('should return the correct message and data on successful submission', async () => {
    const mockParams: SubmissionParams = {
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      assignment_description: 'Completed assignment',
      github_repo_url: 'https://github.com/janedoe/assignment',
      candidate_level: 'Advanced',
    };

    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockResponse = { data: mockParams, message: 'Submission successful' };

    (apiReq.post as jest.Mock).mockResolvedValue(mockResponse);

    const response = await submissionForm({
      params: mockParams,
      config: mockConfig,
    });

    expect(response.message).toBe('Submission successful');
    expect(response.data).toEqual(mockParams);
  });
});
