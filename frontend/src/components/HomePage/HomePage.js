import React, { useState, useEffect } from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logoImage1 from '../media/caroussel/princesse-abibiche.jpg';
import logoImage2 from '../media/caroussel/majestyhair-des-produits-capillaires.jpg';
import logoImage3 from '../media/caroussel/alimentation.jpg';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ totalReviews: 0, totalVisitors: 0, newAnnouncements: 0 });
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndStats = async () => {
      try {
        const response = await axios.get('/api/shops/categories/stats');
        setCategories(response.data.categories);
        setStats({
          totalReviews: response.data.totalReviews,
          totalVisitors: response.data.totalVisitors,
          newAnnouncements: response.data.newAnnouncements
        });
      } catch (error) {
        console.error('Error fetching categories and stats:', error);
      }
    };

    const fetchShops = async () => {
      try {
        const response = await axios.get('/api/shops');
        setShops(response.data);
      } catch (error) {
        console.error('Error fetching shops:', error);
      }
    };

    fetchCategoriesAndStats();
    fetchShops();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/api/shops/search', {
        params: {
          term: searchTerm,
          location: searchLocation,
          category: searchCategory,
        },
      });
      console.log("Résultats de la recherche :", response.data);
      setShops(response.data);
    } catch (error) {
      console.error('Error searching shops:', error.response ? error.response.data : error.message);
    }
  };

  const handleShopDetails = (shopId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      navigate(`/boutique/${shopId}`);
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
                {categories.map((category, index) => (
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
                {categories.map((category, index) => (
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
                {categories.map((category, index) => (
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
          {shops.map((shop, index) => (
            <div key={index} className="shop-slide" onClick={() => handleShopDetails(shop._id)}>
              <img src={shop.photos[0]} alt={shop.name} className="img-fluid" />
              <h3 className="text-center">{shop.name}</h3>
              <p className="text-center">{shop.description}</p>
              <button className="btn btn-primary d-block mx-auto">Voir les détails</button>
            </div>
          ))}
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
