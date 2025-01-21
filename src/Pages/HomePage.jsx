import React, { useEffect, useState } from 'react';
import '../Styles/Gifting.css';
import '../Styles/HomePage.css';

const HomePage = ({ header, gifting, categorycards, walletsonchain, scarvesdisplay, footer }) => {

    return (
        <div>
            {header}
            <div className="home-content">
                {gifting}
                {categorycards}
                {footer}
            </div>      
        </div>
    );
};

export default HomePage;
