'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui';
import { useCachedSubmission } from '../hooks/useCachedSubmission';

export default function ThankYou() {
  const router = useRouter();

  const cachedSubmission = useCachedSubmission();

  return (
    <div className="flex flex-col justify-center gap-4">
      <h1>Thank you for your submission!</h1>
      {cachedSubmission && (
        <div className="text-center">
          <p>
            <b>{cachedSubmission?.data.name}</b>
          </p>
          <p>
            <b>{cachedSubmission?.data.email}</b>
          </p>
        </div>
      )}
      <Button onClick={() => router.replace('/')}>Back to form</Button>
    </div>
  );
}
