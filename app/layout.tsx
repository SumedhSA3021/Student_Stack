import './globals.css';
import 'atropos/css';
import type { Metadata } from 'next';
import { Inter_Tight } from 'next/font/google';
import { UserProfileWrapper } from './UserProfileWrapper';

const interTight = Inter_Tight({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://student-stack-sumedh-ambekars-projects.vercel.app'),
  title: 'StudentStack - Discover Student Opportunities',
  description: 'A premium platform for students to discover and claim exclusive opportunities, student packs, cloud credits, hackathons, and more.',
  openGraph: {
    title: 'StudentStack — Discover Student Opportunities',
    description: 'A premium platform for students to discover hackathons, developer packs, cloud credits, internships, and more.',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'StudentStack Dashboard',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudentStack — Discover Student Opportunities',
    description: 'A premium platform for students to discover hackathons, developer packs, cloud credits, internships, and more.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={interTight.className}>
        <UserProfileWrapper>{children}</UserProfileWrapper>
      </body>
    </html>
  );
}
