import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/Accessories.css';
import { setSelectedProduct } from '../redux/productAction';

const WomensAccessories = ({ products }) => {
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
    'Caps & Hats': {
      image: 'https://www.louisvuitton.com/images/is/image/lv/Women_Campaign_New_ForWomen_LV%20Ski_Oct24_7_DI3.jpg?wid=2400',
      title: 'Caps & Hats'
    },
    'Shawls': {
      image: 'https://www.louisvuitton.com/images/is/image/lv/W_BC_Textile_1375_Nov24_DI3.jpg?wid=2400',
      title: 'Shawls'
    }
  };

  const categoriesOrder = ['Caps & Hats', 'Shawls'];

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
        </div>
      </div>
    );
  };

  const renderProducts = (products) => (
    <div className="accessories-container">
      {products && products.length > 0 ? (
        <div className="accessories-grid">
          {products.map((accessory) => (
            <div
              key={accessory.id}
              className="accessory-card"
              onClick={() => handleProductClick(accessory)}
            >
              <img
                src={(accessory.images && accessory.images[0]) || 'fallback-image-url'}
                alt={accessory.name || 'Accessory'}
                className="accessory-image"
              />
              <h3 className="accessory-name">{accessory.name || 'No Name Available'}</h3>
              <p className="accessory-price">₹{accessory.price !== undefined ? accessory.price : 'Price Not Available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this category.</p>
      )}
    </div>
  );

  return (
    <div className="accessories-page">
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
                    'Caps & Hats': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-lv-spark-beanie--M94931_PM2_Front%20view.png?wid=1300&hei=1300',
                    'Shawls': 'https://in.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-starlight-shawl--M77714_PM2_Front%20view.png?wid=1300&hei=1300'
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

export default WomensAccessories;
