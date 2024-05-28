import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><a href="#overview">Overview</a></li>
        <li><a href="#shop-management">Shop Management</a></li>
        <li><a href="#analytics">Analytics</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
