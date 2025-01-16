// cartReducer.js
const initialState = {
    items: [],
};

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOAD_CART":
            return {
                ...state,
                items: action.payload,
            };
        case "ADD_TO_CART":
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        case "REMOVE_ITEM_FROM_CART":
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),  // Remove item by id
            };
        case "INCREMENT_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                ),
            };
        case "DECREMENT_QUANTITY":
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
                ),
            };
        case "CLEAR_CART":
            return {
                ...state,
                items: [],  // Clears all items from the cart
            };
        default:
            return state;
    }
};

export default cartReducer;
