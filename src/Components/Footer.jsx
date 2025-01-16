import React from 'react';
import '../Styles/Footer.css'; 
import logoimg from '../Images/HomePage-Main1/Logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Full Name and Address of the Manufacturer</h4>
          <p>
            Louis Vuitton Malletier SAS <br />
            2 Rue du Pont Neuf <br />
            75034 Paris CEDEX 01 <br />
            FRANCE
          </p>
          <p>Please refer to the product label for specific country of origin for each product.</p>
        </div>

        <div className="footer-section">
          <h4>Full Name and Address of the Importer</h4>
          <p>
            Louis Vuitton India Retail Private Limited <br />
            901A Ninth Floor, Time Tower, MG Road <br />
            Gurgaon, Haryana - 122002 <br />
            INDIA
          </p>
        </div>
      </div>

      <div className="footer-logo">
        <p>LOUIS VUITTON</p>
        <img
          src={logoimg}
          alt="Footer Logo"
          className="footer-image"
        />
      </div>
    </footer>
  );
};

export default Footer;
