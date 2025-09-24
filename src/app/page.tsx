// import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* <Image alt="" src="" width={1} height={2} /> */}
      <div>
        <div className="product-card"></div>
        <div className="product-card"></div>
        <div className="product-card"></div>
      </div>
    </main>
  );
}
