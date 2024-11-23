import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';
import { Bar } from 'react-chartjs-2';
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

const Analytics = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}api/shops/categories/stats`);
        setStats(response.data);
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
    <div className="analytics">
      <h2>Analyse des annonces</h2>
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

export default Analytics;
