'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../profile.module.css';

export default function ProfileInfo({ sellers }: { sellers: any[] }) {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [showSellerForm, setShowSellerForm] = useState(false);

  const updates = [
    {
      title: 'New Collection: Autumn Designs',
      date: 'Sept 15, 2025',
      description: 'Discover warm colors and cozy patterns inspired by fall.',
    },
    {
      title: 'Community Workshop',
      date: 'Oct 1, 2025',
      description:
        'Join our live crafting session and learn directly from artisans.',
    },
    {
      title: 'Collaboration with Local Farmers',
      date: 'Oct 12, 2025',
      description:
        'Supporting sustainability with locally sourced raw materials.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setComments([input, ...comments]);
    setInput('');
  };

  const handleSellerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSellerForm(false);
    alert('Your seller application has been submitted!');
  };

  return (
    <section className={styles.profileSection}>
      {/*Header*/}
      <article className={styles.card}>
        <div className={styles.headerRow}>
          <h1>Artisan Profiles</h1>
        </div>
        <p>
          Meet our talented artisans! Each profile showcases their story, craft,
          and featured items.
        </p>

        <div className={styles.grid}>
          {sellers.map((artisan) => (
            <div key={artisan.id} className={styles.artisanCard}>
              <div className={styles.imageWrapper}>
                <Image
                  src={artisan.profile_image}
                  alt={artisan.name}
                  width={400}
                  height={300}
                  className={styles.image}
                />
              </div>
              <h2>{artisan.name}</h2>
              <p className={styles.craft}>{artisan.craft}</p>
              <p className={styles.location}>{artisan.location}</p>
              {/* Link to Seller Dashboard not profile */}
              <Link href={`/sellerDashboard/${artisan.id}`}>
                <button className={styles.viewBtn}>View Profile</button>
              </Link>
            </div>
          ))}
        </div>
      </article>

      {/*Crafting*/}
      <article className={styles.card}>
        <h2>Crafting Process</h2>
        <p>
          Every creation begins with carefully sourced materials emphasizing
          sustainability and authenticity.
        </p>

        <div className={styles.processGrid}>
          <div>
            <span className={styles.icon}>🌱</span>
            <h3>Sourcing</h3>
            <p>Eco-friendly raw materials</p>
          </div>
          <div>
            <span className={styles.icon}>🔨</span>
            <h3>Crafting</h3>
            <p>Handmade with precision</p>
          </div>
          <div>
            <span className={styles.icon}>📦</span>
            <h3>Finishing</h3>
            <p>Polish & quality check</p>
          </div>
        </div>
      </article>

      {/*Cx Engagement*/}
      <article className={styles.card}>
        <h2>Customer Engagement</h2>
        <p>Share your thoughts or experiences with our artisans!</p>

        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
          />
          <button type="submit" className={styles.postBtn}>
            🚀 Post
          </button>
        </form>

        <div className={styles.commentList}>
          {comments.length === 0 ? (
            <p className={styles.noComments}>No comments yet. Be the first!</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className={styles.commentItem}>
                <span>💡</span>
                <p>{c}</p>
              </div>
            ))
          )}
        </div>
      </article>

      {/*Community Updates*/}
      <article className={styles.card}>
        <h2>Community & Updates</h2>
        <ul className={styles.updateList}>
          {updates.map((u, i) => (
            <li key={i}>
              <h3>{u.title}</h3>
              <p className={styles.updateDate}>{u.date}</p>
              <p>{u.description}</p>
            </li>
          ))}
        </ul>
      </article>

      {/*Seller Form*/}
      {showSellerForm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <button
              onClick={() => setShowSellerForm(false)}
              className={styles.closeBtn}
            >
              &times;
            </button>
            <h2>🛍️ Become a Seller</h2>
            <form onSubmit={handleSellerSubmit}>
              <label>
                Shop Name
                <input type="text" required placeholder="e.g. Maria’s Shop" />
              </label>
              <label>
                Profile Picture
                <input type="file" accept="image/*" />
              </label>
              <label>
                Short Description
                <textarea required placeholder="Describe your shop..." />
              </label>
              <div className={styles.modalButtons}>
                <button
                  type="button"
                  onClick={() => setShowSellerForm(false)}
                  className={styles.cancelBtn}
                >
                  Cancel
                </button>
                <button type="submit" className={styles.submitBtn}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
