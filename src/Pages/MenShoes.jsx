import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/MenShoes.css';
import { setSelectedProduct } from '../redux/productAction';

const MenShoes = ({ products }) => {
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
        navigate(`?category=${subcategory}`); // Update the URL with the selected category
    };

    const handleProductClick = (product) => {
        dispatch(setSelectedProduct(product));
        navigate(`/SingleProduct/${product.id}`); // Navigate to the single product page
    };

    const categoryPosters = {
        Sneakers: {
            image: 'https://www.louisvuitton.com/images/is/image/lv/M_BC_LV_Trainer_Apr24_4_DI3.jpg?wid=2400',
        },
        Sandals: {
            image: 'https://www.louisvuitton.com/images/is/image/lv/M_BC_NewFormalSS25_AOU24_21_DI3.jpg?wid=2400',
        },
    };

    const categoriesOrder = ['Sneakers', 'Sandals'];

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.subcategory === selectedCategory)
        : products;

    const renderPoster = (category) => {
        const poster = categoryPosters[category];
        return (
            <div className="category-poster">
                <img src={poster?.image || 'fallback-image-url'} alt={poster?.title || 'Poster'} className="poster-image" />
                <div className="overlay-text">
                </div>
            </div>
        );
    };

    const renderProducts = (products) => (
        <div className="men-shoes-container">
            {products && products.length > 0 ? (
                <div className="men-shoes-grid">
                    {products.map((shoe) => (
                        <div
                            key={shoe.id}
                            className="shoe-card"
                            onClick={() => handleProductClick(shoe)}
                        >
                            <img
                                src={(shoe.images && shoe.images[0]) || 'fallback-image-url'}
                                alt={shoe.name || 'Shoe'}
                                className="shoe-image"
                            />
                            <h3 className="shoe-name">{shoe.name || 'No Name Available'}</h3>
                            <p className="shoe-price">₹{shoe.price !== undefined ? shoe.price : 'Price Not Available'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );

    return (
        <div className="men-shoes-page">
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
                                        Sneakers: 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-trainer-sneaker--BM9U5PMI20_PM2_Front%20view.png?wid=600&hei=600',
                                        Sandals: 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-waterfront-mule--BOWH1PGOEC_PM2_Front%20view.png?wid=600&hei=600',
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

export default MenShoes;
