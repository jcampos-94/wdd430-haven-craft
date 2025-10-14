'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
  seller_name: string;
  category_name: string;
  description: string;
}

interface ClientProductGridProps {
  products: Product[];
}

export default function ClientProductGrid({
  products,
}: ClientProductGridProps) {
  const [selectedSeller, setSelectedSeller] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Unique sellers & categories
  const sellers = Array.from(new Set(products.map((p) => p.seller_name)));
  const categories = Array.from(new Set(products.map((p) => p.category_name)));

  // Filter products by seller/category
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const sellerMatch = selectedSeller
        ? p.seller_name === selectedSeller
        : true;
      const categoryMatch = selectedCategory
        ? p.category_name === selectedCategory
        : true;
      return sellerMatch && categoryMatch;
    });
  }, [selectedSeller, selectedCategory, products]);

  return (
    <div>
      {/* FILTER BAR */}
      <section className={styles.filters}>
        <div className={styles.filterCategory}>
          <label className={styles.filterLabel}>
            Seller:&nbsp;&nbsp;
            <select
              className={styles.filterSelect}
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
            >
              <option value="">All</option>
              {sellers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={styles.filterCategory}>
          <label className={styles.filterLabel}>
            Category:&nbsp;&nbsp;
            <select
              className={styles.filterSelect}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section className={styles.products}>
        <div className={styles.productsRow}>
          {filteredProducts.map((p) => (
            <Link
              key={p.id}
              href={`/product/${p.id}`}
              className={styles.productCard}
            >
              <Image
                src={p.image_url}
                alt={p.name}
                width={100}
                height={100}
                className={styles.productImage}
              />
              <h2 className={styles.productName}>{p.name}</h2>
              <p className={styles.productPrice}>${p.price}</p>
              <p className={styles.productSeller}>By {p.seller_name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
