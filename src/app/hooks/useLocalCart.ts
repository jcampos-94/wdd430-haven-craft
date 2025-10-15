'use client';
import { useEffect, useMemo, useState } from 'react';

export type CartItem = {
  name: string;
  price: number;
  image: string;
  qty?: number;
};

const STORAGE_KEY = 'cart';

function readCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '[]';
    const parsed: any[] = JSON.parse(raw);
    return parsed.map((it) => ({
      name: String(it.name),
      price: Number(it.price),
      image: String(it.image),
      qty: it?.qty ? Number(it.qty) : 1,
    }));
  } catch {
    return [];
  }
}

function writeCart(items: CartItem[]) {
  if (!items.length) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function useLocalCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    return readCart();
  });

  // ---- Sync on mount + tab changes + back/forward cache restores ----
  useEffect(() => {
    const sync = () => setItems(readCart());

    // 1) Otra pestaña modificó el carrito
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) sync();
    };
    window.addEventListener('storage', onStorage);

    // 2) Go back with BFCache o cambiar visibilidad
    const onPageShow = (e: PageTransitionEvent) => {
      // If coming from bfcache, persisted = true
      // Security sync
      sync();
    };
    const onVisibility = () => {
      if (document.visibilityState === 'visible') sync();
    };
    window.addEventListener('pageshow', onPageShow);
    document.addEventListener('visibilitychange', onVisibility);

    // 1st sync on mount
    sync();

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('pageshow', onPageShow);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // ---- Derived subtotal ----
  const subtotal = useMemo(
    () => items.reduce((acc, it) => acc + Number(it.price) * (it.qty ?? 1), 0),
    [items]
  );

  // ---- Mutations ----
  const add = (item: CartItem) => {
    setItems((prev) => {
      const i = prev.findIndex((p) => p.name === item.name);
      let next: CartItem[];
      if (i === -1) next = [...prev, { ...item, qty: item.qty ?? 1 }];
      else {
        next = [...prev];
        next[i] = { ...next[i], qty: (next[i].qty ?? 1) + (item.qty ?? 1) };
      }
      writeCart(next);
      return next;
    });
  };

  const setQty = (name: string, qty: number) => {
    setItems((prev) => {
      const next = prev.map((p) => (p.name === name ? { ...p, qty } : p));
      writeCart(next);
      return next;
    });
  };

  const remove = (name: string) => {
    setItems((prev) => {
      const next = prev.filter((p) => p.name !== name);
      writeCart(next);
      return next;
    });
  };

  const clear = () => {
    setItems([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return { items, subtotal, add, setQty, remove, clear };
}
