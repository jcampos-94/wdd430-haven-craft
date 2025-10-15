'use client';
import { useEffect, useState } from 'react';

export type CartItem = {
  name: string;
  price: number;
  image: string;
  qty?: number;
};

export function useLocalCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]';
    try {
      const parsed: any[] = JSON.parse(raw);
      const normalized = parsed.map((it) => ({
        name: it.name,
        price: Number(it.price),
        image: it.image,
        qty: it.qty ? Number(it.qty) : 1,
      }));
      setItems(normalized);
    } catch {
      setItems([]);
    }
  }, []);

  const subtotal = items.reduce((acc, it) => acc + it.price * (it.qty ?? 1), 0);

  function clear() {
    setItems([]);
    localStorage.removeItem("cart");
  }

  return { items, subtotal, clear };
}
