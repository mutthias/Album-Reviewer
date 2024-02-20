'use client';
import Link from 'next/link';
import { RxHamburgerMenu, RxCross2 } from 'react-icons/rx';
import Image from 'next/image';

import styles from './Navbar.module.scss';
import useToggle from '@hooks/useToggle';
import Logo from '../../../../public/index/relaxation.png'; 

export default function Navbar({ navLinks }) {
  const [active, toggleActive, _, setInactive] = useToggle(false);
  return (
    <div className={styles.relative_wrapper}>
      <div className={styles.container}>
        <Image className="logo" src={Logo} alt="Logo" />
        <div className={styles.nav_container}>
          <div className={`${styles.links} ${active ? styles.active : null}`}>
            {navLinks.map((link) => {
              return (
                <Link key={link.slug} href={link.slug} onClick={setInactive}>
                  {link.name}
                </Link>
              );
            })}
          </div>
          <button className={styles.menu} onClick={toggleActive}>
            {active ? <RxCross2 /> : <RxHamburgerMenu />}
          </button>
        </div>
      </div>
    </div>
  );
}
