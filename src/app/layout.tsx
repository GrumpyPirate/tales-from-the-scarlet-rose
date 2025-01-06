import { Crimson_Pro, Crimson_Text } from 'next/font/google';

import 'reset-css';
import 'sanitize.css';

import './globals.css';
import classNames from './layout.module.css';
import Navigation from './components/Navigation';

import type { Metadata } from 'next';

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <video className={classNames['bg-video']} autoPlay muted loop>
          <source src="/videos/fire-web.webm" type="video/webm" />
          <source src="/videos/fire-web.mp4" type="video/mp4" />
        </video>
        <div className={classNames['overlay']} role="presentation" />
        <div className={classNames['page']}>
          <Navigation />
          <div className={classNames['page__content']}>{children}</div>
        </div>
      </body>
    </html>
  );
}
