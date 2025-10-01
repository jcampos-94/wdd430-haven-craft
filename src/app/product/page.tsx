'use client';

import Image from 'next/image';
import styles from './ProductPage.module.css';
import { useRouter } from 'next/navigation';

export default function ProductPage() {
  const router = useRouter();

  const handleAddToCart = () => {
    const newProduct = {
      name: "Wooden Owl",
      price: 49.99,
      image: "/images/filler_img_small.jpg",
    };
    // Add to cart in localStorage
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    router.push("/cart");
  };

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
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
