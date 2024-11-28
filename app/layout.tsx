import { Montserrat } from 'next/font/google';

import type { Metadata } from 'next';

import './globals.css';
import { Toaster } from '@/components/ui';
import Providers from './providers';

const inter = Montserrat({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'Submissions Portal',
  description: 'Your one-stop shop for submitting your work.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col justify-center items-center bg-background text-muted-foreground font-sans antialiased ${inter.className} `}
      >
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
