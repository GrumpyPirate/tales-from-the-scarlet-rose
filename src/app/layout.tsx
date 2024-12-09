import type { Metadata } from 'next';
import { Crimson_Pro, Crimson_Text } from 'next/font/google';

import 'reset-css';
import 'sanitize.css';

import './globals.css';

const headingFont = Crimson_Pro({
  weight: '400',
  display: 'swap',
  subsets: ['latin'],
  variable: '--heading-font',
});

const bodyFont = Crimson_Text({
  weight: ['400', '600'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--body-font',
});

export const metadata: Metadata = {
  title: 'Tales from the Scarlet Rose',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>{children}</body>
    </html>
  );
}
