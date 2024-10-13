import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SearchProvider } from '@/context/SearchContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Software Vulnerability Search',
  description: 'Search for software vulnerabilities across different languages',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SearchProvider>
          {children}
        </SearchProvider>
      </body>
    </html>
  );
}