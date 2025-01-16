import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { addToCart } from '../redux/cartActions'; // Ensure you have this Redux action
import '../Styles/SingleProduct.css'; // Make sure the CSS file exists
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const SingleProduct = ({ products = [] }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart.items);

    const [showSustainability, setShowSustainability] = useState(false);
    const [showProductCare, setShowProductCare] = useState(false);
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [buttonText, setButtonText] = useState('Add to Cart');
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // Set isLoggedIn to true if user exists, otherwise false
        });

        return () => unsubscribe();
    }, []);

    if (!products || products.length === 0) {
        return <div>Product data is not available.</div>;
    }

    const product = products.find((item) => item.id === parseInt(id));

    if (!product) {
        return <div>Product not found.</div>;
    }

    const handleImageClick = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    const handleAddToCart = () => {
        const existingProduct = cart.find((item) => item.id === product.id);
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            if (existingProduct) {
                setButtonText('Already in Cart');
            } else {
                dispatch(addToCart({ ...product, quantity: 1 }));
                setButtonText('Already in Cart');
                navigate('/cartpage');
            }
        }
    };


    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <>
            <div className="product-page">
                <div className="product-media">
                    {product.video ? (
                        <div className="media-container-video">
                            <video src={product.video} className="product-video" loop autoPlay muted
                                playsInline />
                        </div>

                    ) : (
                        product.images && product.images.length > 0 && (
                            <div className="media-container-img">
                                <img src={product.images[0]} alt="Product" className="product-video" />
                            </div>
                        )
                    )}
                </div>

                <div className="product-details">
                    <h2 className="product-name">{product.name}</h2>
                    <div className="price">
                        <p className="product-price">
                            ₹{product.price} (M.R.P. incl. of all taxes)
                        </p>
                    </div>

                    {product.material && (
                        <div className="property">
                            <div className="property-section">
                                <div className="property-left">
                                    <h3 className="property-title">Material</h3>
                                </div>
                                <div className="property-right">
                                    <p className="property-description">{product.material}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {product.color && (
                        <div className="property-section">
                            <div className="property-left">
                                <h3 className="property-title">Color</h3>
                            </div>
                            <div className="property-right">
                                <p className="property-description">{product.color}</p>
                            </div>
                        </div>
                    )}

                    <div className="action-buttons">
                        <button className="add-to-cart" onClick={handleAddToCart}>
                            {buttonText}
                        </button>
                        <button className="add-to-cart" onClick={handleCheckout}>
                            Proceed to Checkout
                        </button>
                    </div>

                    {feedbackMessage && (
                        <div className="feedback-message">
                            <p>{feedbackMessage}</p>
                        </div>
                    )}

                    <div className="About-Us">
                        <p>
                            Our Digital Concierge is available if you have any questions on this
                            product. <strong>Contact us</strong>
                        </p>
                    </div>

                    <div className="dropdown-section sustainbility">
                        <button
                            className="dropdown-toggle"
                            onClick={() => setShowSustainability(!showSustainability)}
                        >
                            Sustainability
                        </button>
                        {showSustainability && (
                            <div className={`dropdown-content ${showSustainability ? 'show' : ''}`}>
                                <p>
                                    The leather used in this product comes from a tannery audited and
                                    certified by the Leather Working Group (LWG), which is the highest
                                    environmental standard in terms of leather tanning. This standard
                                    requires tanneries to reduce their water and energy consumption, as
                                    well as their use of potentially hazardous substances. The tanneries
                                    we work with are located in Europe and are committed partners who work
                                    with us in our efforts for responsible sourcing and continuous
                                    improvement (implementation of material traceability systems, fighting
                                    against deforestation practices).
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="dropdown-section">
                        <button
                            className="dropdown-toggle"
                            onClick={() => setShowProductCare(!showProductCare)}
                        >
                            Product Care
                        </button>
                        {showProductCare && (
                            <div className={`dropdown-content ${showProductCare ? 'show' : ''}`}>
                                <p>
                                    To keep your Monogram canvas product beautiful as the years pass, we
                                    recommend following these guidelines for its care:
                                </p>
                                <ul>
                                    <li>
                                        Beware not to scratch or rub your product against abrasive
                                        surfaces, especially the leather trim.
                                    </li>
                                    <li>
                                        Keep your product away from damp or humid environments and avoid
                                        direct exposure to sunlight; keep your product away from any direct
                                        source of heat (radiators, car interiors overheated by the sun,
                                        etc.).
                                    </li>
                                    <li>
                                        Avoid contact with greasy substances, cosmetics, perfume, and
                                        hydroalcoholic solutions, as well as any material (magazines, other
                                        leathers, etc.) that may transfer their colored pigments onto the
                                        product.
                                    </li>
                                    <li>
                                        Keep your product away from water. Should it get wet or dirty on
                                        the surface, dry with a lint-free, light-colored, absorbent cloth.
                                        Never use soap or solvent.
                                    </li>
                                    <li>
                                        If your lining gets dirty or in case of superficial stains, we
                                        recommend that you wipe it with a soft and light-colored cloth.
                                    </li>
                                    <li>
                                        In order to protect your product when you are not using it, store
                                        it in the felt protective pouch provided.
                                    </li>
                                </ul>
                                <p>
                                    <strong>Natural cowhide leather:</strong> The trimmings are in natural
                                    cowhide leather; the skin is finished through a vegetal tanning
                                    process. Some natural marks or genuine irregularities in the leather
                                    may show through. Over time, this delicate leather, which is sensitive
                                    to scratches, will acquire a beautiful patina.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {product.images && product.images.length > 0 && (
                <div className="images-container">
                    {product.images.map((image, index) => (
                        <div
                            key={index}
                            className="media-container-images"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image}
                                alt={`Product Image ${index + 1}`}
                                className="product-img"
                            />
                        </div>
                    ))}
                </div>
            )}

            {fullscreenImage && (
                <div className="fullscreen-overlay" onClick={closeFullscreen}>
                    <img
                        src={fullscreenImage}
                        alt="Full Screen View"
                        className="fullscreen-image"
                    />
                    <button className="close-button" onClick={closeFullscreen}>
                        &times;
                    </button>
                </div>
            )}
        </>
    );
};

export default SingleProduct;




// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "../Styles/SingleProduct.css";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";

// // Redux action creators (assume these are defined in your Redux setup)
// import { addToCart } from "../redux/cartActions";

// const SingleProductPage = ({ products }) => {

//     const product = useSelector((state) => state.products.selectedProduct) || products;
//     console.log(product);
//     const cart = useSelector((state) => state.cart.items);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const [showSustainability, setShowSustainability] = useState(false);
//     const [showProductCare, setShowProductCare] = useState(false);
//     const [fullscreenImage, setFullscreenImage] = useState(null);
//     const [feedbackMessage, setFeedbackMessage] = useState("");

//     // State to manage button text
//     const [buttonText, setButtonText] = useState("Add to Cart");

//     const handleImageClick = (image) => {
//         setFullscreenImage(image);
//     };

//     const closeFullscreen = () => {
//         setFullscreenImage(null);
//     };

//     const handleAddToCart = () => {
//         const existingProduct = cart.find((item) => item.id === product.id);

//         if (existingProduct) {
//             setButtonText("Already in Cart");
//             setFeedbackMessage("Product is already in the cart!");
//         } else {
//             dispatch(addToCart({ ...product, quantity: 1 }));
//             setButtonText("Already in Cart");
//             setFeedbackMessage("Product added to cart successfully!");
//             setTimeout(() => {
//                 navigate("/cartpage");
//             }, 1000);
//         }
//     };

//     const handleCheckout = () => {
//         if (cart.length > 0) {
//             navigate("/checkout");
//         } else {
//             setFeedbackMessage("Your cart is empty. Add products before proceeding to checkout.");
//         }
//     };

//     return (
//         <>
//             <div className="product-page">
//                 <div className="product-media">
//                     {product.video ? (
//                         <div className="media-container-video">
//                             <video
//                                 src={product.video}
//                                 className="product-video"
//                                 loop
//                                 autoPlay
//                             />
//                         </div>
//                     ) : (
//                         product.images && product.images.length > 0 && (
//                             <div className="media-container-img">
//                                 <img
//                                     src={product.images[0]}
//                                     alt="First product image"
//                                     className="product-video"
//                                 />
//                             </div>
//                         )
//                     )}
//                 </div>

//                 <div className="product-details">
//                     <h2 className="product-name">{product.name}</h2>
//                     <div className="price">
//                         <p className="product-price">
//                             ₹{product.price}
//                             <br /> (M.R.P. incl. of all taxes)
//                         </p>
//                     </div>

//                     {/* Material Section */}
//                     {product.material && (
//                         <div className="property">
//                             <div className="property-section">
//                                 <div className="property-left">
//                                     <h3 className="property-title">Material</h3>
//                                 </div>
//                                 <div className="property-right">
//                                     <p className="property-description">{product.material}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Color Section */}
//                     {product.color && (
//                         <div className="property-section">
//                             <div className="property-left">
//                                 <h3 className="property-title">Color</h3>
//                             </div>
//                             <div className="property-right">
//                                 <p className="property-description">{product.color}</p>
//                             </div>
//                         </div>
//                     )}

//                     <div className="action-buttons">
//                         <button className="add-to-cart" onClick={handleAddToCart}>
//                             {buttonText}  {/* Dynamically change button text */}
//                         </button>
//                         <button className="add-to-cart" onClick={handleCheckout}>
//                             Proceed to Checkout
//                         </button>
//                     </div>

//                     {feedbackMessage && (
//                         <div className="feedback-message">
//                             <p>{feedbackMessage}</p>
//                         </div>
//                     )}

//                     <div className="About-Us">
//                         <p>
//                             Our Digital Concierge is available if you have any questions on this
//                             product. <strong>Contact us</strong>
//                         </p>
//                     </div>

//                     {/* Sustainability Dropdown */}
//                     <div className="dropdown-section sustainbility">
//                         <button
//                             className="dropdown-toggle"
//                             onClick={() => setShowSustainability(!showSustainability)}
//                         >
//                             Sustainability
//                         </button>
//                         {showSustainability && (
//                             <div className={`dropdown-content ${showSustainability ? "show" : ""}`}>
//                                 <p>
//                                     The leather used in this product comes from a tannery audited and
//                                     certified by the Leather Working Group (LWG), which is the highest
//                                     environmental standard in terms of leather tanning...
//                                 </p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Product Care Dropdown */}
//                     <div className="dropdown-section">
//                         <button
//                             className="dropdown-toggle"
//                             onClick={() => setShowProductCare(!showProductCare)}
//                         >
//                             Product Care
//                         </button>
//                         {showProductCare && (
//                             <div className={`dropdown-content ${showProductCare ? "show" : ""}`}>
//                                 <p>
//                                     To keep your Monogram canvas product beautiful as the years pass, we
//                                     recommend following these guidelines for its care...
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/* Images */}
//             {product.images && product.images.length > 0 && (
//                 <div className="images-container">
//                     {product.images.map((image, index) => (
//                         <div
//                             key={index}
//                             className="media-container-images"
//                             onClick={() => handleImageClick(image)}
//                         >
//                             <img
//                                 src={image}
//                                 alt={`Product Image ${index + 1}`}
//                                 className="product-img"
//                             />
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {fullscreenImage && (
//                 <div className="fullscreen-overlay" onClick={closeFullscreen}>
//                     <img
//                         src={fullscreenImage}
//                         alt="Full Screen View"
//                         className="fullscreen-image"
//                     />
//                     <button className="close-button" onClick={closeFullscreen}>
//                         &times;
//                     </button>
//                 </div>
//             )}

//             <div className="action-buttons">
//                 <button className="contact-us">Contact Concierge Services</button>
//             </div>
//         </>
//     );
// };

// export default SingleProductPage;
