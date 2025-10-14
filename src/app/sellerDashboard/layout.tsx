'use client';

import Link from 'next/link';
import styles from '../profile.module.css';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { useSession } from 'next-auth/react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const githubId = session?.user?.seller?.github_id;

  // Fallback if not logged in or no GitHub ID yet
  if (!githubId) {
    return (
      <ProtectedRoute>
        <section className={styles.sellerDashboard}>
          <p>Loading dashboard...</p>
        </section>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <section className={styles.sellerDashboard}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div>
            <h2 className={styles.sidebarTitle}>Seller Menu</h2>
            <nav className={styles.navLinks}>
              <Link href={`/sellerDashboard/${githubId}`} className={styles.navLink}>
                🏠 Dashboard
              </Link>
              <Link href="/sellerDashboard/products" className={styles.navLink}>
                🛍️ Products
              </Link>
              <Link
                href="/sellerDashboard/profileSettings"
                className={styles.navLink}
              >
                👤 Profile Settings
              </Link>
            </nav>
          </div>
          <div className={styles.footerNote}>
            <p>© 2025 HavenCraft</p>
          </div>
        </aside>

        {/* Main Content (Dashboard pages) */}
        {children}
      </section>
    </ProtectedRoute>
  );
}
