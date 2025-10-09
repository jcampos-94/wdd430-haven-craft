'use client';

import Link from 'next/link';
import styles from '../profile.module.css';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <section className={styles.sellerDashboard}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div>
            <h2 className={styles.sidebarTitle}>Seller Menu</h2>
            <nav className={styles.navLinks}>
              <Link href="/dashboard" className={styles.navLink}>
                🏠 Dashboard
              </Link>
              <Link href="/dashboard/products" className={styles.navLink}>
                🛍️ Products
              </Link>
              <Link href="/dashboard/orders" className={styles.navLink}>
                📦 Orders
              </Link>
              <Link
                href="/dashboard/profile-settings"
                className={styles.navLink}
              >
                👤 Profile & Settings
              </Link>
              <Link href="/dashboard/reviews" className={styles.navLink}>
                💬 Customer Feedback
              </Link>
            </nav>
          </div>
          <div className={styles.footerNote}>
            <p>© 2025 HavenCraft</p>
          </div>
        </aside>

        {/* Main Content (Dashboard pages) */}
        <main className={styles.mainContent}>{children}</main>
      </section>
    </ProtectedRoute>
  );
}
