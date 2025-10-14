import { getSellerById, getSellerProducts } from '@/app/lib/data';
import Image from 'next/image';
import styles from '../../profile.module.css';

export default async function SellerDashboardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sellerId = Number(id);
  const seller = await getSellerById(sellerId);
  const products = await getSellerProducts(sellerId);

  if (!seller) {
    return <p>Seller not found.</p>;
  }

  return (
    <section className={styles.main}>
      {/*Seller Info*/}
      <header className={styles.headerSection}>
        <div className={styles.profilePic}>
          <Image
            src={seller.profile_image || '/images/artisan-profile.png'}
            alt={seller.name}
            fill
            className={styles.profileImg}
          />
        </div>
        <div>
          <h1 className={styles.welcomeTitle}>
            Welcome back, {seller.shop_name || seller.name}!
          </h1>
          <p className={styles.welcomeText}>
            Your handcrafted creations inspire many. Here&apos;s your shop
            overview and updates.
          </p>
        </div>
      </header>

      {/*Dashboard Cards*/}
      <section className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Sales</h3>
          <p>${seller.total_sales || '0'}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Orders</h3>
          <p>{seller.pending_orders || '0'}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Products</h3>
          <p>{products.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Messages</h3>
          <p>{seller.messages || '0'}</p>
        </div>
      </section>

      {/*Product List*/}
      <section className={styles.updates}>
        <h2>🛍️ Your Products</h2>
        <ul>
          {products.map((p: any) => (
            <li key={p.id}>
              <strong>{p.name}</strong> — ${p.price}
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
}
