import React from 'react';
import './About.css';
import aboutData from '../../data/aboutData.json'; // Import des données JSON

// Import direct de l'image
import defaultAvatar from '../media/team/default-avatar.jpg'; 

import kimImage from '../media/team/kim.jpg';
import dorianeImage from '../media/team/doriane.jpg';
import sourouImage from '../media/team/sourou.jpg';
import georginaImage from '../media/team/georgina.jpg';
import annaImage from '../media/team/anna.jpg';
import sholaImage from '../media/team/shola.jpg';
import sergeImage from '../media/team/serge.jpg';
import assaneImage from '../media/team/assane.jpg';

// Associer les images dynamiquement
const teamImages = {
  'default-avatar.jpg': defaultAvatar,
  'kim.jpg': kimImage,
  'doriane.jpg': dorianeImage,
  'sourou.jpg': sourouImage,
  'georgina.jpg': georginaImage,
  'anna.jpg': annaImage,
  'shola.jpg': sholaImage,
  'serge.jpg': sergeImage,
  'assane.jpg': assaneImage,
};

aboutData.founder.image = teamImages[aboutData.founder.image] || defaultAvatar;

aboutData.team.forEach((member) => {
  member.image = teamImages[member.image] || defaultAvatar; // Applique l'image ou l'avatar par défaut
});

const About = () => {
  return (
    <div className="about">
      <div className="container py-5">
        <h1 className="mb-4">À Propos de ProBlack Univers</h1>
        
        {/* Vision */}
        <section className="section">
          <h2>{aboutData.vision.title}</h2>
          <p>{aboutData.vision.description}</p>
          <ul>
            {aboutData.vision.values.map((value, index) => (
              <li key={index}>{value}</li>
            ))}
          </ul>
        </section>

        {/* Mission */}
        <section className="section">
          <h2>{aboutData.mission.title}</h2>
          <p>{aboutData.mission.description}</p>
        </section>

        {/* Founder */}
        <section className="section founder-section">
          <h2>Le Fondateur</h2>
          <img src={aboutData.founder.image} alt={aboutData.founder.name} className="founder-image" />
          <p>{aboutData.founder.description}</p>
        </section>

        {/* Team */}
        <section className="section">
          <h2>Notre Équipe</h2>
          <div className="team-grid">
            {aboutData.team.map((member, index) => (
              <div className="team-member" key={index}>
                <img src={member.image} alt={member.name} className="team-image" />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Branches */}
        <section className="section">
          <h2>Nos Branches</h2>
          <ul>
            {aboutData.branches.map((branch, index) => (
              <li key={index}>
                <strong>{branch.name}:</strong> {branch.description}
              </li>
            ))}
          </ul>
        </section>

        {/* Contacts */}
        <section className="section">
          <h2>Nos Contacts</h2>
          <p>
            <strong>Téléphones:</strong> {aboutData.contacts.phones.join(', ')}<br />
            <strong>Emails:</strong> {aboutData.contacts.emails.join(', ')}<br />
            <strong>Adresse:</strong> {aboutData.contacts.address}<br />
            <strong>Réseaux Sociaux:</strong> {aboutData.contacts.social}
          </p>
        </section>
      </div>
    </div>
  );
};

export default About;
