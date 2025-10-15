import { getSellerById, getSellerProducts } from '@/app/lib/data';
import Image from 'next/image';
import styles from '../../profile.module.css';

export default async function SellerDashboardPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const seller = await getSellerById(id);
  const products = await getSellerProducts(seller?.id);

  if (!seller) {
    return <p>Seller not found.</p>;
  }

  return (
    <section className={styles.sellerProfileMain}>
      {/* Seller Info */}
      <header className={styles.headerSection}>
        <div className={styles.profilePic}>
          <Image
            src={seller.profile_image || '/images/sellers/seller.png'}
            alt={seller.name}
            fill
            className={styles.profileImg}
          />
        </div>
        <div>
          <h1 className={styles.welcomeTitle}>{seller.name}&apos; shop</h1>
          <p className={styles.welcomeText}>{seller.craft}</p>
          <p className={styles.welcomeText}>{seller.location}</p>
          <p className={styles.welcomeText}>{seller.email}</p>
        </div>
      </header>

      {/* Dashboard Cards */}
      <section className={styles.updates}>
        <h2>🛍️ My story</h2>
        <p>{seller.story}</p>
      </section>

      {/* Product List */}
      <section className={styles.updates}>
        <h2>🛍️ Products</h2>
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
