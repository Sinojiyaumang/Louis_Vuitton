// import { useSelector, useDispatch } from "react-redux";
// import { incrementQuantity, decrementQuantity, removeItemFromCart } from "../redux/cartActions";
// import { useNavigate, Link } from "react-router-dom";
// import { useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
// import "../Styles/CartPage.css"; // Custom CSS for the cart page

// const CartPage = () => {
//     const cart = useSelector((state) => state.cart.items); // Get cart items from Redux state
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Calculate subtotal and total items
//     const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

//     // Load cart from local storage if Redux cart is empty
//     useEffect(() => {
//         if (cart.length === 0) {
//             const savedCart = JSON.parse(localStorage.getItem("cart"));
//             if (savedCart) {
//                 savedCart.forEach((item) => {
//                     dispatch({ type: "ADD_TO_CART", payload: item });
//                 });
//             }
//         }
//     }, [cart, dispatch]);

//     // Save cart to local storage whenever the cart changes
//     useEffect(() => {
//         localStorage.setItem("cart", JSON.stringify(cart));
//     }, [cart]);

//     // Navigate to checkout page
//     const handleCheckout = () => {
//         navigate("/checkout");
//     };

//     // Handle item removal and update local storage
//     const handleRemove = (id) => {
//         dispatch(removeItemFromCart(id));
//         // Update local storage after removing the item
//         const updatedCart = cart.filter((item) => item.id !== id);
//         localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to local storage
//     };

//     return (
//         <div className="cart-page container">
//             {cart.length === 0 ? (
//                 <div className="warnings">
//                     <p className="empty-cart-message text-center empty">Your cart is empty!</p>
//                     <Link to="/">
//                         <strong>
//                             <p className="empty-cart-message text-center text-black shopping">Continue Shopping</p>
//                         </strong>
//                     </Link>
//                 </div>
//             ) : (
//                 <>
//                     <div className="row">
//                         {cart.map((item) => (
//                             <div className="col-md-4 mb-4" key={item.id}>
//                                 <div className="card">
//                                     <img
//                                         src={item.images[0]}
//                                         alt={item.name}
//                                         className="card-img-top"
//                                         style={{
//                                             objectFit: "contain",
//                                             width: "100%",
//                                             height: "200px",
//                                             objectPosition: "center",
//                                         }}
//                                     />
//                                     <div className="card-body">
//                                         <h5 className="card-title">{item.name}</h5>
//                                         <p className="card-price">₹{item.price}</p>
//                                         <div className="quantity-controls d-flex justify-content-between align-items-center">
//                                             <button
//                                                 className="btn btn-light"
//                                                 onClick={() => dispatch(decrementQuantity(item.id))}
//                                                 disabled={item.quantity <= 1}
//                                             >
//                                                 -
//                                             </button>
//                                             <span className="quantity-display">{item.quantity}</span>
//                                             <button
//                                                 className="btn btn-light"
//                                                 onClick={() => dispatch(incrementQuantity(item.id))}
//                                             >
//                                                 +
//                                             </button>
//                                         </div>
//                                         <p className="subtotal mt-3">Subtotal: ₹{item.price * item.quantity}</p>
//                                         <button
//                                             className="btn btn-danger w-100 mt-3"
//                                             onClick={() => handleRemove(item.id)}
//                                         >
//                                             Remove
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="cart-summary mt-4 p-3 bg-light rounded">
//                         <p className="summary-text">
//                             <strong>Total Items:</strong> {totalItems}
//                         </p>
//                         <p className="summary-text">
//                             <strong>Subtotal:</strong> ₹{subtotal}
//                         </p>
//                         <button
//                             className="btn w-100"
//                             onClick={handleCheckout}
//                             style={{
//                                 backgroundColor: "black",
//                                 color: "white",
//                             }}
//                         >
//                             Proceed to Checkout
//                         </button>
//                     </div>
//                 </>
//             )}
//         </div>
//     );
// };

// export default CartPage;



import { useSelector, useDispatch } from "react-redux";
import {
    incrementQuantity,
    decrementQuantity,
    removeItemFromCart,
    clearCart,
} from "../redux/cartActions"; // Import clearCart action
import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../Styles/CartPage.css"; // Custom CSS for the cart page

const CartPage = () => {
    const cart = useSelector((state) => state.cart.items); // Get cart items from Redux state
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Calculate subtotal and total items
    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    // Load cart from local storage if Redux cart is empty
    useEffect(() => {
        if (cart.length === 0) {
            const savedCart = JSON.parse(localStorage.getItem("cart"));
            if (savedCart) {
                savedCart.forEach((item) => {
                    dispatch({ type: "ADD_TO_CART", payload: item });
                });
            }
        }
    }, [cart, dispatch]);

    // Save cart to local storage whenever the cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // Navigate to checkout page
    const handleCheckout = () => {
        navigate("/checkout");
    };

    // Handle item removal and update local storage
    const handleRemove = (id) => {
        dispatch(removeItemFromCart(id));
        const updatedCart = cart.filter((item) => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save updated cart to local storage
    };

    // Handle clearing the cart
    const handleClearCart = () => {
        dispatch(clearCart());
        localStorage.removeItem("cart"); // Clear cart from local storage
    };

    return (
        <div className="cart-page container">
            {cart.length === 0 ? (
                <div className="warnings">
                    <p className="empty-cart-message text-center empty">Your cart is empty!</p>
                    <Link to="/">
                        <strong>
                            <p className="empty-cart-message text-center text-black shopping">
                                Continue Shopping
                            </p>
                        </strong>
                    </Link>
                </div>
            ) : (
                <>
                    <div className="row">
                        {cart.map((item) => (
                            <div className="col-md-4 mb-4" key={item.id}>
                                <div className="card">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="card-img-top"
                                        style={{
                                            objectFit: "contain",
                                            width: "100%",
                                            height: "200px",
                                            objectPosition: "center",
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-price">₹{item.price}</p>
                                        <div className="quantity-controls d-flex justify-content-between align-items-center">
                                            <button
                                                className="btn btn-light"
                                                onClick={() => dispatch(decrementQuantity(item.id))}
                                                disabled={item.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="quantity-display">{item.quantity}</span>
                                            <button
                                                className="btn btn-light"
                                                onClick={() => dispatch(incrementQuantity(item.id))}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <p className="subtotal mt-3">
                                            Subtotal: ₹{item.price * item.quantity}
                                        </p>
                                        <button
                                            className="btn btn-danger w-100 mt-3"
                                            onClick={() => handleRemove(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary mt-4 p-3 bg-light rounded">
                        <p className="summary-text">
                            <strong>Total Items:</strong> {totalItems}
                        </p>
                        <p className="summary-text">
                            <strong>Subtotal:</strong> ₹{subtotal}
                        </p>
                        <button
                            className="btn btn-danger w-100 mt-3"
                            onClick={handleClearCart}
                        >
                            Clear Cart
                        </button>
                        <button
                            className="btn w-100"
                            onClick={handleCheckout}
                            style={{
                                backgroundColor: "black",
                                color: "white",
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
