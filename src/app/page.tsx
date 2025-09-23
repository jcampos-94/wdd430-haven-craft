import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <nav className={styles.nav}>
        <Image
          alt="Handcrafted Haven logo"
          src={"/logo.png"}
          width={80}
          height={80}
        />
        <h1>Handcrafted Haven</h1>
        <div className={styles.navLinks}>
          <Link href={''}>Home</Link>
          <Link href={''}>Profiles</Link>
          <Link href={''}>Log In</Link>
          <Link href={''}>Cart</Link>
        </div>
      </nav>

      <main className={styles.main}>
        <Image alt="" src={''} width={1} height={2} />
        <div>
          <div id="product-card"></div>
          <div id="product-card"></div>
          <div id="product-card"></div>
        </div>
      </main>
    </div>
  );
}