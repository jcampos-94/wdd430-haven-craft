'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { products } from './data/products';
import Image from 'next/image';

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // mimic the loading time
    const t = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className={styles.main}>
      {/* HERO: loading class*/}
      <section>
        {loading ? (
          <div className={`${styles.hero} ${styles.skeleton}`} />
        ) : (
          <div className={styles.hero} />
        )}

        <div className={styles.heroText}>
          {loading ? (
            <>
              <div
                className={styles.skeleton}
                style={{
                  width: 260,
                  height: 24,
                  margin: '12px auto 8px',
                  borderRadius: 8,
                }}
              />
              <div
                className={styles.skeleton}
                style={{
                  width: 320,
                  height: 16,
                  margin: '0 auto',
                  borderRadius: 8,
                }}
              />
            </>
          ) : (
            <>
              <h1>Handcrafted Haven</h1>
              <p>Unique, handcrafted creations await.</p>
            </>
          )}
        </div>
      </section>

      {/* PRODUCTS GRID: u(use classess and mesures)*/}
      <section className={styles.products}>
        <div className={styles.productsRow}>
          {products.map((p) => (
            <div key={p.id} className={styles.productCard}>
              <Image
                src={p.image}
                alt={p.name}
                className={styles.productImage}
                width={100}
                height={100}
              />
              <h2 className={styles.productName}>{p.name}</h2>
              <p className={styles.productPrice}>{p.price}</p>
              <p className={styles.productRating}>⭐ {p.rating}</p>
              <p className={styles.productReview}>{p.review}</p>
              <p className={styles.productMeta}>
                – {p.reviewer}, {p.date}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
