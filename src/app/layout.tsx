import type { Metadata } from 'next';
import '../styles/globals.css';
import { WithChildren } from '@/types/common';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Next App Boilerplate',
  description: 'Created by: pen.dev',
};

const RootLayout = ({ children }: WithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
