import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/WomenSmallLeatherGoods.css';
import { setSelectedProduct } from '../redux/productAction';

const WomenSmallLeatherGoods = ({ products }) => {
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
        'LV Essentials': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/W_BC_SLG_Victorine_July24_DI3.jpg?wid=2400',
            title: 'LV Essentials',
            description:
                `Capturing the Maison's celebrated spirit of travel, the selection of small leather goods unveil a range of styles for essential use. Adorned in the iconic Monogram motif, the classic and new creations are key signatures of Louis Vuitton.`,
        },
        'Long Wallets': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/BC_SLG_SLDJuly24_05_DI3.jpg?wid=2400',
            title: 'Long Wallets',
            description:
                'Imbued with a myriad of dreamy hues across a range of versatile shapes, Louis Vuitton’s long wallets exude a contemporary, feminine flair. From Monogram canvas paired with hidden pops of color to vibrant embossed leather, these statement pieces elevate everyday looks through signature detailing.',
        },
        'Louis Vuitton Colormania': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/BC_LV_COLOR_03_STILL_LIFE_DI3.jpg?wid=2400',
            title: 'Louis Vuitton Colormania',
            description:
                `Melding heritage and creativity, the new pieces showcases a rich palette of pieces meticulously selected from the Maison's archives.A reflection of unique expertise, this artistic collaboration is punctuated by pops of color and emblematic signatures.`,
        }
    };

    const categoriesOrder = ['LV Essentials', 'Long Wallets', 'Louis Vuitton Colormania'];

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.subcategory === selectedCategory)
        : products.filter((product) => product.category === 'Women Small Leather Goods');

    const renderPoster = (category) => {
        const poster = categoryPosters[category];
        return (
            <div className="category-poster">
                <img src={poster?.image || 'fallback-image-url'} alt={poster?.title || 'Poster'} className="poster-image" />
                <div className="overlay-text">
                    <h6>{poster?.title || 'No Title Available'}</h6>
                    <p>{poster?.description || 'No Description Available'}</p>
                </div>
            </div>
        );
    };

    const renderProducts = (products) => (
        <div className="women-leather-goods-container">
            {products && products.length > 0 ? (
                <div className="women-leather-goods-grid">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="leather-good-card"
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={(product.images && product.images[0]) || 'fallback-image-url'}
                                alt={product.name || 'Product'}
                                className="leather-good-image"
                            />
                            <h3 className="leather-good-name">{product.name || 'No Name Available'}</h3>
                            <p className="leather-good-price">₹{product.price !== undefined ? product.price : 'Price Not Available'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );

    return (
        <div className="women-leather-goods-page">
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
                                        'LV Essentials': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-victorine-wallet--M81557_PM2_Front%20view.png?wid=1300&hei=1300',
                                        'Long Wallets': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-vertical-wallet--M81330_PM2_Front%20view.png?wid=600&hei=600',
                                        'Louis Vuitton Colormania': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-kirigami-card-holder--M12793_PM2_Front%20view.png?wid=600&hei=600'
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

export default WomenSmallLeatherGoods;
