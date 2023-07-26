import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Normal/login";
import SignUp from "./Pages/Normal/signUp";
import Footer from "./Components/footer";
import Navigationbar from "./Components/navigationBar";
import ForgotPassword from "./Pages/Normal/ForgotPassword";
import ChangePassword from "./Pages/Normal/ChangePassword";
import Home from "./Pages/Normal/Home";
import { useEffect, useState } from "react";
import AddProduct from "./Pages/SellerPages/AddProduct";
import Profile from "./Pages/Common/Profile";
import MyProducts from "./Pages/SellerPages/MyProducts";
import AllProducts from "./Pages/Common/AllProducts";
import Cart from './Pages/Buyer/Cart';
import Chatting from "./Pages/Chatting";
import Orders from './Pages/Common/Orders';

function App() {
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("aircraft-trading-platform-token")) {
      if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "BUYER"
      ) {
        setIsBuyer(true);
        setIsSeller(false);
      } else if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "SELLER"
      ) {
        setIsBuyer(false);
        setIsSeller(true);
      }
    } else {
      setIsBuyer(false);
      setIsSeller(false);
    }
    // eslint-disable-next-line
  }, []);
  //Functions
  return (
    <div className="App">
      <BrowserRouter>
        <Navigationbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/change" element={<ChangePassword />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/chat" element={<Chatting />} />
        </Routes>
        {isSeller === true ? (
          <Routes>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/myproducts" element={<MyProducts />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        ) : null}
        {isBuyer === true ? (
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        ):null}
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
