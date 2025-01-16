import React from 'react';
import '../Styles/Gifting.css';
import video from '../Videos/HomePage-Main.mp4';
import fallbackImage from '../Images/HomePage-Main1/HomePage-FallBack.webp';

const Gifting = () => {
    return (
        <div>
            <div className="main">
                <div className="bg">
                    <video className="bg-video" autoPlay loop muted>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                    <img src={fallbackImage} alt="Gifting Fallback" className="bg-image" />

                    <div className="bg-text">
                        <p>LUXURIOUS COLLECTION</p>
                        <p className="FestiveGift">Celebrete Your New Year With Louis Vuitton</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gifting;
