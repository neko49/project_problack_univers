import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';
import { Link } from 'react-router-dom';
import './ShopManagement.css';

const ShopManagement = () => {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}api/shops`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchShops();
  }, []);

  return (
    <div className="shop-management" id="shop-management">
      <h2>Shop Management</h2>
      <Link to="/admin/shop-form" className="btn btn-primary mb-3">Create New Shop</Link>
      {shops.length > 0 ? (
        shops.map((shop) => (
          <div key={shop._id} className="shop-item">
            <h4>{shop.name}</h4>
            <p>{shop.description}</p>
            <img src={shop.photos[0]} alt={shop.name} />
            <p><strong>Address:</strong> {shop.address}</p>
            <p><strong>Phone:</strong> {shop.phone}</p>
            <p><strong>Email:</strong> {shop.email}</p>
            <p><strong>Website:</strong> <a href={shop.website} target="_blank" rel="noopener noreferrer">{shop.website}</a></p>
            <Link to={`/admin/shop-form/${shop._id}`} className="btn btn-secondary mt-2">Edit Shop</Link>
          </div>
        ))
      ) : (
        <p>No shops available.</p>
      )}
    </div>
  );
};

export default ShopManagement;
