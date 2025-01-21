// cartReducer.js
const initialState = {
    items: JSON.parse(localStorage.getItem("cartItems")) || [],
};

const cartReducer = (state = initialState, action) => {
    let updatedItems;

    switch (action.type) {
        case "LOAD_CART":
            return {
                ...state,
                items: action.payload,
            };
        case "ADD_TO_CART":
            updatedItems = [...state.items, action.payload];
            localStorage.setItem("cartItems", JSON.stringify(updatedItems)); 
            return {
                ...state,
                items: updatedItems,
            };
        case "REMOVE_ITEM_FROM_CART":
            updatedItems = state.items.filter(item => item.id !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(updatedItems)); 
            return {
                ...state,
                items: updatedItems,
            };
        case "INCREMENT_QUANTITY":
            updatedItems = state.items.map(item =>
                item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            return {
                ...state,
                items: updatedItems,
            };
        case "DECREMENT_QUANTITY":
            updatedItems = state.items.map(item =>
                item.id === action.payload ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedItems)); 
            return {
                ...state,
                items: updatedItems,
            };
        case "CLEAR_CART":
            localStorage.setItem("cartItems", JSON.stringify([]));
            return {
                ...state,
                items: [], 
            };
        default:
            return state;
    }
};

export default cartReducer;