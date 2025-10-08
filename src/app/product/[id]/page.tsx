import Image from 'next/image';
import styles from '../ProductPage.module.css';
import { getProductById } from '../../lib/data';
import CartAndReviews from './CartAndReviews';

interface Params {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: Params) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) return <p>Product not found</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        {/* Left: Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={product.image_url || '/images/placeholder.png'}
            alt={`Image of ${product.name}`}
            width={334}
            height={400}
            className={styles.desktopImage}
          />
        </div>

        {/* Right: Info + Client Component */}
        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.seller}>By {product.seller_name}</p>

          {/* Client-side cart & reviews */}
          <CartAndReviews product={product} />
        </div>
      </div>
    </div>
  );
}