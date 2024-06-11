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
import PrivateRoute from './route/PrivateRoute';
import AdminRoute from './route/AdminRoute';
import AgentProfile from './pages/dashboard/Agent/AgentProfile';
import AddProperty from './pages/dashboard/Agent/AddProperty';

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
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // Admin Routes
      {
        path: 'adminprofile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageusers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manageproperties',
        element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
      },
      {
        path: 'managereviews',
        element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
      },

      // Agent Routes

      {
        path: 'agentprofile',
        element: <AgentProfile></AgentProfile>
      },
      {
        path: 'addproperty',
        element: <AddProperty></AddProperty>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
