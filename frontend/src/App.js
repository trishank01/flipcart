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
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
