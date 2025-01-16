// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux'; // Import useSelector to get cart state
// import '../Styles/Header.css';
// import logoimg from '../Images/HomePage-Main1/Logo.png';
// import { Link, useNavigate } from 'react-router-dom';
// import { auth } from '../Firebase'; // Import Firebase auth

// const Header = () => {
//     const [searchQuery, setSearchQuery] = useState('');
//     const [sideNavVisible, setSideNavVisible] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
//     const navigate = useNavigate();

//     const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state
//     const cartItemCount = cartItems.length; // Calculate the number of unique items in the cart

//     useEffect(() => {
//         const unsubscribe = auth.onAuthStateChanged((user) => {
//             setIsLoggedIn(!!user);
//         });
//         return () => unsubscribe();
//     }, []);

//     const toggleSideNav = () => {
//         setSideNavVisible(!sideNavVisible);
//         document.body.style.overflow = sideNavVisible ? 'auto' : 'hidden';
//     };

//     const closeSideNav = () => {
//         setSideNavVisible(false);
//         document.body.style.overflow = 'auto';
//     };

//     const handleUserIconClick = () => {
//         if (!isLoggedIn) {
//             navigate('/signup');
//         }
//     };

//     const handleLogout = async () => {
//         try {
//             await auth.signOut();
//             setIsLoggedIn(false);
//             setShowLogoutConfirm(false);
//             navigate('/');
//         } catch (error) {
//             console.error("Logout failed:", error.message);
//         }
//     };

//     const handleCancelLogout = () => {
//         setShowLogoutConfirm(false);
//     };

//     const handleSearchIconClick = () => {
//         navigate(`/search?query=${searchQuery}`);
//     };

//     const handleSearchTextClick = () => {
//         navigate(`/search?query=${searchQuery}`);
//     };

//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     const handleCartClick = () => {
//         if (!isLoggedIn) {
//             navigate('/login');
//         } else {
//             navigate('/cartpage');
//         }
//     };

//     return (
//         <div>
//             <div className="Header">
//                 <div className="Left-Side">
//                     <i className="fa-solid fa-bars menu-icon" onClick={toggleSideNav}></i>
//                     <span className="menu-text" onClick={toggleSideNav}>Menu</span>
//                     <i
//                         className="fa-solid fa-magnifying-glass search-icon"
//                         onClick={handleSearchIconClick}
//                     ></i>
//                     <span
//                         className="search-text"
//                         onClick={handleSearchTextClick}
//                     >
//                         Search
//                     </span>
//                 </div>
//                 <div className="Middle">
//                     <p>LOUIS VUITTON</p>
//                     <img src={logoimg} alt="" className="Small-screen" />
//                 </div>
//                 <div className="Right-Side">
//                     <div className="cart-icon-container" onClick={handleCartClick}>
//                         <i
//                             className="fa-solid fa-cart-shopping"
//                             style={{ cursor: "pointer" }}
//                         ></i>
//                         {cartItemCount > 0 && (
//                             <span className="cart-counter">{cartItemCount}</span>
//                         )}
//                     </div>
//                     {isLoggedIn ? (
//                         <button
//                             className="logout-button"
//                             onClick={() => setShowLogoutConfirm(true)}
//                         >
//                             <i
//                                 className="fa-solid fa-arrow-right-from-bracket"
//                                 style={{ color: 'red' }}
//                             ></i>
//                         </button>
//                     ) : (
//                         <i className="fa-regular fa-user user-icon" style={{ color: "red", cursor: "pointer" }} onClick={handleUserIconClick}></i>
//                     )}
//                 </div>
//             </div>

//             <div className={`Side-Nav ${sideNavVisible ? 'visible' : ''}`}>
//                 <button className="close-btn" onClick={closeSideNav}><i class="fa-solid fa-x close"></i></button>
//                 <ul>
//                     <Link to="/WomenBags" onClick={closeSideNav}><li>Women's Bag</li></Link>
//                     <Link to="/WomenSmallLeatherGoods" onClick={closeSideNav}><li>Women's Small Leather Goods</li></Link>
//                     <Link to="/MenSmallLeatherGoods" onClick={closeSideNav}><li>Men's Small Leather Goods</li></Link>
//                     <Link to="/TravellingCollection" onClick={closeSideNav}><li>Travelling Collection</li></Link>
//                     <Link to="/MenBelts" onClick={closeSideNav}><li>Men's Belt</li></Link>
//                     <Link to="/Perfumes" onClick={closeSideNav}><li>Perfumes</li></Link>
//                     <Link to="/WomensAccessories" onClick={closeSideNav}><li>Women's Accessories</li></Link>
//                     <Link to="/MensShoes" onClick={closeSideNav}><li>Men's Shoes</li></Link>
//                 </ul>
//             </div>

//             {showLogoutConfirm && (
//                 <div className="logout-popup">
//                     <div className="popup-content">
//                         <p>Are you sure you want to log out?</p>
//                         <button className="confirm-button" onClick={handleLogout}>Yes</button>
//                         <button className="cancel-button" onClick={handleCancelLogout}>No</button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Header;



import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector to get cart state
import '../Styles/Header.css';
import logoimg from '../Images/HomePage-Main1/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase'; // Import Firebase auth

const Header = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sideNavVisible, setSideNavVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false); // Track scroll state
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux state
    const cartItemCount = cartItems.length; // Calculate the number of unique items in the cart

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
        });
        return () => unsubscribe();
    }, []);

    const toggleSideNav = () => {
        setSideNavVisible(!sideNavVisible);
        document.body.style.overflow = sideNavVisible ? 'auto' : 'hidden';
    };

    const closeSideNav = () => {
        setSideNavVisible(false);
        document.body.style.overflow = 'auto';
    };

    const handleUserIconClick = () => {
        if (!isLoggedIn) {
            navigate('/signup');
        }
    };

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false);
            setShowLogoutConfirm(false);
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error.message);
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutConfirm(false);
    };

    const handleSearchIconClick = () => {
        navigate(`/search?query=${searchQuery}`);
    };

    const handleSearchTextClick = () => {
        navigate(`/search?query=${searchQuery}`);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleCartClick = () => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/cartpage');
        }
    };

    return (
        <div>
            <div className={`Header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="Left-Side">
                    <i className="fa-solid fa-bars menu-icon" onClick={toggleSideNav}></i>
                    <span className="menu-text" onClick={toggleSideNav}>Menu</span>
                    <i
                        className="fa-solid fa-magnifying-glass search-icon"
                        onClick={handleSearchIconClick}
                    ></i>
                    <span
                        className="search-text"
                        onClick={handleSearchTextClick}
                    >
                        Search
                    </span>
                </div>
                <div className="Middle">
                    <p>LOUIS VUITTON</p>
                    <img src={logoimg} alt="" className="Small-screen" />
                </div>
                <div className="Right-Side">
                    <div className="cart-icon-container" onClick={handleCartClick}>
                        <i
                            className="fa-solid fa-cart-shopping"
                            style={{ cursor: "pointer" }}
                        ></i>
                        {cartItemCount > 0 && (
                            <span className="cart-counter">{cartItemCount}</span>
                        )}
                    </div>
                    {isLoggedIn ? (
                        <button
                            className="logout-button"
                            onClick={() => setShowLogoutConfirm(true)}
                        >
                            <i
                                className="fa-solid fa-arrow-right-from-bracket"
                                style={{ color: 'red' }}
                            ></i>
                        </button>
                    ) : (
                        <i className="fa-regular fa-user user-icon" style={{ color: "red", cursor: "pointer" }} onClick={handleUserIconClick}></i>
                    )}
                </div>
            </div>

            <div className={`Side-Nav ${sideNavVisible ? 'visible' : ''}`}>
                <button className="close-btn" onClick={closeSideNav}><i class="fa-solid fa-x close"></i></button>
                <ul>
                    <Link to="/WomenBags" onClick={closeSideNav}><li>Women's Bag</li></Link>
                    <Link to="/WomenSmallLeatherGoods" onClick={closeSideNav}><li>Women's Small Leather Goods</li></Link>
                    <Link to="/MenSmallLeatherGoods" onClick={closeSideNav}><li>Men's Small Leather Goods</li></Link>
                    <Link to="/TravellingCollection" onClick={closeSideNav}><li>Travelling Collection</li></Link>
                    <Link to="/MenBelts" onClick={closeSideNav}><li>Men's Belt</li></Link>
                    <Link to="/Perfumes" onClick={closeSideNav}><li>Perfumes</li></Link>
                    <Link to="/WomensAccessories" onClick={closeSideNav}><li>Women's Accessories</li></Link>
                    <Link to="/MensShoes" onClick={closeSideNav}><li>Men's Shoes</li></Link>
                </ul>
            </div>

            {showLogoutConfirm && (
                <div className="logout-popup">
                    <div className="popup-content">
                        <p>Are you sure you want to log out?</p>
                        <button className="confirm-button" onClick={handleLogout}>Yes</button>
                        <button className="cancel-button" onClick={handleCancelLogout}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
