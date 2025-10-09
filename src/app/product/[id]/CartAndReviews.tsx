'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './ProductPage.module.css';

export default function CartAndReviews({ product }: { product: any }) {
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [reviews, setReviews] = useState<
    { rating: number; review: string; reviewer: string; date: string }[]
  >([]);

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    currentCart.push(product);
    localStorage.setItem('cart', JSON.stringify(currentCart));
    router.push('/cart');
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !review || !reviewer) {
      alert('Please complete all fields before submitting your review.');
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
    <>
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
                <p>
                  <strong>{r.reviewer}</strong> ({r.date})
                </p>
                <p>{'⭐'.repeat(r.rating)}</p>
                <p>{r.review}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
