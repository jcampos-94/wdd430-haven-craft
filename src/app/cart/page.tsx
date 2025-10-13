"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./cartPage.module.css";

interface Product {
  name: string;
  price: number;
  image_url: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");

    // 🔧 Convert prices to numbers
    const numericCart = storedCart.map((item: any) => ({
      ...item,
      price: Number(item.price),
    }));

    setCart(numericCart);
  }, []);

  // Remove one item from cart
  const handleRemove = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((p, index) => (
            <div key={index} className={styles.cartItem}>
              <Image
                src={p.image_url}
                alt={p.name}
                width={100}
                height={100}
                className={styles.itemImage}
              />

              <div className={styles.itemInfo}>
                <h2 className={styles.itemName}>{p.name}</h2>
                {/* ✅ Convert price to number safely */}
                <p className={styles.itemPrice}>
                  Price: ${Number(p.price).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemove(index)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className={styles.total}>Total: ${total.toFixed(2)}</div>
        </div>
      )}
    </div>
  );
}
