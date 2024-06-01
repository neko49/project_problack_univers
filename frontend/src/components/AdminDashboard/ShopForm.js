import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ShopForm.css';

const ShopForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    categories: '',
    photos: '',
  });

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`/api/shops/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          const fetchedShop = response.data;
          // Transform categories and photos to string
          setShop({
            ...fetchedShop,
            categories: fetchedShop.categories.join(', '),
            photos: fetchedShop.photos.join(', '),
          });
        } catch (error) {
          console.error('Error fetching shop:', error);
        }
      };
      fetchShop();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop({ ...shop, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formattedShop = {
        ...shop,
        categories: shop.categories.split(',').map(category => category.trim()),
        photos: shop.photos.split(',').map(photo => photo.trim()),
      };
      if (id) {
        await axios.put(`/api/shops/${id}`, formattedShop, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('/api/shops', formattedShop, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      navigate('/admin/shop-management');
    } catch (error) {
      console.error('Error saving shop:', error);
    }
  };

  const handleCancel = () => {
    navigate('/admin/shop-management');
  };

  return (
    <div className="shop-form">
      <h2>{id ? 'Edit Shop' : 'Create Shop'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={shop.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          value={shop.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="address"
          value={shop.address}
          onChange={handleChange}
          placeholder="Address"
          required
        />
        <input
          type="text"
          name="phone"
          value={shop.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
        />
        <input
          type="email"
          name="email"
          value={shop.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="url"
          name="website"
          value={shop.website}
          onChange={handleChange}
          placeholder="Website"
          required
        />
        <input
          type="text"
          name="categories"
          value={shop.categories}
          onChange={handleChange}
          placeholder="Categories (comma separated)"
          required
        />
        <input
          type="text"
          name="photos"
          value={shop.photos}
          onChange={handleChange}
          placeholder="Photos (comma separated URLs)"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ShopForm;
