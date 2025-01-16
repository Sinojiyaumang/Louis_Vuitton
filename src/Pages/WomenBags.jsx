import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Styles/WomenBags.css';
import { setSelectedProduct } from '../redux/productAction';

const WomenBags = ({ products }) => {
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
    'Cross Body Bags': {
      image: 'https://www.louisvuitton.com/images/is/image/lv/W_BC_LG_DIANEMNG_WORN_OCT24_01_DI3.jpg?wid=2400',
      title: 'Crossbody & Shoulder Bags',
      description:
        'Evoking everyday elegance, Louis Vuitton’s shoulder and cross-body bags are imbued with the Maison’s emblematic style codes. The distinctive designs take on a myriad of silhouettes, adorned in various materials and eye-catching details to create modern versatility.',
    },
    'Tote Bags': {
      image: 'https://www.louisvuitton.com/images/is/image/lv/W_BC_LG_NVFISO_STILLIFE_AUG24_04_DI3.jpg?wid=2400',
      title: 'Tote Bags',
      description:
        'Function meets form with Louis Vuitton’s sophisticated range of tote bags for Women. Crafted from the Maison’s signature materials, the versatile creations easily traverse the city and the beach.',
    },
    'Mini Bags': {
      image: 'https://www.louisvuitton.com/images/is/image/lv/W_BC_SLG_LIVPOCHETTEMNG_OCT24_01_DI3.jpg?wid=2400',
      title: 'Mini Bags',
      description:
        'Louis Vuitton’s mini bags are compact yet stylish. Ideal for modern-day minimalists, these bags offer functionality without compromising on luxury and sophistication.',
    },
  };

  const categoriesOrder = ['Cross Body Bags', 'Tote Bags', 'Mini Bags'];

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
    <div className="women-bags-container">
      {products && products.length > 0 ? (
        <div className="women-bags-grid">
          {products.map((bag) => (
            <div
              key={bag.id}
              className="bag-card"
              onClick={() => handleProductClick(bag)}
            >
              <img
                src={(bag.images && bag.images[0]) || 'fallback-image-url'}
                alt={bag.name || 'Bag'}
                className="bag-image"
              />
              <h3 className="bag-name">{bag.name || 'No Name Available'}</h3>
              <p className="bag-price">₹{bag.price !== undefined ? bag.price : 'Price Not Available'}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this category.</p>
      )}
    </div>
  );

  return (
    <div className="women-bags-page">
      {/* Filter Section */}
      <div className="filterButton">
        <div className="category-buttons">
          {categoriesOrder.map((category) => (
            <button
              key={category}
              onClick={() => handleFilter(category)}
              className="category-button"
            >
              <img
                src={{
                  'Cross Body Bags': 'https://www.louisvuitton.com/images/is/image/lv/M45985_PM2_Front%20view.png?wid=600&hei=600',
                  'Tote Bags': 'https://www.louisvuitton.com/images/is/image/lv/M11946_PM2_Front%20view.png?wid=600&hei=600',
                  'Mini Bags': 'https://www.louisvuitton.com/images/is/image/lv/M83008_PM2_Front%20view.png?wid=490&hei=490',
                }[category]}
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

export default WomenBags;



