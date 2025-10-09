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
              <Link href="/sellerDashboard" className={styles.navLink}>
                🏠 Dashboard
              </Link>
              <Link href="/sellerDashboard/products" className={styles.navLink}>
                🛍️ Products
              </Link>
              <Link href="/sellerDashboard/orders" className={styles.navLink}>
                📦 Orders
              </Link>
              <Link
                href="/sellerDashboard/profileSettings"
                className={styles.navLink}
              >
                👤 Profile & Settings
              </Link>
              <Link href="/sellerDashboard/reviews" className={styles.navLink}>
                💬 Customer Feedback
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
