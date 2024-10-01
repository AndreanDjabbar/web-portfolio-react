import { useState } from 'react';
import styles from './NavigationStyles.module.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false); // Tutup menu saat link diklik
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.burger} onClick={toggleMenu}>
        <div className={`${styles.line} ${isOpen ? styles.active : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.active : ''}`}></div>
        <div className={`${styles.line} ${isOpen ? styles.active : ''}`}></div>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.open : ''}`}>
        <li>
          <a href="#hero" className={styles.navLink} onClick={handleLinkClick}>Home</a>
        </li>
        <li>
          <a href="#skills" className={styles.navLink} onClick={handleLinkClick}>Skills</a>
        </li>
        <li>
          <a href="#projects" className={styles.navLink} onClick={handleLinkClick}>Projects</a>
        </li>
        <li>
          <a href="#contact" className={styles.navLink} onClick={handleLinkClick}>Contact</a>
        </li>
        <li>
          <a href="#feedback" className={styles.navLink} onClick={handleLinkClick}>Feedback</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
