import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Overview from './Overview';
import ShopManagement from './ShopManagement';
import Analytics from './Analytics';
import AdminAnalytics from './AdminAnalytics';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [key, setKey] = useState(0);
  const [showAdminAnalytics, setShowAdminAnalytics] = useState(false); // État pour basculer entre les analyses

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-wrapper">
          <section id="overview">
            <Overview />
          </section>
          <section id="shop-management">
            <ShopManagement />
          </section>
          <section id="analytics" key={key}>
            <div className="analytics-toggle">
              <button onClick={() => setKey((prev) => prev + 1)}>Reload Analytics</button>
              <button onClick={() => setShowAdminAnalytics((prev) => !prev)}>
                {showAdminAnalytics ? 'Switch to General Analytics' : 'Switch to Admin Analytics'}
              </button>
            </div>
            {showAdminAnalytics ? <AdminAnalytics /> : <Analytics />}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
