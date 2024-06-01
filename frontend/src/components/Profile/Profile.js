import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
    <div className={`profile ${user.role}`}>
      <h1>Profile</h1>
      {user.profileImage && <img src={`../../../../backend/${user.profileImage}`} alt="Profile" className="profile-image" />}
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
      <p><strong>Role:</strong> {user.role}</p>
      <button onClick={() => navigate('/profile/update')}>Edit Profile</button>
    </div>
  );
};

export default Profile;
