import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Perfumes.css';  // Import the custom CSS for Perfumes
import { setSelectedProduct } from '../redux/productAction';

const PerfumePage = ({ products }) => {
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
        'Oriental Perfumes': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/U_PERFUMES_HOLIDAY24_5_DI3.jpg?wid=2400',
            title: 'Oriental Perfumes',
            description:
                'Inspired by a quest for the exceptional, this collection of Louis Vuitton perfumes is informed by the Middle East’s olfactory heritage, showcasing the most emblematic and luxurious raw material: oud.',
        },
        'Les Extraits Collection': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/U_PERFUMES_HOLIDAY24_1_DI3.jpg?wid=2400',
            title: 'Les Extraits Collection',
            description:
                'Louis Vuitton reinvents the Extrait de Parfum, the purest and most precious fragrance composition. Elevating perfume to an art form.',
        },
        'Cologne Perfumes': {
            image: 'https://www.louisvuitton.com/images/is/image/lv/U_PERMUES_HOLIDAY24_9_DI3.jpg?wid=2400',
            title: 'Cologne Perfumes',
            description:
                'Pacific Chill joins the collection of California-inspired fragrances that blends the spontaneity of cologne with the sophistication of perfume.',
        },
    };

    const categoriesOrder = ['Oriental Perfumes', 'Les Extraits Collection', 'Cologne Perfumes'];

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.subcategory === selectedCategory)
        : products;

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
        <div className="perfume-container">
            {products && products.length > 0 ? (
                <div className="perfume-grid">
                    {products.map((perfume) => (
                        <div
                            key={perfume.id}
                            className="perfume-card"
                            onClick={() => handleProductClick(perfume)}
                        >
                            <img
                                src={(perfume.images && perfume.images[0]) || 'fallback-image-url'}
                                alt={perfume.name || 'Perfume'}
                                className="perfume-image"
                            />
                            <h3 className="perfume-name">{perfume.name || 'No Name Available'}</h3>
                            <p className="perfume-price">₹{perfume.price !== undefined ? perfume.price : 'Price Not Available'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No perfumes available for this category.</p>
            )}
        </div>
    );

    return (
        <div className="perfume-page">
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
                                        'Oriental Perfumes': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-ombre-nomade--LP0095_PM1_Cropped%20worn%20view.png?wid=1300&hei=1300',
                                        'Les Extraits Collection': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-flaconnier-high-end--M10070_PM2_Front%20view.png?wid=1300&hei=1300',
                                        'Cologne Perfumes': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-pacific-chill---LP0326_PM2_Front%20view.png?wid=1300&hei=1300',
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

export default PerfumePage;
