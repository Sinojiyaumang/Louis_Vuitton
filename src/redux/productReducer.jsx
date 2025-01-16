import * as types from './actionTypes';

const initialState = {
  products: [],
  loading: false,
  error: null,
  category: 'all', // Default category

  selectedProduct: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_PRODUCTS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_PRODUCTS_SUCCESS:
      return { ...state, loading: false, products: action.payload };

    case types.FETCH_PRODUCTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.SET_CATEGORY:
      return { ...state, category: action.payload };

    case types.SET_SELECTED_PRODUCT:
      return { ...state, selectedProduct: action.payload };

    default:
      return state;
  }
};

export default productReducer;



