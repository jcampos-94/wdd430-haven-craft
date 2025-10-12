'use client';
import { useEffect, useState } from 'react';

export type CartItem = {
  name: string;
  price: number;
  image: string;
  qty?: number; // si no existe en tu cart, se asume 1
};

export function useLocalCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('cart') || '[]';
    const parsed: any[] = JSON.parse(raw);
    const normalized = parsed.map((it) => ({
      name: it.name,
      price: Number(it.price),
      image: it.image,
      qty: it.qty ? Number(it.qty) : 1,
    }));
    setItems(normalized);
  }, []);

  const subtotal = items.reduce((acc, it) => acc + it.price * (it.qty ?? 1), 0);
  return { items, subtotal };
}
