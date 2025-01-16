import axios from 'axios';
import * as types from './actionTypes';

// Action creators
export const fetchProductsRequest = () => ({
  type: types.FETCH_PRODUCTS_REQUEST,
});

export const fetchProductsSuccess = (products) => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

export const fetchProductsFailure = (error) => ({
  type: types.FETCH_PRODUCTS_FAILURE,
  payload: error,
});

export const setCategory = (category) => ({
  type: types.SET_CATEGORY,
  payload: category,
});

export const setSelectedProduct = (product) => ({
  type: types.SET_SELECTED_PRODUCT,
  payload: product,
});

// Thunk for fetching all products
export const fetchProducts = () => async (dispatch) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await axios.get(`${process.env.PUBLIC_URL}https://louis-vuitton-data.onrender.com/products`); // Ensure the path is correct
    dispatch(fetchProductsSuccess(response.data)); // Dispatch success with data
  } catch (error) {
    dispatch(fetchProductsFailure(error.message)); // Dispatch failure with error message
  }
};



