"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./cartPage.module.css";

interface Product {
  name: string;
  price: number;
  image: string;
}

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const numericCart = storedCart.map((item: any) => ({
      ...item,
      price: Number(item.price),
    }));
    setCart(numericCart);
  }, []);

  // Remove item
  const handleRemove = (index: number) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate total
  const total = cart.reduce((sum, p) => sum + p.price, 0);

  // Go to checkout
  const handleCheckout = () => {
    if (cart.length > 0) {
      router.push("/checkout");
    } else {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className={styles.empty}>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((p, index) => (
            <div key={index} className={styles.cartItem}>
              <Image
                src={p.image}
                alt={p.name}
                width={100}
                height={100}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <h3 className={styles.itemName}>{p.name}</h3>
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

          <div className={styles.total}>Total: ${total.toFixed(2)}</div>
        </div>
      )}

      {/* Checkout Button */}
      <button
        onClick={handleCheckout}
        className={`${styles.checkoutBtn} ${
          cart.length === 0 ? styles.disabled : ""
        }`}
      >
        Proceed to Checkout
      </button>

      {/* Alert (toast) */}
      {showAlert && <div className={styles.alert}>⚠️ Add at least one item to continue</div>}
    </div>
  );
}
