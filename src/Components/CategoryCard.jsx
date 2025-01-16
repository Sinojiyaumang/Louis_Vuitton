import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import '../Styles/CategoryCard.css';
import CategoryCardData from '../Data/CategoryCardData'; 
import { setCategory } from '../redux/productAction'; 

const CategoryCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCardClick = (category, path) => {
    dispatch(setCategory(category));
    navigate(path);


  };

  return (
    <>
      <div className="FullClass">
        <h1 className="Heading">Explore a Selection of the Maison's Creations</h1>
        <div className="category-card-container">
          {CategoryCardData.map((card) => (
            <div
              key={card.id}
              className="category-card"
              onClick={() => handleCardClick(card.title, card.path)} 
              style={{ cursor: 'pointer' }}
            >
              <Link to={card.path}>
                <img
                  src={card.image} 
                  alt={card.title}  
                  className="category-card-img"
                />
                <h3 className="category-card-title">{card.title}</h3></Link>
            </div>
          ))}
        </div>
        <div className="Image-full-bags">
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
