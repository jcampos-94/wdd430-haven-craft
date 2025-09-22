import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
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
        <Image alt="" src={''} width={1} height={2} />
        <div>
          <div id="product-card"></div>
          <div id="product-card"></div>
          <div id="product-card"></div>
        </div>
      </main>
      <footer className={styles.footer}>WDD430 - Handcrafted Haven</footer>
    </div>
  );
}
