// {
//   "id": 102,
//   "name": "",
//   "price": ,
//   "material": "",
//   "color": "",
//   "images": [
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       "",
//       ""
//   ],
//   "video": "",
//   "category": "Travel Bags",
//   "subcategory": "Hand Bags"
// },

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; // Redux store
import ErrorBoundary from './Components/ErrorBoundary'; // Adjust the path based on your folder structure

// Import Components
import Gifting from './Components/Gifting';
import Header from './Components/Header';
import CategoryCard from './Components/CategoryCard';
import Footer from './Components/Footer';

// Import Pages
import HomePage from './Pages/HomePage';
import WomenBags from './Pages/WomenBags';
import SingleProduct from './Pages/SingleProduct'; // Import the SingleProduct component
import WomenSmallLeatherGoods from './Pages/WomenSmallLeatherGoods';
import MenSmallLeatherGoods from './Pages/MenSmallLeatherGoods';
import TravelBags from './Pages/TravelBags';
import MenBelts from './Pages/MenBelts';
import Login from './Pages/Login'
import SignUp from './Pages/SignUp';
import SearchPage from './Pages/SearchPage';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, setCategory } from './redux/productAction';
import Perfumes from './Pages/Perfumes';
import WomensAccessories from './Pages/WomensAccessories';
import MenShoes from './Pages/MenShoes';
import CartPage from './Pages/CartPage'
import CheckoutPage from './Pages/CheckoutPage';

function App() {
  const dispatch = useDispatch();
  const { products, loading, error, category } = useSelector((state) => state.products);

  // console.log(products)

  // Fetch products when the app mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Handle category changes for filtering
  const handleCategoryChange = (category) => {
    dispatch(setCategory(category));
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Header products={products} />
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <HomePage
                  gifting={<Gifting />}
                  categorycards={<CategoryCard />}
                />
              }
            />

            {/* Women Bags Page */}
            <Route
              path="/WomenBags"
              element={
                loading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p>Error loading products: {error}</p>
                ) : (
                  <WomenBags products={products} />
                )
              }
            />

            {/* Single Product Page */}
            <Route
              path="/SingleProduct/:id"
              element={
                loading ? (
                  <p>Loading product details...</p>
                ) : error ? (
                  <p>Error loading product details: {error}</p>
                ) : (
                  // <ErrorBoundary>

                  <SingleProduct products={products}/>
                  // </ErrorBoundary>
                )
              }
              />

            {/* Other Category Pages */}
            <Route
              path="/WomenSmallLeatherGoods"
              element={<WomenSmallLeatherGoods products={products} />}
            />
            <Route
              path="/MenSmallLeatherGoods"
              element={<MenSmallLeatherGoods products={products} />}
            />
            <Route
              path="/TravellingCollection"
              element={<TravelBags products={products} />}
            />
            <Route
              path="/MenBelts"
              element={<MenBelts products={products} />}
            />

            <Route
              path="/Perfumes"
              element={<Perfumes products={products} />}
            />

            <Route
              path="/WomensAccessories"
              element={<WomensAccessories products={products} />}
            />

            <Route
              path="/MensShoes"
              element={<MenShoes products={products} />}
            />

            <Route path="/cartpage" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/search" element={<SearchPage />} product={products}/>

            {/* Fallback Route */}
            <Route path="*" element={<HomePage />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </Provider>
  );
}

export default App;
