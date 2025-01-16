import React, { useEffect, useState } from 'react';
import '../Styles/Gifting.css';
import '../Styles/HomePage.css';

const HomePage = ({ header, gifting, categorycards, walletsonchain, scarvesdisplay, footer }) => {
    const [showPopup, setShowPopup] = useState(false);

    // Show popup after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 3000);

        return () => clearTimeout(timer); // Cleanup on unmount
    }, []);

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    return (
        <div>
            {header}
            <div className="home-content">
                {gifting}
                {categorycards}
                {footer}
            </div>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>
                            If you are visiting our website,<br />
                            that means you are already capable of shopping<br />
                            without showing the price.<br /><br />
                            So please don’t try to find price sorting.<br />
                            Thank you!
                        </p>
                        <button className="popup-button" onClick={handleClosePopup}>OK, Got It!</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomePage;
