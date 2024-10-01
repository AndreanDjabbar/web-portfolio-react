import React from 'react';
import styles from './ContactStyles.module.css'; 
import linkedinLight from '../../assets/linkedin2-light.svg';
import linkedinDark from '../../assets/linkedin2-dark.svg';
import emailLight from '../../assets/email-light.svg';
import emailDark from '../../assets/email-dark.svg';
import { useTheme } from '../../common/ThemeContext';

function Contact() {
  const { theme } = useTheme(); // Mengambil state theme dari context
  const emailIcon = theme === 'light' ? emailLight : emailDark;
  const linkedinIcon = theme === 'light' ? linkedinLight : linkedinDark;

  return (
    <section id="contact" className={`${styles.container} ${theme === 'light' ? styles.light : styles.dark}`}>
      <h1 className="sectionTitle">Contact Me</h1>
      <div className={styles.contactInfoUpperContainer}>
        <div className={styles.contactInfoContainer}>
          <a >
            <img src={emailIcon} alt="Email icon" className={`icon ${styles.contactIcon}`} />
          </a>
          <p>
            <a>
              Andreanjabar18@gmail.com
            </a>
          </p>
        </div>
        <div className={styles.contactInfoContainer}>
          <a href="https://www.linkedin.com/in/andrean-gusman-djabbar-5734b0276/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn icon" className={`icon ${styles.contactIcon}`} />
          </a>
          <p>
            <a href="https://www.linkedin.com/in/andrean-gusman-djabbar-5734b0276/" target="_blank" rel="noopener noreferrer">
              Andrean Gusman Djabbar
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
