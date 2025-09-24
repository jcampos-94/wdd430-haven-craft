"use client";
import { useSearchParams } from "next/navigation";

export default function CartPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const price = searchParams.get("price");

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4"> 🛒 Your Cart</h2>

      {!name ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="border p-4 rounded bg-gray-100">
          <h3 className="font-semibold">{name}</h3>
          <p>Price: ${price}</p>
        </div>
      )}
    </div>
  );
}
