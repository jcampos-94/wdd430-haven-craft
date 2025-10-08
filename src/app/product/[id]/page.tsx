'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../ProductPage.module.css';
import { products } from '../../data/products';
import { useState } from 'react';

export default function ProductPage() {
  const { id } = useParams(); // obtiene el ID dinámico de la URL
  const router = useRouter();

  // busca el producto por id
  const product = products.find((p) => p.id.toString() === id);

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [reviews, setReviews] = useState<
    { rating: number; review: string; reviewer: string; date: string }[]
  >([]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(product);
    localStorage.setItem("cart", JSON.stringify(currentCart));
    router.push("/cart");
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review || !reviewer) {
      alert("Please complete all fields before submitting your review.");
      return;
    }
    const newReview = {
      rating,
      review,
      reviewer,
      date: new Date().toLocaleDateString(),
    };
    setReviews((prev) => [...prev, newReview]);
    setRating(0);
    setReview('');
    setReviewer('');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{product.name}</h1>

      <div className={styles.content}>
        {/* Left: Image */}
        <div className={styles.imageWrapper}>
          <Image
            src={product.image}
            alt={`Image of ${product.name}`}
            width={334}
            height={400}
            className={styles.desktopImage}
          />
        </div>

        {/* Right: Info */}
        <div className={styles.info}>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>{product.price}</p>
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>

          {/* --- Review Form --- */}
          <div className={styles.reviewSection}>
            <h2>Leave a Review</h2>
            <form onSubmit={handleSubmitReview} className={styles.reviewForm}>
              <label>
                Rating:
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="">Select...</option>
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} ⭐
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Your Name:
                <input
                  type="text"
                  value={reviewer}
                  onChange={(e) => setReviewer(e.target.value)}
                  placeholder="Enter your name"
                />
              </label>

              <label>
                Review:
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your feedback..."
                />
              </label>

              <button type="submit" className={styles.submitButton}>
                Submit Review
              </button>
            </form>

            {/* --- Reviews List --- */}
            {reviews.length > 0 && (
              <div className={styles.reviewsList}>
                <h3>Customer Reviews</h3>
                {reviews.map((r, i) => (
                  <div key={i} className={styles.reviewCard}>
                    <p><strong>{r.reviewer}</strong> ({r.date})</p>
                    <p>{"⭐".repeat(r.rating)}</p>
                    <p>{r.review}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
