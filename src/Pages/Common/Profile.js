import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validator from "validator";
import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const [readOnly, setReadOnly] = useState(true);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(
    localStorage.getItem("aircraft-trading-platform-user-email")
  );
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const Navigate = useNavigate("");
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchUser = () => {
    fetch(`http://localhost:8080/api/v1/user/getuser`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({email}),
    })
      .then((resolve) => {
        if(resolve.status === 200){
            console.log(resolve)
            resolve.json().then((result)=>{
                console.log(result)
                const user = result.user;
                setAddress(user.address);
                setEmail(user.email);
                setMobile(user.mobile);
                setName(user.name);
                setRole(user.role);
                setId(user._id);
            })
        }
      })
  };

  const getData = () => {
    if (handleValidation()) {
      setReadOnly(true);
      const data = {
        id,
        name,
        email,
        mobile,
        role,
        address,
      };
      fetch(`http://localhost:8080/api/v1/user/editprofile`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
            console.log(resolve)
          if(resolve.status === 200){
            toast.success("Profile saved successfully", toastOptions);
            console.log("done");
            fetchUser();
          }
        })
        .catch((error) => {
          toast.error(error, toastOptions);
        });
    }
  };

  const handleValidation = () => {
    if (
      name === "" ||
      mobile === "" ||
      address === ""
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    } else if (!validator.isEmail(email)) {
      toast.error("Please enter correct email", toastOptions);
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
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="col-md-6 offset-md-1">
      <div className="card">
        <div className="card-title mt-3">
          <i className="fa-solid fa-address-card fa-5x"></i>
          <h1 className="mt-4">MY-PROFILE</h1>
          <hr />
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-dark">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    <h4>Name</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={name}
                        readOnly={readOnly}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>E-mail</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={email}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Mobile</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Role</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={role}
                        readOnly={readOnly}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    <h4>Address</h4>
                  </th>
                  <td></td>
                  <td></td>
                  <td>
                    <h3>
                      <input
                        type="text"
                        value={address}
                        readOnly={readOnly}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-dark text-white"
                      />
                    </h3>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="d-d-inline-flex profile-button">
            {readOnly === true ? (
              <button
                onClick={() => setReadOnly(false)}
                className="btn btn-lg btn-warning mt-3"
              >
                Edit Profile
              </button>
            ) : null}
            {readOnly === true ? (
              <button
                onClick={() => Navigate("/change", { state: email })}
                className="btn btn-lg btn-danger ml-3 mt-3"
              >
                Change Password
              </button>
            ) : null}
            {readOnly === false ? (
              <button
                onClick={getData}
                className="btn btn-lg btn-success ml-3 mt-3"
              >
                Save Changes
              </button>
            ) : null}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}