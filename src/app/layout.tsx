import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { IM_Fell_DW_Pica, Lato } from 'next/font/google';
import './globals.css';
import styles from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';

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
      >
        {/* Navigation */}
        <div className={styles.page}>
          <nav className={styles.nav}>
            <Image
              alt="Handcrafted Haven logo"
              src={'/logo.png'}
              width={80}
              height={80}
            />
            <h1>Handcrafted Haven</h1>
            <div className={styles.navLinks}>
              <Link href="/" className="hover:underline">
                Home
              </Link>
              <Link href="/profiles" className="hover:underline">
                Profiles
              </Link>
              <Link href="/cart" className="hover:underline">
                Cart
              </Link>
              <Link href="/login" className="hover:underline">
                Log In
              </Link>
              
            </div>
          </nav>

          {/* Page Content */}
          <main className="flex-1">{children}</main>

          {/* Footer */}
          <footer className="">
            © {new Date().getFullYear()} Handcrafted Haven — WDD430 Project
          </footer>
        </div>
      </body>
    </html>
  );
}
