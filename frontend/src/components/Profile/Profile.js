import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../services/apiService';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}api/users/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile">
      <h1>{profile.firstName} {profile.lastName}</h1>
      <img 
        src={profile.profileImage} 
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/150/000000/FFFFFF/?text=No+Profile+Image';
        }} 
        alt="Profile" 
      />
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
      <button onClick={() => navigate('/profile/update')}>Modifier le Profil</button>
    </div>
  );
};

export default Profile;
