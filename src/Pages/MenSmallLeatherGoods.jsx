import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/MenSmallLeatherGoods.css';
import { setSelectedProduct } from '../redux/productAction';

const MenSmallLeatherGoods = ({ products }) => {
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
        'Card Holder': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/M_BC_LG_15_Sept_DI3.jpg?wid=2400',
            title: 'Card Holder',
            description:
                `Streamlined designs adorned with the Maison's heritage emblems unveil ideal on-the-go companions — featuring Louis Vuitton's signatures.`,
        },
        'Compact Wallets': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/M_BC_LG_17_Sept_DI3.jpg?wid=2400',
            title: 'Compact Wallets',
            description:
                `Equipped with functional details like zipped pockets and card slots, Louis Vuitton compact wallets offer practical daily use with a flair of signature emblems.`,
        },
        'Pouches': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/M_BC_LVFall_Aug24_05_DI3.jpg?wid=2400',
            title: 'Pouches',
            description:
                `Ideal for carrying everyday essentials, a selection of pouches for Men evokes Louis Vuitton's spirit of travel with a casual elegance.`,
        }
    };

    const categoriesOrder = ['Card Holder', 'Compact Wallets', 'Pouches'];

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.subcategory === selectedCategory)
        : products.filter((product) => product.category === 'Men Small Leather Goods');

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
        <div className="men-leather-goods-container">
            {products && products.length > 0 ? (
                <div className="men-leather-goods-grid">
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
        <div className="men-leather-goods-page">
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
                                        'Card Holder': 'https://www.louisvuitton.com/images/is/image/lv/M62170_PM2_Front%20view.png?wid=490&hei=490',
                                        'Compact Wallets': 'https://www.louisvuitton.com/images/is/image/lv/M61695_PM2_Front%20view.png?wid=490&hei=490',
                                        'Pouches': 'https://www.louisvuitton.com/images/is/image/lv/M61692_PM2_Front%20view.png?wid=490&hei=490'
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

export default MenSmallLeatherGoods;
