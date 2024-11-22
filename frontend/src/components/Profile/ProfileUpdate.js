import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import du hook pour rediriger
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService'; // Import de l'URL de base
import './ProfileUpdate.css';

const ProfileUpdate = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate(); // Hook de navigation

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${API_BASE_URL}api/users/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Profile updated successfully!');
      navigate('/profile'); // Redirige vers le profil après succès
    } catch (error) {
      console.error('Error updating profile:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="profile-update">
      <h1>Update Profile</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
