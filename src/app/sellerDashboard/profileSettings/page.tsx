"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ProtectedRoute } from "@/app/components/ProtectedRoute";
import styles from "./settings.module.css";

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
          setIsProfileComplete(!!data.location && !!data.craft && !!data.story);
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
      <div className={styles.container}>
        <h1>Profile Settings</h1>
        <div className={styles.conditional}>
          <p>Complete account information for your Seller Profile here.</p>
          <Link
              href="/sellerDashboard/profileSettings/complete-profile"
              className={styles.button}
            >
              Complete Profile
            </Link>
          
          {isProfileComplete === true && (
            <p className={styles.complete}>
              ✅ Your profile is complete!
            </p>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
