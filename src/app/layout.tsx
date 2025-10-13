import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { IM_Fell_DW_Pica, Lato } from 'next/font/google';
import './globals.css';
import styles from './page.module.css';
import { AuthProvider } from './components/AuthProvider';
import { Navigation } from './components/Navigation';

const headingFont = IM_Fell_DW_Pica({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-heading',
});

const bodyFont = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-body',
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description: 'WDD430 - Handcrafted Haven Project',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${headingFont.variable} ${bodyFont.variable}`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <div className={styles.page}>
            {/* Navigation */}
            <Navigation />

            {/* Page Content */}
            <main className="flex-1 main">{children}</main>

            {/* Footer */}
            <footer className="footer">
              <p>© {new Date().getFullYear()} Handcrafted Haven — WDD430 Project</p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
