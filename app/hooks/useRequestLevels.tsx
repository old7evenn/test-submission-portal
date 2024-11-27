import { useEffect, useState } from 'react';
import { getCandidateLevels } from '@/utils/api/requests';

export const useRequestLevels = () => {
  const [levels, setLevels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await getCandidateLevels({
          config: { cache: 'force-cache' },
        });

        setLevels(response.levels);
      } catch (e) {
        setError('An error occurred while fetching candidate levels');
        console.error(e);
      }
    };
    request();
  }, []);

  return { levels, error };
};
