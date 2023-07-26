import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState(
    "What is the name of your first pet?"
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate = useNavigate("");

  const getData = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const data = {
        email,securityQuestion,securityAnswer
      }
      fetch(`http://localhost:8080/api/v1/auth/forgot`,{
        method:'POST',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body:JSON.stringify(data)
      }).then((resolve)=>{
        if(resolve.status===200){
          Navigate("/change",{state:email});
        }else{
          resolve.json().then((resultJson)=>{
            toast.error(resultJson.error,toastOptions);
          }).catch((error) => {
            toast.error(error + " Please try again later...", toastOptions);
          });
        }
      }).catch((error) => {
        toast.error(error + " Please try again later...", toastOptions);
      });
    }
  };

  const handleValidation = () => {
    if (email === "" || securityAnswer === "" || securityQuestion === "") {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
      return false;
    } else return true;
  };

  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-4 mt-4 text-white">
          <div className="card-title mt-3">
            <i className="fa fa-question-circle fa-4x mb-1"></i>
            <h1>Forgot-Password</h1>
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
            <div className="row">
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
                {/* Security Question  */}
                <div className="col">
                  <label htmlFor="securityQuestion" className="d-flex mt-3">
                    Security Question
                  </label>
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
              </div>
              <div className="row">
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
