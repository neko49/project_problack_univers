import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Boutique.css';

const Boutique = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get('/api/shops'); // Pas besoin de jeton ici
        setShops(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shops:', error);
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (shops.length === 0) return <div>No shops available.</div>;

  return (
    <div className="boutique-list">
      <h1>Nos Boutiques</h1>
      <div className="shops">
        {shops.map((shop) => (
          <div key={shop._id} className="shop-item">
            <h2>{shop.name}</h2>
            <p>{shop.description}</p>
            <Link to={`/boutique/${shop._id}`}>Voir les détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boutique;
