import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import store from '../stores/store.js';

import './index.css'
import HomePage from './Pages/home.jsx';
import LoginPage from './Pages/login.jsx';
import VerificationPage from './Pages/verification.jsx'
import ReverificationPage from './Pages/reverification.jsx';
import RegisterPage from './Pages/register.jsx';
import ProtectRoutes from './utils/ProtectRoutes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectRoutes>
      <HomePage />
    </ProtectRoutes>,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/verify-email/:token',
    element: <VerificationPage />
  },
  {
    path: '/reverify',
    element: <ReverificationPage />
  },
  {
    path:'*',
    element: <h1>Page not found</h1>
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
