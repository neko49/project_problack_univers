import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile">
      <h1>Profile</h1>
      <p>Email: {user.email}</p>
      <p>Name: {user.firstName} {user.lastName}</p>
      <p>Role: {user.role}</p>
    </div>
  );
};

export default Profile;
