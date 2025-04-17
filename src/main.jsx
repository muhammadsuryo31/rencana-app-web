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
import LandingPage from './Pages/landingPage.jsx';
import NotFoundPage from './Pages/notFound.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element:<LandingPage />
  },
  {
    path: '/dashboard',
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
    element: <NotFoundPage />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
