'use client';

import Image from 'next/image';
import styles from './ProductPage.module.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductPage() {
  const router = useRouter();

  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [reviews, setReviews] = useState<
    { rating: number; review: string; reviewer: string; date: string }[]
  >([]);

  const handleAddToCart = () => {
    const newProduct = {
      name: "Wooden Owl",
      price: 49.99,
      image: "/images/filler_img_small.jpg",
    };
    const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    currentCart.push(newProduct);
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
    }

    setReviews((prev) => [...prev, newReview]);
    setRating(0);
    setReview('');
    setReviewer('');
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
