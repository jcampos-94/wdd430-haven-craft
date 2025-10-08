import styles from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getProducts } from './lib/data';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className={styles.main}>
      {/* HERO */}
      <section>
        <div className={styles.hero} />
        <div className={styles.heroText}>
          <h1>Handcrafted Haven</h1>
          <p>Unique, handcrafted creations await.</p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className={styles.products}>
        <div className={styles.productsRow}>
          {products.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className={styles.productCard}>
              <Image
                src={p.image_url}
                alt={p.name}
                className={styles.productImage}
                width={100}
                height={100}
              />
              <h2 className={styles.productName}>{p.name}</h2>
              <p className={styles.productPrice}>${p.price}</p>
              <p className={styles.productSeller}>By {p.seller_name}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}