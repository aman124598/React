import React from 'react';
import './article.css';

const Article = ({ image, date, title }) => {
  return (
    <article className="article-card">
      <div className="article-image">
        <img src={image} alt={title} />
      </div>
      <div className="article-content">
        <span className="article-date">{date}</span>
        <h3 className="article-title">{title}</h3>
        <span className="article-link">Read Full Article</span>
      </div>
    </article>
  );
};

export default Article;