import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/home/Home';
import Main from './layout/Main';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import AuthProvider from './provider/AuthProvider';
import Dashboard from './layout/Dashboard';
import AdminProfile from './pages/dashboard/Admin/AdminProfile';
import ManageUsers from './pages/dashboard/Admin/ManageUsers';
import ManageProperties from './pages/dashboard/Admin/ManageProperties';
import ManageReviews from './pages/dashboard/Admin/ManageReviews';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      }
    ],
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      // Admin Routes
      {
        path: 'adminprofile',
        element: <AdminProfile></AdminProfile>
      },
      {
        path: 'manageusers',
        element: <ManageUsers></ManageUsers>
      },
      {
        path: 'manageproperties',
        element: <ManageProperties></ManageProperties>
      },
      {
        path: 'managereviews',
        element: <ManageReviews></ManageReviews>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
