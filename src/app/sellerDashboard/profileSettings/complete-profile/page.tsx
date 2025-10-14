"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Seller } from "@/app/lib/data";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>

      <form onSubmit={handleSubmit}>
        <label className="block mb-3">
          Location
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            className="border p-2 w-full mt-1 rounded"
            required
          />
        </label>

        <label className="block mb-3">
          Craft
          <input
            type="text"
            value={craft}
            onChange={(e) => setCraft(e.target.value)}
            placeholder="What do you do?"
            className="border p-2 w-full mt-1 rounded"
            required
          />
        </label>

        <label htmlFor="story">Your Story</label>
        <textarea
          id="story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          placeholder="Tell us about your craft, your journey, or your shop..."
          rows={4}
          className="border rounded p-2 w-full"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}