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
import AgentRoute from './route/AgentRoute';
import MyAddedProperties from './pages/dashboard/Agent/MyAddedProperties';
import UpdateProperty from './pages/dashboard/Agent/UpdateProperty';
import MySoldProperties from './pages/dashboard/Agent/MySoldProperties';
import CustomerProfile from './pages/dashboard/Customer/CustomerProfile';
import AllProperties from './pages/allproperties/AllProperties';
import PropertyDetails from './pages/allproperties/PropertyDetails';
import MyReviews from './pages/dashboard/Customer/MyReviews';
import MyWishlist from './pages/dashboard/Customer/MyWishlist';
import OfferPage from './pages/dashboard/Customer/OfferPage';
import OfferedProperties from './pages/dashboard/Agent/OfferedProperties';
import Payment from './pages/dashboard/Customer/Payment';
import BuyProperty from './pages/dashboard/Customer/BuyProperty';
import PropertyBought from './pages/dashboard/Customer/PropertyBought';

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
      },
      {
        path: "allproperties",
        element: <AllProperties></AllProperties>
      },
      {
        path: 'propertydetails/:id',
        element: <PropertyDetails></PropertyDetails>,
        loader: ({ params }) => fetch(`https://mughal-server.vercel.app/properties/${params.id}`)
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
        element: <AgentRoute><AgentProfile></AgentProfile></AgentRoute>
      },
      {
        path: 'addproperty',
        element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
      },
      {
        path: 'myaddedproperties',
        element: <AgentRoute><MyAddedProperties></MyAddedProperties></AgentRoute>
      },
      {
        path: 'updateproperty/:id',
        element: <AgentRoute><UpdateProperty></UpdateProperty></AgentRoute>,
        loader: ({ params }) => fetch(`https://mughal-server.vercel.app/properties/${params.id}`)
      },
      {
        path: 'offeredproperties',
        element: <OfferedProperties></OfferedProperties>
      },
      {
        path: 'mysoldproperties',
        element: <AgentRoute><MySoldProperties></MySoldProperties></AgentRoute>
      },

      // Customer Routes
      {
        path: 'myprofile',
        element: <CustomerProfile></CustomerProfile>
      },
      {
        path: 'myreviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'mywishlist',
        element: <MyWishlist></MyWishlist>
      },
      {
        path: 'makeoffer/:id',
        element: <OfferPage></OfferPage>,
      },
      {
        path: 'buyproperty',
        element: <BuyProperty></BuyProperty>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>
      },
      {
        path: 'propertybought',
        element: <PropertyBought></PropertyBought>
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
