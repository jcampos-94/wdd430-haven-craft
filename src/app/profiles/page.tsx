"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../profile.module.css";

export default function ProfileInfo() {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const artisans = [
    {
      name: "Sarah Cox",
      craft: "Ceramic Pottery",
      location: "Utah, USA",
      image: "/images/poterry.webp",
    },
    {
      name: "Maria Santos",
      craft: "Handwoven Textiles",
      location: "Cebu, Philippines",
      image: "/images/handwoven.webp",
    },
    {
      name: "Aisha Aliezar",
      craft: "Jewelry Making",
      location: "Marrakesh, Morocco",
      image: "/images/jewelry-making.jpeg",
    },
  ];

  const updates = [
    {
      title: "New Collection: Autumn Designs",
      date: "Sept 15, 2025",
      description: "Discover warm colors and cozy patterns inspired by fall.",
    },
    {
      title: "Community Workshop",
      date: "Oct 1, 2025",
      description: "Join our live crafting session and learn directly from artisans.",
    },
    {
      title: "Collaboration with Local Farmers",
      date: "Oct 12, 2025",
      description: "Supporting sustainability with locally sourced raw materials.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setComments([input, ...comments]);
    setInput("");
  };

  return (
    <section className={styles.section}>
      {/* Artisan Profiles */}
      <article className={styles.card}>
        <h2>👩‍🎨 Artisan Profiles</h2>
        <p>Meet our talented artisans! Each profile showcases their story, craft, and featured items.</p>
        <div className={styles.artisans}>
          {artisans.map((artisan, i) => (
            <div key={i} className={styles.artisan}>
              <Image
                src={artisan.image}
                alt={`${artisan.name} specializes in ${artisan.craft}`}
                width={400}
                height={200}
              />
              <h3>{artisan.name}</h3>
              <p>{artisan.craft}</p>
              <p>{artisan.location}</p>
            </div>
          ))}
        </div>
      </article>

      {/* Become a Seller */}
      <div style={{ textAlign: "center" }}>
        <Link href="/becomeSeller">
          <button className={styles.sellerBtn}>Become a Seller</button>
        </Link>
      </div>

      {/* Crafting Process */}
      <article className={styles.card}>
        <h2>🛠️ Crafting Process</h2>
        <p>
          Every creation begins with carefully sourced materials. From hand-selecting raw resources to the
          final polish, our process emphasizes sustainability and authenticity.
        </p>
        <div className={styles.processGrid}>
          <div>
            <span>🌱</span>
            <h4>Sourcing</h4>
            <p>Eco-friendly raw materials</p>
          </div>
          <div>
            <span>🔨</span>
            <h4>Crafting</h4>
            <p>Handmade with precision</p>
          </div>
          <div>
            <span>📦</span>
            <h4>Finishing</h4>
            <p>Polish & quality check</p>
          </div>
        </div>
      </article>

      {/* Customer Engagement */}
      <article className={styles.card}>
        <h2>💬 Customer Engagement</h2>
        <p>Share your thoughts, suggestions, or experiences with our artisans!</p>
        <form onSubmit={handleSubmit} className={styles.commentForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentBtn}>
            🚀 Post
          </button>
        </form>
        <div>
          {comments.length === 0 ? (
            <p style={{ color: "#888" }}>No comments yet. Be the first!</p>
          ) : (
            comments.map((c, i) => (
              <div key={i} className={styles.comment}>
                <span>💡</span>
                <p>{c}</p>
              </div>
            ))
          )}
        </div>
      </article>

      {/* Community & Updates */}
      <article className={styles.card}>
        <h2>🌍 Community & Updates</h2>
        <p>Stay updated with our latest collections, collaborations, and community projects.</p>
        <ul className={styles.updates}>
          {updates.map((u, i) => (
            <li key={i}>
              <h4>{u.title}</h4>
              <p className={styles.date}>{u.date}</p>
              <p>{u.description}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}