import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSelectedProduct } from '../redux/productAction';
import '../Styles/MenBelts.css';

const MenBelts = ({ products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        dispatch(setSelectedProduct(product));
        navigate(`/SingleProduct/${product.id}`);
    };

    const filteredProducts = products.filter((product) => product.category === 'Men Belts');

    return (
        <div className="men-belts-page-container">
            <div className="men-belts-poster">
                <div className="men-belts-overlay-text">
                    <h1 className='text-white'>Men's Belts</h1>
                    <p>In a refined approach to dressing, a selection of belts for Men exudes a modern elegance. Revitalizing the emblematic LV Logo, these creations exalt the signature sophistication of the Maison in timeless colourways.</p>
                </div>
            </div>
            <div className="men-belts-products-container">
                {filteredProducts.length > 0 ? (
                    <div className="men-belts-grid">
                        {filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className="men-belts-card"
                                onClick={() => handleProductClick(product)}
                            >
                                <img
                                    src={(product.images && product.images[0]) || 'fallback-image-url'}
                                    alt={product.name || 'Product'}
                                    className="men-belts-image"
                                />
                                <h3 className="men-belts-name">{product.name || 'No Name Available'}</h3>
                                <p className="men-belts-price">₹{product.price !== undefined ? product.price : 'Price Not Available'}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="men-belts-no-products">No products available in this category.</p>
                )}
            </div>
        </div>
    );
};

export default MenBelts;
