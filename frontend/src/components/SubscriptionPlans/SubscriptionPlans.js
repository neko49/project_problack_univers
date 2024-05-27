import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SubscriptionPlans.css';

const SubscriptionPlans = () => {
  const navigate = useNavigate();

  const handleSubscribe = (plan) => {
    // Vous pouvez ajouter la logique pour gérer l'abonnement ici
    console.log(`Selected plan: ${plan}`);
    navigate('/login');
  };

  return (
    <div className="subscription-plans">
      <h1>Select Your Subscription Plan</h1>
      <div className="plan">
        <h2>ProBlack Essential</h2>
        <p>Réductions exclusives, newsletter mensuelle, montage et publication d'une vidéo publicitaire par mois.</p>
        <p>Prix : 49,99€ par mois</p>
        <button onClick={() => handleSubscribe('essential')}>Subscribe</button>
      </div>
      <div className="plan">
        <h2>ProBlack Plus</h2>
        <p>Tous les avantages du niveau de base, accès à des événements spéciaux en ligne, opportunités de réseautage, montage et publication d'une vidéo chaque deux semaines.</p>
        <p>Prix: 79,99€ par mois</p>
        <button onClick={() => handleSubscribe('plus')}>Subscribe</button>
      </div>
      <div className="plan">
        <h2>ProBlack Elite</h2>
        <p>Tous les avantages des niveaux de base et intermédiaire, réductions supplémentaires, accès à des événements en personne, accès anticipé à de nouveaux produits, production de 4 vidéos par mois.</p>
        <p>Prix suggéré : 99€ par mois</p>
        <button onClick={() => handleSubscribe('elite')}>Subscribe</button>
      </div>
      <div className="plan">
        <h2>ProBlack Annual Pass</h2>
        <p>Pour les avantages du niveau de membership choisi, une réduction de 15% pour les adhésions annuelles par rapport aux mensuelles.</p>
        <button onClick={() => handleSubscribe('annual')}>Subscribe</button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
