'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../profile.module.css';
import { ProtectedRoute } from '../components/ProtectedRoute';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Extract seller ID from the current URL
  const match = pathname.match(/\/sellerDashboard\/(\d+)/);
  const sellerId = match ? match[1] : null;

  // Build dashboard and product links based on context
  const basePath = sellerId ? `/sellerDashboard/${sellerId}` : '/sellerDashboard';

  return (
    <ProtectedRoute>
      <section className={styles.sellerDashboard}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <div>
            <h2 className={styles.sidebarTitle}>Seller Menu</h2>
            <nav className={styles.navLinks}>
              <Link href={basePath} className={styles.navLink}>
                🏠 Dashboard
              </Link>
              <Link href={`${basePath}/products`} className={styles.navLink}>
                🛍️ Products
              </Link>
            </nav>
          </div>
          <div className={styles.footerNote}>
            <p>© 2025 HavenCraft</p>
          </div>
        </aside>

        {/* Main Content */}
        {children}
      </section>
    </ProtectedRoute>
  );
}
