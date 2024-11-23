import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';

const Overview = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/shops/categories/stats`);
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Chargement des statistiques...</div>;

  return (
    <div className="overview">
      <h2>Vue d'ensemble</h2>
      <div>
        <p>Total des avis : {stats.totalReviews}</p>
        <p>Total des visiteurs : {stats.totalVisitors}</p>
        <p>Nouvelles annonces cette semaine : {stats.newAnnouncements}</p>
        <p>Nombre d'annonces la semaine dernière : {stats.announcementsLastWeek}</p>
        <p>Moyenne des avis (nouvelles boutiques) : {stats.avgReviewsNewShops.toFixed(1)}</p>
        <p>Moyenne des avis (anciennes boutiques) : {stats.avgReviewsOldShops.toFixed(1)}</p>
      </div>
    </div>
  );
};

export default Overview;
