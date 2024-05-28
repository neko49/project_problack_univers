import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Analytics.css';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/shops/analytics', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="analytics" id="analytics">
      <h2>Analytics</h2>
      <div className="chart">
        <Bar
          data={{
            labels: Object.keys(analytics.categoriesCount || {}),
            datasets: [
              {
                label: 'Nombre de boutiques par catégorie',
                data: Object.values(analytics.categoriesCount || {}),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
              }
            ]
          }}
          options={{ responsive: true }}
        />
      </div>
      <div className="chart">
        <Bar
          data={{
            labels: Object.keys(analytics.reviewsCount || {}),
            datasets: [
              {
                label: 'Nombre de commentaires par note',
                data: Object.values(analytics.reviewsCount || {}),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
              }
            ]
          }}
          options={{ responsive: true }}
        />
      </div>
    </div>
  );
};

export default Analytics;
