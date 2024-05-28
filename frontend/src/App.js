import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavBar/Navbar';
import HomePage from './components/HomePage/HomePage';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import SubscriptionPlans from './components/SubscriptionPlans/SubscriptionPlans';
import Profile from './components/Profile/Profile';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Contact from './components/Contact/Contact';
import News from './components/News/News';
import About from './components/About/About';
import Footer from './components/Footer/Footer';
import './App.css';
import Boutique from './components/Boutique/Boutique';
import BoutiqueDetails from './components/BoutiqueDetails/BoutiqueDetails';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/boutique/:id" element={<BoutiqueDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
