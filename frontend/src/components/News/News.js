import React from 'react';
import Events from './Events';
import Promotions from './Promotions';
import CompaniesNews from './CompaniesNews';
import Associations from './Associations';
import './News.css';

const News = () => {
  return (
    <div className="news">
      <div className="container py-5">
        <h1 className="mb-4">Actualités</h1>
        <Events />
        <Promotions />
        <CompaniesNews />
        <Associations />
      </div>
    </div>
  );
};

export default News;
