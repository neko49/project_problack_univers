import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/contact', formData);
      setSubmitted(true);
      setError('');
    } catch (error) {
      setError('There was an error sending your message. Please try again.');
    }
  };

  return (
    <div className="contact">
      <h1>Contactez Nous</h1>
      <div className="contact-info">
        <h2>Informations de Contact</h2>
        <p><strong>Téléphone:</strong> +44 7442 209086, +33 6 95 52 91 42</p>
        <p><strong>Email:</strong> contact@problacku.com, hello@problacku.com</p>
        <p><strong>Adresse:</strong> 71-75 Shelton Street, Covent Garden, London WC2 9JQ, United Kingdom</p>
        <p><strong>Médias Sociaux:</strong> @problackunivers</p>
      </div>
      <div className="contact-form">
        <h2>Envoyez Nous un Message</h2>
        {submitted ? (
          <p>Merci pour votre message. Nous vous répondrons sous peu.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Votre Nom"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Votre Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Votre Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <button type="submit">Envoyer</button>
          </form>
        )}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default Contact;
