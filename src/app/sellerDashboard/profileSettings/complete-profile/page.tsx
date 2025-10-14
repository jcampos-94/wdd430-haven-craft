"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Seller {
  id: number;
  name: string;
  email: string;
  location?: string;
  craft?: string;
  profile_image?: string;
}

export default function CompleteProfilePage() {
  const router = useRouter();
  const [seller, setSeller] = useState<Seller | null>(null);
  const [location, setLocation] = useState("");
  const [craft, setCraft] = useState("");
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
        body: JSON.stringify({ location, craft }),
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
            className="border p-2 w-full mt-1 rounded"
            required
          />
        </label>

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