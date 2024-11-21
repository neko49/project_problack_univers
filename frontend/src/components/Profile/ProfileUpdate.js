import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileUpdate.css';

const ProfileUpdate = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      setFormData({
        email: response.data.email,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
      });
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const form = new FormData();
    form.append('email', formData.email);
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    if (profileImage) {
      form.append('profileImage', profileImage);
    }

    try {
      await axios.put('/api/users/profile', form, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      window.location.reload(); // Rafraîchir la page pour voir les modifications
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className={`profile ${user.role}`}>
      <h1>Profile</h1>
      {user.profileImage && <img src={`/${user.profileImage}`} alt="Profile" className="profile-image" />}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
        </label>
        <label>
          Profile Image:
          <input type="file" name="profileImage" onChange={handleImageChange} />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
