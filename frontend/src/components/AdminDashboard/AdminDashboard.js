import React from 'react';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Overview from './Overview';
import ShopManagement from './ShopManagement';
import Analytics from './Analytics';

const AdminDashboard = () => {
  return (
    <div>
      <div className="admin-dashboard">
        <Sidebar />
        <div className="main-content">
          <Topbar />
          <Overview />
          <ShopManagement />
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
