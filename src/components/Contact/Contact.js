import React, { useState } from 'react';
import styles from "./Contact.module.css"

const Contact = () => {
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'message') setMessage(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    // Simulate form submission success
    setStatus('Your message has been sent! We will get back to you soon.');

    // Optionally, reset form fields after submission
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section id="contact" className={styles.contact}>
      <h2>Contact Us</h2>

      <form className={styles.contactform} onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={message}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Message</button>
      </form>

      {status && <p className={styles.statusmessage}>{status}</p>}

      <h6>Find us on email: <a href="mailto:JobVibe@gmail.com">JobVibe@gmail.com</a></h6>
      <h6>Phone number: <a href="tel:+254712456789">0712 456 789</a> or <a href="tel:+25412234900">012 234 900</a></h6>
      <h6>Find us on Instagram: <a href="https://www.instagram.com/JobVibeOfficial" target="_blank" rel="noopener noreferrer">JobVibe Official</a></h6>
    </section>
  );
};

export default Contact;

