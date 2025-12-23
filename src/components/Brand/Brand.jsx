import React from 'react';
import './brand.css';
import br1 from '../../assets/atlassian.png';
import br2 from '../../assets/dropbox.png';
import br3 from '../../assets/google.png';
import br4 from '../../assets/shopify.png';
import br5 from '../../assets/slack.png';

const Brand = () => {
  return (
    <section className="brand">
      <div className="brand-container">
        <img src={br1} alt="Atlassian" />
        <img src={br2} alt="Dropbox" />
        <img src={br3} alt="Google" />
        <img src={br4} alt="Shopify" />
        <img src={br5} alt="Slack" />
      </div>
    </section>
  );
};

export default Brand;