import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService'; // Import de l'URL de base
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);

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
        console.error('Error fetching profile:', error.response?.data?.message || error.message);
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
      <img src={`${API_BASE_URL}/${profile.profileImage}`} alt="Profile" />
      <p>Email: {profile.email}</p>
      <p>Role: {profile.role}</p>
    </div>
  );
};

export default Profile;
