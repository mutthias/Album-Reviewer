import Link from 'next/link';
import styles from './Footer.module.scss';

const links = [
  {
    name: 'Home',
    slug: '/',
  },
  {
    name: 'About Us',
    slug: '/about',
  },
  {
    name: 'Something Else',
    slug: '/smth',
  },
  {
    name: 'Contact Us',
    slug: '/contact',
  },
];

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div className={styles.description}>
          <h2>Platform Team Demo</h2>
          <p>
            This footer was designed so that you can practice writing efficient
            HTML/CSS while getting familiar with our codebase.
          </p>
        </div>
        <div className={styles.navigation}>
          <div className={styles.learn_more}>
            <h2>Learn more</h2>
            <div className={styles.learn_more_links}>
              {links.map((link) => {
                return (
                  <Link key={link.slug} href={link.slug}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.projects}>
            <h2>Projects</h2>
            <div className={styles.project_link_columns}>
              <div>
                {/* Should be done with a loop */}
                <Link href="/project/1">Project 1</Link>
                <Link href="/project/2">Project 2</Link>
                <Link href="/project/3">Project 3</Link>
              </div>
              <div>
                {/* Should be done with a loop */}
                <Link href="/project/4">Project 4</Link>
                <Link href="/project/5">Project 5</Link>
                <Link href="/project/6">Project 6</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className={styles.credit}>
        Designed & develped with 🤍 by #include at Davis @2023
      </p>
    </div>
  );
}
