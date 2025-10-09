import { ProtectedRoute } from '@/app/components/ProtectedRoute';

function ReviewsContent() {
  return (
    <div>
      <h1>Reviews and Ratings</h1>
      <p>Share your experience with Handcrafted Haven artisan.</p>
    </div>
  );
}

export default function Reviews() {
  return (
    <ProtectedRoute>
      <ReviewsContent />
    </ProtectedRoute>
  );
}
