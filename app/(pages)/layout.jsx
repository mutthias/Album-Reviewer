import './_globals/globals.css';
import fonts from './_globals/fonts';
import metadata from './_globals/metadata.json';

import navLinks from './_data/navLinks.json';
import Navbar from './_components/Navbar/Navbar';
import Footer from './_components/Footer/Footer';

export { metadata };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={fonts}>
        <Navbar navLinks={navLinks} />
        {children}
        <Footer navLinks={navLinks} />
      </body>
    </html>
  );
}
