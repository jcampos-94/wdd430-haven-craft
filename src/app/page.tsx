export const dynamic = 'force-dynamic';

import styles from './page.module.css';
import { getProducts, Product } from './lib/data';
import ClientProductGrid from './ClientProductGrid';

export default async function Home() {
  const products: Product[] = await getProducts();

  return (
    <>
      {/* HERO */}
      <section>
        <div className={styles.hero} />
        <div className={styles.heroText}>
          <h1>Handcrafted Haven</h1>
          <p>Unique, handcrafted creations await.</p>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <ClientProductGrid products={products} />
    </>
  );
}
