import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Overview from './Overview';
import ShopManagement from './ShopManagement';
import Analytics from './Analytics';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [key, setKey] = useState(0);

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
            <button onClick={() => setKey((prev) => prev + 1)}>Reload Analytics</button>
            <Analytics />
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
