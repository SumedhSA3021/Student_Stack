import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { UserProfileWrapper } from './UserProfileWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StudentStack - Discover Student Opportunities',
  description: 'A premium platform for students to discover and claim exclusive opportunities, student packs, cloud credits, hackathons, and more.',
  openGraph: {
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: [
      {
        url: 'https://bolt.new/static/og_default.png',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProfileWrapper>{children}</UserProfileWrapper>
      </body>
    </html>
  );
}
