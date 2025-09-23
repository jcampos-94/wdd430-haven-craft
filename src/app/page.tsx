import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.page}>
        <Image alt="logo" src={''} width={1} height={2} />
      <main>
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
