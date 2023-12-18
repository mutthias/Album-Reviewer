import Image from 'next/image';
import Link from 'next/link';

import { BsArrowRight } from 'react-icons/bs';

import styles from './Hero.module.scss';

export default function Hero() {
  return (
    <div className={styles.container}>
      <div className={styles.img_container}>
        <Image
          src="/root/city.jpg"
          alt="serene forest scene in the night"
          fill
          style={{ objectFit: 'cover', opacity: '0.6' }}
        />
      </div>
      <div className={styles.welcome}>
        <h1>PLATFORM TEAM NEXT.JS TEMPLATE</h1>
      </div>
    </div>
  );
}
