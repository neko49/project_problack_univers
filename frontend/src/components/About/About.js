import React from 'react';
import './About.css';
import founderImage from '../media/team/default-avatar.jpg'; // Assurez-vous que le chemin est correct
import kimImage from '../media/team/default-avatar.jpg';
import dorianeImage from '../media/team/default-avatar.jpg';
import georginaImage from '../media/team/default-avatar.jpg';
import annaImage from '../media/team/default-avatar.jpg';
import sholaImage from '../media/team/default-avatar.jpg';
import sergeImage from '../media/team/default-avatar.jpg';
import assaneImage from '../media/team/default-avatar.jpg';

const About = () => {
  return (
    <div className="about">
      <div className="container py-5">
        <h1 className="mb-4">À Propos de ProBlack Univers</h1>
        
        <section className="section">
          <h2>À Propos</h2>
          <p>
            Problack Univers est une plateforme intégrée regroupant plusieurs activités et services dont l'ambition est de stimuler et de promouvoir l'entrepreneuriat et les investissements au sein de la communauté afrodescendante.
          </p>
        </section>

        <section className="section">
          <h2>Notre Vision</h2>
          <p>
            Devenir la plus grande plateforme entrepreneuriale pour permettre à la communauté noire de consommer ce qu'elle produit et de produire pour conquérir le marché mondial. Nos valeurs incluent :
          </p>
          <ul>
            <li>Responsabilité</li>
            <li>Engagement</li>
            <li>Solidarité</li>
            <li>Optimisme</li>
          </ul>
        </section>

        <section className="section">
          <h2>Notre Mission</h2>
          <p>
            Notre mission est de stimuler et de promouvoir l'entrepreneuriat et les investissements au sein de la communauté afrodescendante en offrant une plateforme intégrée regroupant plusieurs activités et services.
          </p>
        </section>

        <section className="section founder-section">
          <h2>Le Fondateur</h2>
          <img src={founderImage} alt="Fondateur" className="founder-image"/>
          <p>
            Sourou Dah Gbemenou est un consultant en informatique, monétique et métrologie, entrepreneur, investisseur et philanthrope. Il a fondé l'ONG Prospérité Pour Tous, militant et activiste panafricain, il a toujours plaidé pour une intégration saine et digne économiquement et socialement de la communauté noire en Occident.
          </p>
        </section>

        <section className="section">
          <h2>Notre Équipe</h2>
          <p>Notre équipe est composée de professionnels dévoués et expérimentés, incluant :</p>
          <ul className="team-list">
            <li><img src={kimImage} alt="Kim Sam Soon" className="team-image"/> Kim Sam Soon - Executive Director, Problack Investment Funds</li>
            <li><img src={dorianeImage} alt="Doriane Bouville" className="team-image"/> Doriane Bouville - Deputy Executive Director, Problack Investment Funds</li>
            <li><img src={georginaImage} alt="Georgina Eyenga" className="team-image"/> Georgina Eyenga - Executive Director, Problack Negoce Agency</li>
            <li><img src={annaImage} alt="Anna Mimboui" className="team-image"/> Anna Mimboui - Executive Director, Problack Immo</li>
            <li><img src={sholaImage} alt="Shola Deen" className="team-image"/> Shola Deen - Executive Managing Director, Problack Academy</li>
            <li><img src={sergeImage} alt="Serge Ekollé" className="team-image"/> Serge Ekollé - Strategy, Development & Technology Director</li>
            <li><img src={assaneImage} alt="Assane Magatte Seye" className="team-image"/> Assane Magatte Seye - Director, Problack TV & Entertainment</li>
          </ul>
        </section>

        <section className="section">
          <h2>Nos Branches</h2>
          <p>Problack Univers se décline en plusieurs branches spécialisées :</p>
          <ul>
            <li><strong>Problack Academy :</strong> Formation et renforcement de capacités</li>
            <li><strong>Problack Television :</strong> Éducation, divertissement, business et culture afro</li>
            <li><strong>Problack Talents :</strong> Détection et renforcement des jeunes talents</li>
            <li><strong>Problack Investment Forum :</strong> Espace de mise en relation entre entrepreneurs et investisseurs</li>
            <li><strong>Problack Multi Services :</strong> Audit, conseils, gestion des risques et conformité</li>
            <li><strong>Problack Communication & Media :</strong> Communication, publicité, création de contenu et gestion des médias sociaux</li>
            <li><strong>Problack Marketplace :</strong> Promotion et exposition des produits de nos entrepreneurs</li>
            <li><strong>Problack Immo :</strong> Vente, achat et location de biens immobiliers</li>
            <li><strong>Problack Negoce :</strong> Centrale d'achat et gestion des contrats</li>
          </ul>
        </section>

        <section className="section">
          <h2>Nos Contacts</h2>
          <p>
            <strong>Phone:</strong> +44 7442 209086, +33 6 95 52 91 42<br/>
            <strong>Email:</strong> contact@problacku.com, hello@problacku.com<br/>
            <strong>Office Address:</strong> 71-75 Shelton Street, Covent Garden, London WC2 9JQ, United Kingdom<br/>
            <strong>Social Media:</strong> @problackunivers
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
