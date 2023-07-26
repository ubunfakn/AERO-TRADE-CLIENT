import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function ChangePassword() {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toastOptions = {
    position:'bottom-right',
    autoClose:6500,
    pauseOnHover: true,
    draggable: true,
    theme:'dark'
  }
  const email = useLocation().state;
  const Navigate = useNavigate("");


  const getData = (e)=>{
    e.preventDefault();
    const data = {email,password};
    if(handleValidation()){
      fetch('http://localhost:8080/api/v1/auth/change',{
        method: 'POST',
        headers: {
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      }).then((resolve)=>{
        if(resolve.status===200){
          Navigate("/login");
        }else{
          resolve.json().then((result)=>{
            toast.error("Bad request",toastOptions);
          }).catch((error)=>{
            toast.error(error, toastOptions);
          })
      }
    }).catch((error)=>{
      toast.error(error, toastOptions);
    })
    }
  }


  const handleValidation = ()=>{
    if(password==="" || confirmPassword===""){
      toast.error("Field cannot be empty", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password must contain at least eight characters",
        toastOptions
      );
      return false;
    } else if(!validator.equals(password, confirmPassword)){
      toast.error("Password does not match", toastOptions);
      return false;
    }else{
      return true;
    }
  }
  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-5 text-white">
          <div className="card-title mt-4">
            <h1 className="font-weight-bold">Change Password</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData} className="mr-5 ml-5 font-weight-bold" action="">
              <div className="form-group">
                <label className="d-flex" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                  className="form-control"
                />
                <label className="d-flex mt-4" htmlFor="confirmpassword">
                  Confirm Password
                </label>
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  id="confirmpassword"
                  name="confirmpassword"
                  placeholder="Enter Password"
                  type="password"
                  className="form-control"
                />
              </div>
              <button className="btn btn-lg btn-success mt-3" type="submit">Change</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}