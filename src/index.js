import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import MainPage from 'pages/MainPage'
import NotFound from 'pages/NotFound';
import EditProducts from './components/Admin/EditProducts';
import ProductNew from './pages/ProductNew';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import AllProducts from './pages/AllProducts';
import ProtectedRoute from 'pages/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,
    errorElement: <NotFound/>,
    children: [
      {index: true, element: <MainPage/>},
      {path: '/main', element: <MainPage/>},
      {path: '/admin', element: <EditProducts/>},
      {path: '/products', element: <AllProducts/>},
      {path: '/products/new', element: 
      (
        <ProtectedRoute requireAdmin>
            <ProductNew/>
        </ProtectedRoute>
      )},
      {path: '/products/:id', element: <ProductDetail/>},
      {path: '/cart', element: 
        (
          <ProtectedRoute>
              <CartPage/>
          </ProtectedRoute>
        )
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
