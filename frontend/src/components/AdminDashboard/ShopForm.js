import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';
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
  });
  const [photos, setPhotos] = useState([]); // Pour stocker les fichiers de photos

  useEffect(() => {
    if (id) {
      const fetchShop = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`${API_BASE_URL}api/shops/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const fetchedShop = response.data;
          // Transform categories to string
          setShop({
            ...fetchedShop,
            categories: fetchedShop.categories.join(', '),
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

  const handleFileChange = (e) => {
    setPhotos(e.target.files); // Mise à jour des fichiers
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('shop', JSON.stringify({
        ...shop,
        categories: shop.categories.split(',').map(category => category.trim()),
      }));
      Array.from(photos).forEach((photo) => {
        formData.append('photos', photo);
      });

      if (id) {
        await axios.put(`${API_BASE_URL}api/shops/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post(`${API_BASE_URL}api/shops`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          type="file"
          name="photos"
          multiple
          onChange={handleFileChange}
          accept="image/*"
        />
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default ShopForm;
