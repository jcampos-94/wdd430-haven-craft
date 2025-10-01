'use client';

import Image from 'next/image';
import styles from './ProductPage.module.css';

export default function ProductPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Wooden Owl</h1>

      <div className={styles.content}>
        {/* Left: Image */}
        <div className={styles.imageWrapper}>
          <Image
            src="/images/filler_img_large.jpg"
            alt="Image of a Wooden Owl"
            width={334}
            height={1000}
            className={styles.desktopImage}
          />
          <Image
            src="/images/filler_img_small.jpg"
            alt="Image of a Wooden Owl"
            width={167}
            height={250}
            className={styles.mobileImage}
          />
        </div>

        {/* Right: Info */}
        <div className={styles.info}>
          <p className={styles.description}>
            A beautifully crafted wooden owl, handmade from sustainable wood.
            Perfect for as a decorative piece on bedrooms and studies.
          </p>
          <p className={styles.price}>$49.99</p>
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
