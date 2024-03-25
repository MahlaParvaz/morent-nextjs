import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import './globals.css';
import Header from './Header';
import vazirFont from '../constants/localFonts';
import Providers from './Providers';
import { Toaster } from 'react-hot-toast';

// const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Car Shop',
  description: 'Online Car Shop Website',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body
        suppressHydrationWarning={true}
        className={`${vazirFont.variable} font-sans bg-background`}
      >
        <Providers>
          <Toaster />
          <Header />
          <div className="container xl:max-w-screen-xl">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
