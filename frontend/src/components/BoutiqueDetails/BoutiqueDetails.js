import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './BoutiqueDetails.css';

const BoutiqueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [review, setReview] = useState({ name: '', email: '', comment: '', quality: '', location: '', price: '', service: '' });

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Redirigez vers la page de connexion si pas de token
          return;
        }
        const response = await axios.get(`/api/shops/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShop(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shop details:', error);
        setLoading(false);
      }
    };

    fetchShop();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/api/shops/${id}/reviews`, review, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Log the response for debugging
      console.log("Review submitted successfully:", response.data);

      // Réinitialisez le formulaire après soumission
      setReview({ name: '', email: '', comment: '', quality: '', location: '', price: '', service: '' });

      // Rechargez les détails de la boutique pour afficher le nouveau commentaire
      const updatedShop = await axios.get(`/api/shops/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShop(updatedShop.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!shop) return <div>Shop not found.</div>;

  return (
    <div className="boutique-details">
      <h1>{shop.name}</h1>
      <p>{shop.description}</p>
      <div className="contact-info">
        <p><strong>Address:</strong> {shop.address}</p>
        <p><strong>Phone:</strong> {shop.phone}</p>
        <p><strong>Email:</strong> {shop.email}</p>
        <p><strong>Website:</strong> <a href={shop.website} target="_blank" rel="noopener noreferrer">{shop.website}</a></p>
      </div>
      <div className="categories">
        {shop.categories.map((category, index) => (
          <span key={index} className="category">{category}</span>
        ))}
      </div>
      <div className="gallery">
        {shop.photos.map((photo, index) => (
          <img key={index} src={photo} alt={`${shop.name} ${index}`} />
        ))}
      </div>
      <div className="reviews">
        <h2>Reviews</h2>
        {shop.reviews.map((review, index) => (
          <div key={index} className="review">
            <p><strong>{review.name}</strong></p>
            <p>Quality: {review.quality}</p>
            <p>Location: {review.location}</p>
            <p>Price: {review.price}</p>
            <p>Service: {review.service}</p>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className="add-review">
        <h2>Add Review</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={review.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={review.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="comment"
            value={review.comment}
            onChange={handleChange}
            placeholder="Your Review"
            required
          />
          <input
            type="number"
            name="quality"
            value={review.quality}
            onChange={handleChange}
            placeholder="Quality (1-5)"
            min="1"
            max="5"
            required
          />
          <input
            type="number"
            name="location"
            value={review.location}
            onChange={handleChange}
            placeholder="Location (1-5)"
            min="1"
            max="5"
            required
          />
          <input
            type="number"
            name="price"
            value={review.price}
            onChange={handleChange}
            placeholder="Price (1-5)"
            min="1"
            max="5"
            required
          />
          <input
            type="number"
            name="service"
            value={review.service}
            onChange={handleChange}
            placeholder="Service (1-5)"
            min="1"
            max="5"
            required
          />
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default BoutiqueDetails;
