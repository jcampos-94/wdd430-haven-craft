'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../page.module.css';

export function Navigation() {
  const { data: session, status } = useSession();

  return (
    <nav className={styles.nav}>
      <Image
        alt="Handcrafted Haven logo"
        src={'/logo.webp'}
        width={80}
        height={80}
      />
      <h2>Handcrafted Haven</h2>
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

        {status === 'loading' ? (
          <span className="text-gray-500">Loading...</span>
        ) : session ? (
          <>
            <Link href="/sellerDashboard" className="hover:underline">
              Dashboard
            </Link>
            <span className="text-sm">
              Hi, {session.user?.name || session.user?.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="hover:underline text-[#FFB3B6]"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login" className="hover:underline">
            Log In (Seller)
          </Link>
        )}
      </div>
    </nav>
  );
}
