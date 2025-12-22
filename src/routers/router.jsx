import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardLayout from "../layout/DashboardLayout";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivetRouter";
import Statistice from "../pages/Dashboard/Common/Statistics";
import AddBook from "../pages/Dashboard/Seller/AddBook";
import MyInventory from "../pages/Dashboard/Seller/MyInventory";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageOrders from '../pages/Dashboard/Seller/ManageOrders'
import Profile from '../pages/Dashboard/Common/Profile'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import AllBook from "../pages/AllBook/AllBook";
import BookDetails from "../pages/BookDetails/BookDetails";
import PaymentSucess from "../pages/Payment/PaymentSucess";
import ManageBooks from "../pages/Dashboard/Admin/ManageBooks";
import SellerRequest from "../pages/Dashboard/Admin/SellerRequest";
import SellerRoute from "./SellerRoute";
import AdminRoute from "./AdminRoute";
import MyWishlist from "../pages/MyWishlist/MyWishlist";
import Invoices from "../pages/Dashboard/Customer/Invoices";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
     errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path:'/covarage',
        Component: Coverage,
        loader: () => fetch('/services.json').then(res => res.json())
      },
      {
        path: '/all-books',
        Component: AllBook,
      },
      {
        path: '/book-details/:id',
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        )
      },
      {
        path: '/payment-success',
        element: <PaymentSucess></PaymentSucess>,

      },
      {
        path: '/wishlist',
        element: <MyWishlist></MyWishlist>
      }
   
    ]
  },
  {
  
      path: '/dashboard',
       element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistice />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-book',
        element: (
          <PrivateRoute>
           <SellerRoute>
             <AddBook />
           </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyInventory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'manage-users',
        element: (
          <PrivateRoute>
           <AdminRoute>
             <ManageUsers />
           </AdminRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'manage-books',
        element: (
          <PrivateRoute>
            <AdminRoute>
            <ManageBooks/>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'seller-request',
        element: (
          <PrivateRoute>
           <AdminRoute>
             <SellerRequest/>
           </AdminRoute>
          </PrivateRoute>
        ),
      },
       {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
       {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
       {
        path: 'invoices',
        element: (
          <PrivateRoute>
            <Invoices />
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: <PrivateRoute>
          <SellerRoute>
            <ManageOrders />,
          </SellerRoute>
        </PrivateRoute>
      },
    ]
    
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      },
    ]
  }
]);