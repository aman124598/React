import React from 'react';
import './blog.css';
import bg1 from '../../assets/Rectangle 22-4.png';
import bg2 from '../../assets/Rectangle 22-2.png';
import bg3 from '../../assets/Rectangle 22-3.png';
import bg4 from '../../assets/Rectangle 22-1.png';
import bg5 from '../../assets/Rectangle 22.png';

const Blog = () => {
  const articles = [
    {
      id: 1,
      image: bg5,
      date: 'Sep 26, 2021',
      title: 'GPT-3 and Open AI is the future. Let us explore how it is?',
      featured: false,
    },
    {
      id: 2,
      image: bg2,
      date: 'Sep 26, 2021',
      title: 'GPT-3 and Open AI is the future. Let us explore how it is?',
      featured: false,
    },
    {
      id: 3,
      image: bg3,
      date: 'Sep 26, 2021',
      title: 'GPT-3 and Open AI is the future. Let us explore how it is?',
      featured: false,
    },
    {
      id: 4,
      image: bg4,
      date: 'Sep 26, 2021',
      title: 'GPT-3 and Open AI is the future. Let us explore how it is?',
      featured: false,
    },
  ];

  return (
    <section className="blog" id="blog">
      <div className="blog-heading">
        <h1 className="gradient__text">
          A lot is happening, We are blogging about it.
        </h1>
      </div>

      <div className="blog-container">
        {/* Featured Article */}
        <article className="blog-article-featured">
          <div className="blog-article-image">
            <img src={bg1} alt="Featured article" />
          </div>
          <div className="blog-article-content">
            <span className="blog-article-date">Sep 26, 2021</span>
            <h2 className="blog-article-title">
              GPT-3 and Open AI is the future. Let us explore how it is?
            </h2>
            <span className="blog-article-link">Read Full Article</span>
          </div>
        </article>

        {/* Regular Articles */}
        {articles.map((article) => (
          <article className="blog-article" key={article.id}>
            <div className="blog-article-image">
              <img src={article.image} alt={article.title} />
            </div>
            <div className="blog-article-content">
              <span className="blog-article-date">{article.date}</span>
              <h3 className="blog-article-title">{article.title}</h3>
              <span className="blog-article-link">Read Full Article</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blog;