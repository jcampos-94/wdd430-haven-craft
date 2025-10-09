import { ProtectedRoute } from '@/app/components/ProtectedRoute';

function OrdersContent() {
  return (
    <div>
      <h1>Orders</h1>
      <p>
        Track your recent purchases, check order status, and view shipment
        details here.
      </p>
    </div>
  );
}

export default function Orders() {
  return (
    <ProtectedRoute>
      <OrdersContent />
    </ProtectedRoute>
  );
}
