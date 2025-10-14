'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { ProtectedRoute } from '@/app/components/ProtectedRoute';
import AddProductForm from './AddProductForm';
import styles from './products.module.css';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category_name: string;
}

interface Category {
  id: number;
  name: string;
}

function ProductsContent() {
  const { data: session } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sellerId, setSellerId] = useState<number | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Get current seller from session
      const sellerRes = await fetch('/api/current-seller');
      if (!sellerRes.ok) {
        console.error('Failed to fetch current seller');
        return;
      }
      
      const seller = await sellerRes.json();
      setSellerId(seller.id);

      // Fetch products for this seller
      const productsRes = await fetch(`/api/seller-products?sellerId=${seller.id}`);
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData);
      }

      // Fetch categories
      const categoriesRes = await fetch('/api/categories');
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json();
        setCategories(categoriesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    fetchData(); // Refresh the products list
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Refresh the products list
      fetchData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting the product. Please try again.');
    }
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (showForm && sellerId) {
    return (
      <AddProductForm
        categories={categories}
        sellerId={sellerId}
        onCancel={() => setShowForm(false)}
        onSuccess={handleFormSuccess}
      />
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Products</h1>
        <button onClick={() => setShowForm(true)} className={styles.addButton}>
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You don't have any products yet.</p>
          <button onClick={() => setShowForm(true)} className={styles.addButton}>
            Add your first product
          </button>
        </div>
      ) : (
        <div className={styles.productGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <button 
                onClick={() => handleDeleteProduct(product.id)}
                className={styles.deleteButton}
                title="Delete product"
              >
                ×
              </button>
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

export default function Products() {
  return (
    <ProtectedRoute>
      <ProductsContent />
    </ProtectedRoute>
  );
}
