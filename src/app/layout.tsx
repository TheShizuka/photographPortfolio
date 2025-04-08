import './globals.css';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

// Load Google font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Load custom font (similar to Camille Mormal's site)
const sans = localFont({ 
  src: '../../public/fonts/NeueMontreal-Regular.woff2',
  variable: '--font-sans'
});

export const metadata = {
  title: 'Photography Portfolio',
  description: 'A portfolio of photographs from Japan and around the world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${sans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}