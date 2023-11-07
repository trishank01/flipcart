import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./componets/Home";
import Footer from "./componets/layout/Footer";
import Header from "./componets/layout/Header";
import {Toaster} from "react-hot-toast"
import ProductDetails from "./componets/product/ProductDetails";
import Login from "./componets/auth/Login";
import Register from "./componets/auth/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Toaster position="top-center"/>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product/:id" element={<ProductDetails/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
