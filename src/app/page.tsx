import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import ProductCard from "./components/ProductCard";


export default function Home() {

  const products = [
    {
      id: 1,
      name: "Bracelet",
      image: "/products/Handcrafted.jpg",
    },
    {
      id: 2,
      name: "Origami",
      image: "/products/origami.jpg",
    },
    {
      id: 3,
      name: "Fabric Cambaya",
      image: "/products/ponchos.jpg",
    },
  ];

  return (
    <div className={styles.page}>
      <nav>
        <Image alt="Handcrafted Haven logo" src={"/logo.png"} width={100} height={100} />
        <h1>Handcrafted Haven</h1>
        <Link href={''}>Home</Link>
        <Link href={''}>Profiles</Link>
        <Link href={''}>Log In</Link>
        <Link href={''}>Cart</Link>
      </nav>
      <main>
        <div className="grid grid-cols-3 gap-6 mt-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </main>
      <footer className={styles.footer}>WDD430 - Handcrafted Haven</footer>
    </div>
  );
}
