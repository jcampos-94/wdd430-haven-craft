import { ProtectedRoute } from '@/app/components/ProtectedRoute';

function ProductsContent() {
  return (
    <div>
      <h1>Products</h1>
      <p>You have no products yet.</p>
    </div>
  );
}

export default function Orders() {
  return (
    <ProtectedRoute>
      <ProductsContent />
    </ProtectedRoute>
  );
}
