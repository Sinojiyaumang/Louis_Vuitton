import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import '../Styles/SearchPage.css'

const SearchPage = () => {
    const { products } = useSelector((state) => state.products); 
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        // Get the search query from URL parameters
        const query = new URLSearchParams(location.search).get('query');
        if (query) {
            setSearchQuery(query);
            filterProducts(query);
        }
    }, [location]);

    const filterProducts = (query) => {
        const results = products.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(results);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        filterProducts(query);
    };

    return (
        <div>
            <h1>Search Products</h1>
            <input
                type="text"
                placeholder="Search for products"
                value={searchQuery}
                onChange={handleSearchChange}
            />
            <div className="search-results">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Link
                            to={`/SingleProduct/${product.id}`}
                            key={product.id}
                            className="search-result-item"
                        >
                            <div className="product-card-search">
                                <img
                                    src={(product.images && product.images[0]) || 'fallback-image-url'}
                                    alt={product.name || 'Product'}
                                    className="product-image"
                                />
                                <h3 className="product-name">{product.name || 'No Name Available'}</h3>
                                <p className="product-price">
                                    ₹{product.price !== undefined ? product.price : 'Price Not Available'}
                                </p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
