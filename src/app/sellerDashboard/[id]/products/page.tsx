'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from '../../products/products.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_name: string;
}

export default function ArtisanProducts() {
  const params = useParams();
  const idParam = params?.id;
  const sellerId = Array.isArray(idParam) ? idParam[0] : idParam;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sellerId) return;
    fetchProducts(sellerId);
  }, [sellerId]);

  const fetchProducts = async (sellerId: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/seller-products?sellerId=${sellerId}`);
      if (!res.ok) throw new Error('Failed to fetch artisan products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading products...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Artisan’s Products</h1>
      </div>

      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>This artisan doesn’t have any products yet.</p>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productImage}>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className={styles.productInfo}>
                <h3>{product.name}</h3>
                <p className={styles.category}>{product.category_name}</p>
                <p className={styles.description}>{product.description}</p>
                <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}