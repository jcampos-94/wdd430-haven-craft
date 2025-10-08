"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../profile.module.css";
import { ProtectedRoute } from "../components/ProtectedRoute";

function SellerDashboard() {
  const [comments, setComments] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setComments([input, ...comments]);
    setInput("");
  };

  const updates = [
    {
      title: "New Product Added: Autumn Bracelet",
      date: "Oct 5, 2025",
      description: "A warm-toned handcrafted bracelet now available!",
    },
    {
      title: "Community Craft Fair",
      date: "Oct 20, 2025",
      description: "Showcase your creations and connect with artisans.",
    },
  ];

  return (
    <section className={styles.sellerDashboard}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div>
          <h2 className={styles.sidebarTitle}>Seller Menu</h2>
          <nav className={styles.navLinks}>
            <Link href="/sellerDashboard" className={styles.navLink}>🏠 Dashboard</Link>
            <Link href="/product" className={styles.navLink}>🛍️ Products</Link>
            <Link href="/orders" className={styles.navLink}>📦 Orders</Link>
            <Link href="/profileSettings" className={styles.navLink}>👤 Profile & Settings</Link>
            <Link href="/reviews" className={styles.navLink}>💬 Customer Feedback</Link>
          </nav>
        </div>
        <div className={styles.footerNote}>
          <p>© 2025 HavenCraft</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.profilePic}>
            <Image src="/images/artisan-profile.png" alt="Seller profile" fill className={styles.profileImg} />
          </div>
          <div>
            <h1 className={styles.welcomeTitle}>
              Welcome back, Maria’s Handcrafted Jewelry!
            </h1>
            <p className={styles.welcomeText}>
              Your handcrafted creations inspire many. Here&apos;s your shop overview and updates.
            </p>
          </div>
        </header>

        {/* Dashboard Overview Cards */}
        <section className={styles.statsGrid}>
          {[
            { title: "Total Sales", value: "$2,340" },
            { title: "Pending Orders", value: "8" },
            { title: "Products", value: "24" },
            { title: "Messages", value: "12" },
          ].map((card, i) => (
            <div key={i} className={styles.statCard}>
              <h3>{card.title}</h3>
              <p>{card.value}</p>
            </div>
          ))}
        </section>

        {/* Shop Updates */}
        <section className={styles.updates}>
          <h2>📰 Shop Updates</h2>
          <ul>
            {updates.map((u, i) => (
              <li key={i}>
                <h4>{u.title}</h4>
                <p className={styles.date}>{u.date}</p>
                <p>{u.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Customer Feedback */}
        <section className={styles.feedback}>
          <h2>💬 Customer Feedback</h2>
          <p>Read reviews or respond to customer messages to improve your shop&apos;s reputation.</p>
          <form onSubmit={handleSubmit} className={styles.commentForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a reply or note..."
            />
            <button type="submit" className={styles.greenBtn}>🚀 Post</button>
          </form>

          <div className={styles.commentList}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>No messages yet. Be the first!</p>
            ) : (
              comments.map((c, i) => (
                <div key={i} className={styles.commentItem}>
                  <span>💡</span>
                  <p>{c}</p>
                </div>
              ))
            )}
          </div>
        </section>

        <div className={styles.centerButton}>
          <Link href="/products">
            <button className={styles.greenBtn}>Manage Products</button>
          </Link>
        </div>
      </main>
    </section>
  );
}

function SellerDashboardPage() {
  return (
    <ProtectedRoute>
      <SellerDashboard />
    </ProtectedRoute>
  );
}

export default SellerDashboardPage;
