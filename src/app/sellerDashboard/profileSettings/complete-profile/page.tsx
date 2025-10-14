"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Seller } from "@/app/lib/data";
import styles from "./CompleteProfileForm.module.css";

export default function CompleteProfilePage() {
  const router = useRouter();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [location, setLocation] = useState("");
  const [craft, setCraft] = useState("");
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch current seller on mount
  useEffect(() => {
    async function fetchSeller() {
      try {
        const res = await fetch("/api/current-seller", { cache: "no-store" });

        if (!res.ok) {
          throw new Error("Failed to fetch seller");
        }

        const data: Seller = await res.json();
        setSeller(data);
        setLocation(data.location || "");
        setCraft(data.craft || "");
        setStory(data.story || "");
      } catch (error) {
        console.error(error);
        router.push("/login"); // redirect if not authorized
      }
    }

    fetchSeller();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/current-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location, craft, story }),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      router.push("/sellerDashboard"); // redirect after saving
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
      setLoading(false);
    }
  };

  if (!seller) return <p>Loading...</p>;

  return (
    <div className={styles.formContainer}>
      <h1>Complete Your Profile</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
        <label htmlFor="location">Location</label>
          <input
            type="text"
            value={location}
            name="location"
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            required
          />
        
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="craft">Craft</label>
          <input
            type="text"
            value={craft}
            name="craft"
            onChange={(e) => setCraft(e.target.value)}
            placeholder="What do you do?"
            required
          />
        </div>

        <div className={styles.formGroup}>
        <label htmlFor="story">Your Story</label>
        <textarea
          id="story"
          value={story}
          name="story"
          onChange={(e) => setStory(e.target.value)}
          placeholder="Tell us about your craft, your journey, or your shop..."
          rows={4}
        />
        </div>
        
        <button
          type="submit"
          disabled={loading}
          className="submitButton"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}