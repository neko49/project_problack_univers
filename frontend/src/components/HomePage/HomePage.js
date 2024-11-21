import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import axios from 'axios';
import { API_BASE_URL } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logoImage1 from '../media/caroussel/princesse-abibiche.jpg';
import logoImage2 from '../media/caroussel/majestyhair-des-produits-capillaires.jpg';
import logoImage3 from '../media/caroussel/alimentation.jpg';

const HomePage = () => {
  const [categories, setCategories] = useState([]); // Tableau vide par défaut
  const [stats, setStats] = useState({ totalReviews: 0, totalVisitors: 0, newAnnouncements: 0 });
  const [shops, setShops] = useState([]); // Tableau vide par défaut
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndStats = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/shops/categories/stats`);
        console.log('Categories and stats:', response.data); // Débogage
        setCategories(response.data.categories || []); // Gestion des données nulles ou undefined
        setStats({
          totalReviews: response.data.totalReviews || 0,
          totalVisitors: response.data.totalVisitors || 0,
          newAnnouncements: response.data.newAnnouncements || 0,
        });
      } catch (error) {
        console.error('Error fetching categories and stats:', error);
      }
    };

    const fetchShops = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/shops`);
        console.log('Shops data:', response.data); // Débogage
        setShops(response.data || []); // Gestion des données nulles ou undefined
      } catch (error) {
        console.error('Error fetching shops:', error);
        setShops([]); // Réinitialisez les données en cas d'erreur
      }
    };

    fetchCategoriesAndStats();
    fetchShops();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${API_BASE_URL}/api/shops/search`, {
        params: {
          term: searchTerm,
          location: searchLocation,
          category: searchCategory,
        },
      });
      console.log('Search results:', response.data); // Débogage
      setShops(response.data || []); // Mise à jour des résultats de recherche
    } catch (error) {
      console.error('Error searching shops:', error.response ? error.response.data : error.message);
    }
  };

  const handleShopDetails = (shopId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // Rediriger vers la page de connexion si pas de token
    } else {
      navigate(`/boutique/${shopId}`); // Rediriger vers les détails de la boutique
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
  };

  const shopSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
  };

  return (
    <div className="homepage">
      <Slider {...settings}>
        <div className="slide">
          <img src={logoImage1} alt="Princesse Abibiche's boutique" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Découvrez nos entreprises</h1>
            <form className="form-inline justify-content-center" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Que cherchez-vous ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Lieu"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <select
                className="form-control mr-2"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {Array.isArray(categories) && categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
        <div className="slide">
          <img src={logoImage2} alt="Majesty Hair Products display" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Trouvez des salons de beauté</h1>
            <form className="form-inline justify-content-center" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Que cherchez-vous ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Lieu"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <select
                className="form-control mr-2"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {Array.isArray(categories) && categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
        <div className="slide">
          <img src={logoImage3} alt="Grocery items from various categories" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Tout pour l'alimentation</h1>
            <form className="form-inline justify-content-center" onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Que cherchez-vous ?"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <input
                type="text"
                className="form-control mr-2"
                placeholder="Lieu"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
              <select
                className="form-control mr-2"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {Array.isArray(categories) && categories.map((category, index) => (
                  <option key={index} value={category}>{category}</option>
                ))}
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
      </Slider>
      <div className="container shop-carousel">
        <h2 className="text-center">Nos Boutiques</h2>
        <Slider {...shopSettings}>
          {Array.isArray(shops) && shops.length > 0 ? (
            shops.map((shop, index) => (
              <div key={index} className="shop-slide" onClick={() => handleShopDetails(shop._id)}>
                <img src={shop.photos[0]} alt={shop.name} className="img-fluid" />
                <h3 className="text-center">{shop.name}</h3>
                <p className="text-center">{shop.description}</p>
                <button className="btn btn-primary d-block mx-auto">Voir les détails</button>
              </div>
            ))
          ) : (
            <p className="text-center">Aucune boutique trouvée</p>
          )}
        </Slider>
      </div>
      <div className="container statistics-section">
        <div className="row">
          <div className="col-sm-3 text-center statistic">
            <CountUp end={stats.totalVisitors} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Nouveaux visiteurs chaque semaine</p>
          </div>
          <div className="col-sm-3 text-center statistic">
            <CountUp end={stats.totalReviews} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Commentaires chaque année</p>
          </div>
          <div className="col-sm-3 text-center statistic">
            <CountUp end={stats.newAnnouncements} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Nouvelles annonces chaque semaine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
