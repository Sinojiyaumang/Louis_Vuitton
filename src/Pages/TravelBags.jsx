import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/TravelBags.css';
import { setSelectedProduct } from '../redux/productAction';

const TravelBags = ({ products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [selectedCategory, setSelectedCategory] = useState('');

    // Get the category from URL query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get('category');
        setSelectedCategory(category || '');
    }, [location.search]);

    const handleFilter = (subcategory) => {
        setSelectedCategory(subcategory);
        navigate(`?category=${subcategory}`);
    };

    const handleProductClick = (product) => {
        dispatch(setSelectedProduct(product));
        navigate(`/SingleProduct/${product.id}`);
    };

    const categoryPosters = {
        'Rolling Luggage': {
            video: 'https://vod.freecaster.com/louisvuitton/9c298163-51c0-4762-9c93-1b6c672fe934/VqKZybOTk1_24.mp4',
        },
        'Hand Bags': {
            video: 'https://vod.freecaster.com/louisvuitton/9c2965db-8ea7-4201-9664-be26ae508a2b/vqaNAlIk7d_24.mp4',
        },
    };

    const categoriesOrder = ['Rolling Luggage', 'Hand Bags'];

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.subcategory === selectedCategory)
        : products.filter((product) => product.category === 'Travel Bags');

    const renderPoster = (category) => {
        const poster = categoryPosters[category];
        return (
            <div className="category-video">
                <video
                    src={poster.video}
                    autoPlay
                    loop
                    muted
                    className="video-element"
                />
            </div>
        );
    };

    const renderProducts = (products) => (
        <div className="travel-bags-container">
            {products && products.length > 0 ? (
                <div className="travel-bags-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="travel-bag-card"
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={(product.images && product.images[0]) || 'fallback-image-url'}
                                alt={product.name || 'Product'}
                                className="travel-bag-image"
                            />
                            <h3 className="travel-bag-name">{product.name || 'No Name Available'}</h3>
                            <p className="travel-bag-price">₹{product.price !== undefined ? product.price : 'Price Not Available'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );

    return (
        <div className="travel-bags-page">
            {/* Filter Section */}
            <div className="filterButton">
                <div className="category-dropdown">
                    <label htmlFor="categorySelect">Choose a category:</label>
                    <select
                        id="categorySelect"
                        value={selectedCategory}
                        onChange={(e) => handleFilter(e.target.value)}
                    >
                        <option value="">All</option>
                        {categoriesOrder.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="category-buttons">
                    {categoriesOrder.map((category) => (
                        <button
                            key={category}
                            onClick={() => handleFilter(category)}
                            className="category-button"
                        >
                            <img
                                src={
                                    {
                                        'Rolling Luggage': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-rolling-trunk--M11067_PM2_Front%20view.png?wid=600&hei=600',
                                        'Hand Bags': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-weekender-bag--M11512_PM2_Front%20view.png?wid=600&hei=600'
                                    }[category]
                                }
                                alt={category}
                            />
                            <p>{category}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Display Posters and Products */}
            {selectedCategory ? (
                <div>
                    {renderPoster(selectedCategory)}
                    {renderProducts(filteredProducts)}
                </div>
            ) : (
                categoriesOrder.map((category) => (
                    <div key={category}>
                        {renderPoster(category)}
                        {renderProducts(products.filter((product) => product.subcategory === category))}
                    </div>
                ))
            )}
        </div>
    );
};

export default TravelBags;
