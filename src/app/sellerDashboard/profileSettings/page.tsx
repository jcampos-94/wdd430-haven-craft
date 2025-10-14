"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";

export default function ProfileSettings() {
  const [isProfileComplete, setIsProfileComplete] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch current seller info
    const fetchSeller = async () => {
      try {
        const res = await fetch("/api/current-seller", {
          cache: "no-store",
          credentials: "include",
        });
        const data = await res.json();
        if (res.ok && data) {
          setIsProfileComplete(!!data.location && !!data.craft);
        } else {
          setIsProfileComplete(false);
        }
      } catch (err) {
        console.error("Failed to fetch seller", err);
        setIsProfileComplete(false);
      }
    };

    fetchSeller();
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Settings</h1>
        <p className="mb-4">
          Complete account information for your Seller Profile here.
        </p>

        {isProfileComplete === false && (
          <Link
            href="/sellerDashboard/profileSettings/complete-profile"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Complete Profile
          </Link>
        )}

        {isProfileComplete === true && (
          <p className="text-green-600 font-medium">
            ✅ Your profile is complete!
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
}
