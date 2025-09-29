// import Image from 'next/image';
import styles from './page.module.css';
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {

  return (
    <main className={styles.main}>
      {/* <Image alt="" src="" width={1} height={2} /> */}
      <div className={styles.productsRow}>
        {products.map((p) => (
          <div key={p.id} className={styles.productCard}>
            <img src={p.image} alt={p.name} className={styles.productImage} />
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
    </main>
  );
}
