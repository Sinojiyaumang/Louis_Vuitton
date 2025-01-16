import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk'; // Correct import for redux-thunk
import productReducer from './productReducer';
import cartReducer from './cartReducer'; // Import your cart reducer

// Combine all reducers
const rootReducer = combineReducers({
  products: productReducer, // Handles product-related state
  cart: cartReducer, // Handles cart-related state
});

// Middleware
const middleware = [thunk];

// Create the Redux store
const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
