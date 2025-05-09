import './globals.css';
import type { Metadata } from 'next';
import { Toaster } from 'react-hot-toast';
import { Inter, Poppins } from 'next/font/google';
import Navbar from './components/navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'ASSETXCHANGE - Secure Trades. Trusted Deals.',
  description: 'Trade properties, cars, and other assets securely on ASSETXCHANGE.',
  keywords: 'asset trading, property exchange, secure trading platform, asset exchange',
  authors: [{ name: 'ASSETXCHANGE' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#4F46E5',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow bg-gray-50">
          {children}
        </main>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            duration: 5000,
            style: {
              background: '#333',
              color: '#fff',
              borderRadius: '8px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#4F46E5',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}