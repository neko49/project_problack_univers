import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';
import { Bar } from 'react-chartjs-2';
import './AdminAnalytics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminAnalytics = () => {
  const [stats, setStats] = useState({});
  const [adminStats, setAdminStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Récupérer les statistiques générales des catégories
        const categoryStatsResponse = await axios.get(`${API_BASE_URL}api/shops/categories/stats`);
        setStats(categoryStatsResponse.data);

        // Récupérer les statistiques admin
        const adminStatsResponse = await axios.get(`${API_BASE_URL}api/shops/admin-analytics`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ajouter le token pour sécuriser l'accès
          },
        });
        setAdminStats(adminStatsResponse.data);
      } catch (error) {
        console.error('Error fetching analytics stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Chargement des données analytiques...</div>;

  return (
    <div className="admin-analytics">
      <h2>Dashboard Admin - Analyses</h2>

      {/* Section des métriques générales admin */}
      <div className="admin-summary">
        <h3>Statistiques globales</h3>
        <ul>
          <li>Total des clics : {adminStats.totalClicks || 0}</li>
          <li>Total des "J'aime" : {adminStats.totalLikes || 0}</li>
          <li>Total des favoris : {adminStats.totalFavorites || 0}</li>
        </ul>
      </div>

      {/* Section des statistiques détaillées par boutique */}
      <div className="shop-details">
        <h3>Statistiques par boutique</h3>
        {adminStats.analytics?.length > 0 ? (
          <ul>
            {adminStats.analytics.map((shop, index) => (
              <li key={index}>
                <strong>{shop.shopName}</strong> :
                <ul>
                  <li>Clics : {shop.clicks}</li>
                  <li>"J'aime" : {shop.likes}</li>
                  <li>Favoris : {shop.favorites}</li>
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune donnée disponible.</p>
        )}
      </div>

      {/* Graphique : Nouvelles annonces par catégorie */}
      <div className="chart">
        <Bar
          data={{
            labels: Object.keys(stats.newAnnouncementsByCategory || {}),
            datasets: [
              {
                label: 'Nouvelles annonces par catégorie',
                data: Object.values(stats.newAnnouncementsByCategory || {}),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Nouvelles annonces par catégorie (7 derniers jours)' },
            },
          }}
        />
      </div>

      {/* Graphique : Tendances des annonces */}
      <div className="chart">
        <Bar
          data={{
            labels: ['Cette semaine', 'Semaine dernière'],
            datasets: [
              {
                label: 'Nouvelles annonces',
                data: [stats.newAnnouncements, stats.announcementsLastWeek],
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: 'Tendances des annonces' },
            },
          }}
        />
      </div>
    </div>
  );
};

export default AdminAnalytics;
