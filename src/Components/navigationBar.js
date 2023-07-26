import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

export default function Navigationbar() {
  const [show, setShow] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const [name, setName] = useState("");
  const Navigate = useNavigate("");

  const logout = () => {
    localStorage.removeItem("aircraft-trading-platform-token");
    localStorage.removeItem("aircraft-trading-platform-user-name");
    localStorage.removeItem("aircraft-trading-platform-user-email");
    localStorage.removeItem("aircraft-trading-platform-user-role");
    setShow(true);
    Navigate("/login");
  };

  // eslint-disable-next-line
  useEffect(() => {
    if (localStorage.getItem("aircraft-trading-platform-token")) {
      //   fetchUser();
      setName(localStorage.getItem("aircraft-trading-platform-user-name"));
      setShow(false);
    } else {
      setShow(true);
    }

    if (
      localStorage.getItem("aircraft-trading-platform-user-role") === "SELLER"
    ) {
      setIsSeller(true);
      setIsBuyer(false);
    } else {
      setIsSeller(false);
    }

    if (
      localStorage.getItem("aircraft-trading-platform-user-role") === "BUYER"
    ) {
      setIsBuyer(true);
      setIsSeller(false);
    } else {
      setIsBuyer(false);
    }
  });
  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-pills">
      <NavLink className="navbar-brand" to={""}>
        <h3 className="">
          <i className="fa fa-plane fa-2x"></i>AERO-<em>TRADE</em>
          <br />
        </h3>
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto" style={{ fontSize: "22px" }}>
          <li className="nav-itme ml-3">
            <NavLink className={"nav-link"} to={"/"}>
              Home
            </NavLink>
          </li>
          {show === false ? (
            <>
              <li className="nav-item ml-3">
                <NavLink className="nav-link" to={"/products"}>
                  All-Products
                </NavLink>
              </li>
              <li className="nav-item ml-3">
                <NavLink className="nav-link" to={"/orders"}>
                  Orders
                </NavLink>
              </li>
            </>
          ) : null}
          <li className="nav-item ml-3">
            {isSeller === true ? (
              <NavLink className="nav-link" to={"/addproduct"}>
                Add Product
              </NavLink>
            ) : null}
          </li>
          {isSeller === true ? (
            <li className="nav-item ml-3">
              <NavLink className="nav-link" to={"/myproducts"}>
                My-Products
              </NavLink>
            </li>
          ) : null}
          {isBuyer === true ? (
            <li className="nav-item ml-3">
              <NavLink className="nav-link" to={"/cart"}>
                My-Cart
              </NavLink>
            </li>
          ) : null}
          {show === false?
          <li className="nav-item-ml-3">
            <NavLink className="nav-link" to={"/chat"} state={[]}>Chat</NavLink>
          </li>:null}
          <li className="nav-item ml-3">
            {show === true ? (
              <NavLink className="nav-link" to={"/signup"}>
                SignUp
              </NavLink>
            ) : (
              <NavLink className="nav-link" to={"/profile"}>
                {name}
              </NavLink>
            )}
          </li>
          <li className="nav-item ml-3">
            {show === true ? (
              <NavLink className="nav-link" to={"/login"}>
                Login
              </NavLink>
            ) : (
              <NavLink onClick={logout} className="nav-link" to={"/login"}>
                logout
              </NavLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
