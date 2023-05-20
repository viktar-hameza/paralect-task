import { TokenResponse } from '@/features/shared/api/superjob/types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse>
) {
  const params = new URLSearchParams({
    login: process.env.NEXT_PUBLIC_SUPERJOB_LOGIN || '',
    password: process.env.NEXT_PUBLIC_SUPERJOB_PASSWORD || '',
    client_id: process.env.NEXT_PUBLIC_SUPERJOB_CLIENT_ID || '',
    client_secret: process.env.NEXT_PUBLIC_SUPERJOB_CLIENT_SECRET || '',
    hr: '0',
  });
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPERJOB_API_URL}/${
      process.env.NEXT_PUBLIC_SUPERJOB_API_VERSION
    }/oauth2/password/?${params.toString()}`,
    {
      method: 'GET',
      headers: {
        'x-secret-key': process.env.NEXT_PUBLIC_SUPERJOB_X_SECRET_KEY || '',
      },
    }
  );

  const json = await response.json();
  res.status(200).json(json);
}
