import React from 'react';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
import './HomePage.css';
import logoImage1 from '../media/caroussel/princesse-abibiche.jpg';
import logoImage2 from '../media/caroussel/majestyhair-des-produits-capillaires.jpg';
import logoImage3 from '../media/caroussel/alimentation.jpg';

const HomePage = () => {
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

  return (
    <div className="homepage">
      <Slider {...settings}>
        <div className="slide">
          <img src={logoImage1} alt="Princesse Abibiche's boutique" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Découvrez nos entreprises</h1>
            <form className="form-inline justify-content-center">
              <input type="text" className="form-control mr-2" placeholder="Que cherchez-vous ?" />
              <input type="text" className="form-control mr-2" placeholder="Lieu" />
              <select className="form-control mr-2">
                <option>Toutes les catégories</option>
                <option>Catégorie 1</option>
                <option>Catégorie 2</option>
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
        <div className="slide">
          <img src={logoImage2} alt="Majesty Hair Products display" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Trouvez des salons de beauté</h1>
            <form className="form-inline justify-content-center">
              <input type="text" className="form-control mr-2" placeholder="Que cherchez-vous ?" />
              <input type="text" className="form-control mr-2" placeholder="Lieu" />
              <select className="form-control mr-2">
                <option>Toutes les catégories</option>
                <option>Catégorie 1</option>
                <option>Catégorie 2</option>
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
        <div className="slide">
          <img src={logoImage3} alt="Grocery items from various categories" className="img-fluid" />
          <div className="search-overlay">
            <h1 className="text-center">Tout pour l'alimentation</h1>
            <form className="form-inline justify-content-center">
              <input type="text" className="form-control mr-2" placeholder="Que cherchez-vous ?" />
              <input type="text" className="form-control mr-2" placeholder="Lieu" />
              <select className="form-control mr-2">
                <option>Toutes les catégories</option>
                <option>Catégorie 1</option>
                <option>Catégorie 2</option>
              </select>
              <button type="submit" className="btn btn-primary">Rechercher</button>
            </form>
          </div>
        </div>
      </Slider>
      <div className="container statistics-section">
        <div className="row">
          <div className="col-sm-3 text-center statistic">
            <CountUp end={128} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Nouveaux visiteurs chaque semaine</p>
          </div>
          <div className="col-sm-3 text-center statistic">
            <CountUp end={15235} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Clients satisfaits chaque année</p>
          </div>
          <div className="col-sm-3 text-center statistic">
            <CountUp end={120} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Ont remporté des prix incroyables</p>
          </div>
          <div className="col-sm-3 text-center statistic">
            <CountUp end={3} duration={2.75} redraw={true}>
              {({ countUpRef, start }) => (
                <VisibilitySensor onChange={start} delayedCall>
                  <span ref={countUpRef} />
                </VisibilitySensor>
              )}
            </CountUp>
            <p>Nouvelle annonce chaque semaine</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
