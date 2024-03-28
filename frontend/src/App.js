import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./componets/Home";
import Footer from "./componets/layout/Footer";
import Header from "./componets/layout/Header";
import { Toaster } from "react-hot-toast";
import ProductDetails from "./componets/product/ProductDetails";
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";
import Profile from "./componets/user/Profile";
import UpdateProfile from "./componets/user/UpdateProfile";
import ProtectedRoute from "./componets/auth/ProtectedRoute";
import UploadAvatar from "./componets/user/UploadAvatar";
import UpdatePassword from "./componets/user/UpdatePassword";
import ForgotPassword from "./componets/user/ForgotPassword";
import ResetPassword from "./componets/auth/ResetPassword";
import Cart from "./componets/cart/Cart";
import Shipping from "./componets/cart/Shipping";
import ConfirmOrder from "./componets/cart/ConfirmOrder";
import PaymentMethod from "./componets/cart/PaymentMethod";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center" />
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute>
                  <Shipping />
                </ProtectedRoute>
              }
            />
                 <Route
              path="/confirm_order"
              element={
                <ProtectedRoute>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
                     <Route
              path="/payment_method"
              element={
                <ProtectedRoute>
                  <PaymentMethod />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update_profile"
              element={
                <ProtectedRoute>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/upload_avatar"
              element={
                <ProtectedRoute>
                  <UploadAvatar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/me/update_password"
              element={
                <ProtectedRoute>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
