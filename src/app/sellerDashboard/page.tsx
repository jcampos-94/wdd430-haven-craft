'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import styles from '../profile.module.css';
import { ProtectedRoute } from '../components/ProtectedRoute';

function SellerDashboard() {
  const { data: session } = useSession();
  const user = session?.user;

  // State for stats and updates
  const [stats, setStats] = useState({
    totalSales: 0,
    pendingOrders: 0,
    products: 0,
    messages: 0,
  });
  const [updates, setUpdates] = useState<
    { title: string; date: string; description: string }[]
  >([]);

  // fetching seller stats & updates
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((r) => setTimeout(r, 500));

      setStats({
        totalSales: 2340,
        pendingOrders: 8,
        products: 24,
        messages: 12,
      });

      setUpdates([
        {
          title: 'New Product Added: Autumn Bracelet',
          date: 'Oct 5, 2025',
          description: 'A warm-toned handcrafted bracelet now available!',
        },
        {
          title: 'Community Craft Fair',
          date: 'Oct 20, 2025',
          description: 'Showcase your creations and connect with artisans.',
        },
      ]);
    };

    fetchData();
  }, []);

  return (
    <section className={styles.main}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div className={styles.profilePic}>
          <Image
            src={user?.image || '/images/artisan-profile.png'}
            alt="Seller profile"
            fill
            className={styles.profileImg}
          />
        </div>
        <div>
          <h1 className={styles.welcomeTitle}>
            Welcome back, {user?.name || 'Artisan'}!
          </h1>
          <p className={styles.welcomeText}>
            Your handcrafted creations inspire many. Here&apos;s your shop
            overview and updates.
          </p>
        </div>
      </section>

      {/* Dashboard Overview */}
      <section className={styles.statsGrid}>
        {[
          { title: 'Total Sales', value: `$${stats.totalSales}` },
          { title: 'Pending Orders', value: stats.pendingOrders },
          { title: 'Products', value: stats.products },
          { title: 'Messages', value: stats.messages },
        ].map((card, i) => (
          <div key={i} className={styles.statCard}>
            <h2>{card.title}</h2>
            <p>{card.value}</p>
          </div>
        ))}
      </section>

      {/* Shop Updates */}
      <section className={styles.updates}>
        <h2>Shop Updates</h2>
        {updates.length === 0 ? (
          <p>Loading updates...</p>
        ) : (
          <ul>
            {updates.map((u, i) => (
              <li key={i}>
                <h3>{u.title}</h3>
                <p className={styles.date}>{u.date}</p>
                <p>{u.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <SellerDashboard />
    </ProtectedRoute>
  );
}

export default SellerDashboardPage;
