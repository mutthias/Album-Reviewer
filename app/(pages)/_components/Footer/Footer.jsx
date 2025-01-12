import Link from 'next/link';
import styles from './Footer.module.scss';

export default function Footer({ navLinks }) {
  return (
    <div className={styles.container}>
      <div className={styles.content_container}>
        <div className={styles.description}>
          <h2>Spotify Album Logger</h2>
          <p>
            A way for me to track albums I like and leave my thoughts on them :)
          </p>
        </div>
        <div className={styles.navigation}>
          <div className={styles.learn_more}>
            <h2>Other Links</h2>
            <div className={styles.learn_more_links}>
              {navLinks.map((link) => {
                return (
                  <Link key={link.slug} href={link.slug}>
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className={styles.projects}>
            <h2>Socials</h2>
            <div className={styles.project_link_columns}>
              <div>
                <Link href="https://www.linkedin.com/in/matthias-gabel">LinkedIn</Link>
                <Link href="https://www.github.com/mutthias">Github</Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
}
