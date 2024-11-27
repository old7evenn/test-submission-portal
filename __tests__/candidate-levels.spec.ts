import { getCandidateLevels } from '@/utils/api/requests/candidate-levels/index';
import { apiReq } from '@/utils/api/instance';

jest.mock('@/utils/api/instance', () => ({
  apiReq: {
    get: jest.fn(),
  },
}));

describe('getCandidateLevels', () => {
  it('should make a GET request with the correct config', async () => {
    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockResponse = { levels: ['Junior', 'Middle', 'Senior'] };

    (apiReq.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getCandidateLevels({ config: mockConfig });

    expect(apiReq.get).toHaveBeenCalledWith('levels', mockConfig);
    expect(response).toEqual(mockResponse);
  });

  it('should handle errors from the API request', async () => {
    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockErrorResponse = { error: ['Unable to fetch levels'] };

    (apiReq.get as jest.Mock).mockRejectedValue(mockErrorResponse);

    await expect(getCandidateLevels({ config: mockConfig })).rejects.toEqual(
      mockErrorResponse
    );
  });

  it('should return the correct candidate levels on successful response', async () => {
    const mockConfig = { headers: { Authorization: 'Bearer token' } };
    const mockResponse = { levels: ['Junior', 'Middle', 'Senior'] };

    (apiReq.get as jest.Mock).mockResolvedValue(mockResponse);

    const response = await getCandidateLevels({ config: mockConfig });

    expect(response.levels).toEqual(['Junior', 'Middle', 'Senior']);
  });
});
