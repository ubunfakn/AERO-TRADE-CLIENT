import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function Login() {
  //Declarations
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate = useNavigate("");
  //Declarations

  //Functions
  const getData = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = {
        email,
        password,
      };
      fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          if (resolve.status === 200) {
            resolve
              .json()
              .then((resultJson) => {
                console.log(resultJson);
                localStorage.setItem(
                  "aircraft-trading-platform-user-email",
                  resultJson.user.email
                );
                localStorage.setItem(
                  "aircraft-trading-platform-user-name",
                  resultJson.user.name
                );
                localStorage.setItem(
                  "aircraft-trading-platform-token",
                  resultJson.token
                );
                localStorage.setItem(
                  "aircraft-trading-platform-user-role",
                  resultJson.user.role
                );
                localStorage.setItem(
                  "aircraft-trading-platform-user-id",
                  resultJson.user._id
                );
                if (resultJson.user.role === "SELLER") Navigate("/myproducts");
                else if (resultJson.user.role === "BUYER")
                  Navigate("/products");
              })
              .catch((error) => {
                toast.error(error + " Please try again later...", toastOptions);
              });
          } else {
            toast.error("Invalid Credentials!!", toastOptions);
          }
        })
        .catch((error) => {
          toast.error(error + " Please try again later...", toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (password === "" || email === "") {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    } else if (validator.isEmpty(password)) {
      toast.error("Password cannot be empty", toastOptions);
      return false;
    } else return true;
  };

  useEffect(() => {
    if (localStorage.getItem("aircraft-trading-platform-token")) {
      if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "BUYER"
      )
        Navigate("/products");
      else if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "SELLER"
      )
        Navigate("/myproducts");
    }
    // eslint-disable-next-line
  }, []);
  //Functions

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-5">
          <div className="card-title mt-3">
            <i className="fa fa-user-circle fa-4x"></i>
            <h1>Login</h1>
          </div>
          <div className="card-body mt-2">
            <form onSubmit={getData}>
              {/* Email Field  */}
              <div className="form-group">
                <label className="d-flex" htmlFor="email">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
              </div>
              {/* Email Field  */}

              {/* Password Field  */}
              <div className="form-group">
                <label className="d-flex" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  id="password"
                  placeholder="Enter Password"
                />
              </div>
              {/* Password Field  */}

              <button
                type="submit"
                className="mt-4 btn btn-primary btn-lg font-weight-bold"
              >
                login
              </button>
            </form>

            <Link
              className="d-flex mt-4 text-warning font-weight-bold"
              to={"/forgot"}
            >
              forgot password?
            </Link>
            <Link
              className="d-flex mt-2 text-warning font-weight-bold"
              to={"/signup"}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
