import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { clearCart } from "../redux/cartActions";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/CheckoutPage.css";

const CheckoutPage = () => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    const [paymentDetails, setPaymentDetails] = useState({
        cardHolder: "",
        cardNumber: "",
        expirationDate: "",
        securityCode: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!paymentDetails.cardHolder || !paymentDetails.cardNumber || !paymentDetails.expirationDate || !paymentDetails.securityCode) {
            alert("Please fill in all payment details.");
            return;
        }

        console.log("Payment Details Submitted:", paymentDetails);
        dispatch(clearCart());
        localStorage.removeItem("cart");
        alert("Order Placed Successfully");
        navigate("/");
    };

    return (
        <div className="checkout-page container my-5">
            <div className="row">
                {/* Left Side: Cart Items */}
                <div className="col-md-8 left-side">
                    <h2 className="mb-4">Your Cart</h2>
                    {cart.length === 0 ? (
                        <p>Your cart is empty!</p>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="cart-item d-flex align-items-center mb-3"
                                    style={{
                                        border: "1px solid grey",
                                        boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.2)",
                                        padding: "10px",
                                        borderRadius: "8px",
                                    }}
                                >
                                    {/* Product Image */}
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="img-thumbnail me-3"
                                        style={{
                                            width: "120px",
                                            height: "120px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            border: "2px solid black",
                                        }}
                                    />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p>Quantity: {item.quantity}</p>
                                    </div>
                                    <p className="ms-auto">₹{item.price * item.quantity}</p>
                                </div>
                            ))}
                            <div className="d-flex justify-content-between mt-3">
                                <h4>Total Items: {totalItems}</h4>
                                <h4>Subtotal: ₹{subtotal}</h4>
                            </div>
                        </>
                    )}
                </div>

                {/* Right Side: Payment Form */}
                <div className="col-md-4 right-side">
                    <h2 className="mb-4">Payment Information</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="cardHolder" className="form-label">Cardholder Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardHolder"
                                name="cardHolder"
                                value={paymentDetails.cardHolder}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input
                                type="text"
                                className="form-control"
                                id="cardNumber"
                                name="cardNumber"
                                value={paymentDetails.cardNumber}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="expirationDate" className="form-label">Expiration Date</label>
                            <input
                                type="month"
                                className="form-control"
                                id="expirationDate"
                                name="expirationDate"
                                value={paymentDetails.expirationDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="securityCode" className="form-label">Security Code (CVV)</label>
                            <input
                                type="text"
                                className="form-control"
                                id="securityCode"
                                name="securityCode"
                                value={paymentDetails.securityCode}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">Place Order</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
