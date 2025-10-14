'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import styles from '../profile.module.css';

export default function SellerDashboardRedirectPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (session?.user && !session.user.seller?.github_id) {
      router.push('/complete-profile');
      return;
    }

    if (session?.user?.seller?.github_id) {
      router.push(`/sellerDashboard/${session.user.seller.github_id}`);
    }
  }, [session, status, router]);

  return (
    <ProtectedRoute>
      <p className={styles.loadingText}>Redirecting to your dashboard...</p>
    </ProtectedRoute>
  );
}
