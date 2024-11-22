import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { API_BASE_URL } from '../../services/apiService'; // Assurez-vous que le chemin est correct
import { useAuth } from '../../context/AuthContext'; // Importez le contexte

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Utilisez le contexte pour gérer l'état global
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}api/users/login`, { email, password });
      
      // Appelez la fonction login du contexte
      login(response.data.token, response.data.role);

      // Redirigez selon le rôle de l'utilisateur
      if (response.data.role === 'business') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error('Authentication error:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
