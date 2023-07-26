import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function SignUp() {
  //Declarations
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("SELLER");
  const [securityQuestion, setSecurityQuestion] = useState("What is the name of your first pet?");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [checkbox, setCheckBox] = useState(false);
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
        name,
        email,
        password,
        mobile,
        address,
        role,
        securityAnswer,
        securityQuestion
      };
      fetch("http://localhost:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          resolve
            .json()
            .then((resultJson) => {
              if (resolve.status === 201) {
                Navigate("/login");
              } else {
                toast.error(resultJson.message, toastOptions);
              }
            })
            .catch((error) => {
              toast.error(error + " Please try again later...", toastOptions);
            });
        })
        .catch((error) => {
          toast.error(error + " Please try again later...", toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      mobile === "" ||
      address === "" ||
      securityAnswer === "" ||
      securityQuestion === "" ||
      checkbox === false
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password must contain at least eight characters",
        toastOptions
      );
      return false;
    } else if (!validator.isNumeric(mobile)) {
      toast.error(
        "Mobile number should only consist of numbers.",
        toastOptions
      );
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("aircraft-trading-platform-token")) {
      if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "BUYER"
      )
        Navigate("/buyer");
      else if (
        localStorage.getItem("aircraft-trading-platform-user-role") === "SELLER"
      )
        Navigate("/seller");
    }
    // eslint-disable-next-line
  });

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-4 mt-4 text-white">
          <div className="card-title mt-3">
            <i className="fa fa-user-plus fa-4x mb-1"></i>
            <h1>Sign-up</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Name Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter Your Full name"
                  />
                </div>
                {/* Name Field  */}

                {/* Email Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="email">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                </div>
                {/* Email Field  */}
              </div>

              <div className="row">
                {/* Password Field  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="password"
                    placeholder="Enter Strong Password"
                  />
                </div>
                {/* Password Field  */}

                {/* Mobile Field  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="mobile">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control"
                    id="mobile"
                    placeholder="Enter Mobile No."
                  />
                </div>
              </div>

              <div className="row">
                {/* Security Question  */}
                <div className="col">
                  <label htmlFor="securityQuestion" className="d-flex mt-3">Security Question</label>
                  <select
                    value={securityQuestion}
                    onChange={(e) => setSecurityQuestion(e.target.value)}
                    className="form-control"
                    id="securityQuestion"
                  >
                    <option value="What is the name of your first pet?">
                      What is the name of your first pet?
                    </option>
                    <option value="What is the name of your first school?">
                      What is the name of your first school?
                    </option>
                    <option value="What is the name of your childhood friend?">
                      What is the name of your childhood friend?
                    </option>
                    <option value="What was the name of the boy or the girl you first kissed?<">
                      What was the name of the boy or the girl you first kissed?
                    </option>
                    <option value="What is the name of your first ex?">
                      What is the name of your first ex?
                    </option>
                  </select>
                </div>
                {/* Security Question  */}

                {/* Security Answer  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="securityAnswer">
                    Security Answer
                  </label>
                  <input
                    type="text"
                    value={securityAnswer}
                    onChange={(e) => setSecurityAnswer(e.target.value)}
                    className="form-control"
                    id="securityAnswer"
                    placeholder="Enter Answer for Security Question selected"
                  />
                </div>
                {/* Security Answer  */}
              </div>

              <div className="row">
                {/* User Role (Buyer or Seller)  */}
                <div className="col">
                  <label htmlFor="role" className="d-flex mt-3">ROLE</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-control"
                    id="role"
                  >
                    <option value="SELLER">SELLER</option>
                    <option value="BUYER">BUYER</option>
                  </select>
                </div>
                {/* User Role (Buyer or Seller)  */}
              </div>

              <div className="row">
                {/* Address  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="address">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="address"
                    placeholder="Enter Complete Address"
                  />
                </div>
                {/* Address  */}
              </div>

              {/* Check-Box  */}
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input d-flex mt-2"
                  id="check-box"
                  onChange={() => setCheckBox(!checkbox)}
                />
                <label className="form-check-label d-flex mt-3" htmlFor="check-box">
                  Agree to Terms & Conditions
                </label>
              </div>
              {/* Check-Box  */}

              <button type="submit" className="btn btn-lg mt-3 btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
