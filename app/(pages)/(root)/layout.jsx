import { Inter } from 'next/font/google';
import '@globals/globals.scss';

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
      <body className={`${inter.variable}`}>{children}</body>
    </html>
  );
}
