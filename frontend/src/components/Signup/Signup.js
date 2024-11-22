import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { API_BASE_URL } from '../../services/apiService';
import { AuthContext } from '../../context/AuthContext';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('client');
  const [profileImage, setProfileImage] = useState(null);

  const { login } = React.useContext(AuthContext); // Utilise le contexte Auth
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('role', role);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await axios.post(`${API_BASE_URL}api/users/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Automatiquement connecter l'utilisateur après l'inscription
      const { token, role: userRole } = response.data;
      login(token, userRole);

      // Redirection après inscription
      if (role === 'business') {
        navigate('/subscription-plans'); // Redirige vers la page des abonnements pour "business"
      } else {
        navigate('/profile'); // Redirige vers le profil pour "client"
      }
    } catch (error) {
      console.error('Registration error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="client">Client</option>
          <option value="business">Business</option>
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
