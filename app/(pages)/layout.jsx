import { Inter } from 'next/font/google';
import '@globals/globals.scss';

import navLinks from '@data/navLinks.json';
import Navbar from '@components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata = {
  title: 'Next.js Starter Template',
  icons: {
    icon: '/icons/icon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <Navbar navLinks={navLinks} />
        {children}
        <Footer navLinks={navLinks} />
      </body>
    </html>
  );
}
