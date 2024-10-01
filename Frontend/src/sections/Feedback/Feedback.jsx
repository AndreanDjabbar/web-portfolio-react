import { useState } from 'react';
import styles from './FeedbackStyles.module.css';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Perbarui formData
    setFormData({ ...formData, [name]: value });

    // Hapus error yang relevan saat pengguna mulai mengetik
    if (name === 'name' && value.length >= 3) {
      setErrors((prevErrors) => ({ ...prevErrors, name: '' }));
    } else if (name === 'email' && value.includes('@') && value.includes('.com')) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    } else if (name === 'message' && value) {
      setErrors((prevErrors) => ({ ...prevErrors, message: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = { name: '', email: '', message: '' };
  
    // Validasi
    if (formData.name.length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }
    if (!formData.email.includes('@') || !formData.email.includes('.com')) {
      newErrors.email = 'Email must contain @ and end with .com.';
    }
    if (!formData.message) {
      newErrors.message = 'Message is required.';
    }
  
    // Jika ada kesalahan, set error dan tidak lanjutkan
    if (newErrors.name || newErrors.email || newErrors.message) {
      setErrors(newErrors);
      return; // Keluar dari fungsi jika ada error
    }
  
    // Jika tidak ada kesalahan, kirim data ke server
    try {
      const response = await fetch('https://andrean-portfolio-backend-production.up.railway.app/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); 
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error sending the message');
    }
  };
  

  return (
    <section id="feedback" className={styles.container}>
      <h1 className="sectionTitle">Submit Your Feedback</h1>
      <form onSubmit={handleSubmit}>
        <div className={`formGroup ${errors.name ? styles.error : ''}`}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div className={styles['error-message']}>{errors.name}</div>}
        </div>
        <div className={`formGroup ${errors.email ? styles.error : ''}`}>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div className={styles['error-message']}>{errors.email}</div>}
        </div>
        <div className={`formGroup ${errors.message ? styles.error : ''}`}>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          {errors.message && <div className={styles['error-message']}>{errors.message}</div>}
        </div>
        <input className="hover btn" type="submit" value="Submit" />
      </form>
    </section>
  );
}

export default Contact;
