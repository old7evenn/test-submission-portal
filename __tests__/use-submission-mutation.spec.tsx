import { render, screen, waitFor } from '@testing-library/react';
import { useMutation } from '@tanstack/react-query';
import { useSubmissionMutation } from '@/utils/api/hooks/useSubmissionMutation';
import { submissionForm } from '@/utils/api/requests';

jest.mock('@tanstack/react-query', () => ({
  useMutation: jest.fn(),
}));

jest.mock('@/utils/api/requests', () => ({
  submissionForm: jest.fn(),
}));

describe('useSubmissionMutation', () => {
  it('should handle successful submission', async () => {
    const mockParams = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      assignment_description: 'Test assignment',
      github_repo_url: 'https://github.com/johndoe/repo',
      candidate_level: 'Junior',
    };

    const mockResponse = { message: 'Submission successful' };
    (submissionForm as jest.Mock).mockResolvedValue(mockResponse);

    const mockMutation = {
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
      isSuccess: true,
      data: mockResponse,
    };

    (useMutation as jest.Mock).mockReturnValue(mockMutation);

    const Component = () => {
      const { mutate, isSuccess, data } = useSubmissionMutation();

      return (
        <>
          <button onClick={() => mutate(mockParams)}>Submit</button>
          {isSuccess && <div>{data?.message}</div>}
        </>
      );
    };

    render(<Component />);

    const submitButton = screen.getByText('Submit');
    submitButton.click();

    await waitFor(() => {
      expect(screen.getByText(mockResponse.message)).toBeInTheDocument();
    });
  });

  it('should handle error during submission', async () => {
    const mockParams = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      assignment_description: 'Test assignment',
      github_repo_url: 'https://github.com/johndoe/repo',
      candidate_level: 'Junior',
    };

    const mockError = { error: ['Unable to submit'] };
    (submissionForm as jest.Mock).mockRejectedValue(mockError);

    const mockMutation = {
      mutate: jest.fn(),
      isLoading: false,
      isError: true,
      isSuccess: false,
      data: null,
      error: mockError,
    };

    (useMutation as jest.Mock).mockReturnValue(mockMutation);

    const Component = () => {
      const { mutate, isError, error } = useSubmissionMutation();

      return (
        <>
          <button onClick={() => mutate(mockParams)}>Submit</button>
          {isError && <div>{error?.error[0]}</div>}
        </>
      );
    };

    render(<Component />);

    const submitButton = screen.getByText('Submit');
    submitButton.click();

    await waitFor(() => {
      expect(screen.getByText(mockError.error[0])).toBeInTheDocument();
    });
  });
});
