import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

export default function AddProduct() {
  const state = useLocation().state;
  const [_id,set_id] = useState("");
  const [productName, setProductName] = useState("");
  const [productLocation, setProductLocation] = useState("");
  const [productQuantity, setProductQuantity] = useState(undefined);
  const [productPrice, setProductPrice] = useState(undefined);
  const [shippingDate, setShippingDate] = useState("");
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const [sellerName] = useState(
    localStorage.getItem("aircraft-trading-platform-user-name")
  );
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
        _id,
        productName,
        productLocation,
        productQuantity,
        productPrice,
        shippingDate,
        sellerName,
      };

      fetch(`http://localhost:8080/api/v1/seller/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(data),
      })
        .then((resolve) => {
          if (resolve.status === 201) {
            console.log("Product added successfully");
            toast.success("Product added successfully", toastOptions);
            Navigate("/myproducts");
          } else {
            toast.error("Failed saving product", toastOptions);
          }
        })
        .catch((error) => {
          toast.error(error, toastOptions);
        });
    }
  };
  useEffect(()=>{
    if(state){
      set_id(state._id);
      setProductName(state.productName);
      setProductLocation(state.productLocation);
      setProductPrice(state.productPrice);
      setProductQuantity(state.productQuantity);
      setShippingDate(state.shippingDate);
      console.log(state)
    }
    // eslint-disable-next-line
  },[])

  const handleValidation = () => {
    if (
      productLocation === "" ||
      productName === "" ||
      productPrice === undefined ||
      productQuantity === undefined ||
      shippingDate === ""
    ) {
      toast.error("Fields cannot be empty", toastOptions);
      return false;
    }

    if (!validator.isDate(shippingDate)) {
      toast.error("Please enter valid date", toastOptions);
      return false;
    }else{
        return true;
    }
  };
  return (
    <div>
      <div className="col-md-4 offset-md-1">
        <div className="card mb-4 mt-4 text-white">
          <div className="card-title mt-3">
            {!state?<h1>Add-Product</h1>:<h1>Update-Product</h1>}
          </div>
          <div className="card-body">
            <form onSubmit={getData}>
              <div className="row">
                {/* Product Name Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="productName">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="form-control"
                    id="productName"
                    aria-describedby="emailHelp"
                    placeholder="Enter product name"
                  />
                </div>
                {/* Product Name Field  */}

                {/* Product Quantity Field  */}
                <div className="col">
                  <label className="d-flex" htmlFor="productQuantity">
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(e.target.value)}
                    className="form-control"
                    id="productQuantity"
                    aria-describedby="emailHelp"
                    placeholder="Enter Product Quantity"
                  />
                </div>
                {/* Product Quantity Field  */}
              </div>

              <div className="row">
                {/* Product Price Field  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="productPrice">
                    Product Price
                  </label>
                  <input
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    className="form-control"
                    id="productPrice"
                    placeholder="Enter price"
                  />
                </div>
                {/* Product Price Field  */}

                {/* Product Location Field  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="productLocation">
                    Product Location
                  </label>
                  <input
                    type="text"
                    value={productLocation}
                    onChange={(e) => setProductLocation(e.target.value)}
                    className="form-control"
                    id="productLocation"
                    placeholder="Enter Product Location"
                  />
                </div>
                {/* Product Location Field  */}
              </div>

              <div className="row">
                {/* Shipping Date  */}
                <div className="col">
                  <label className="d-flex mt-3" htmlFor="shippingDate">
                    Shipping Date
                  </label>
                  <input
                    type="date"
                    value={shippingDate}
                    onChange={(e) => setShippingDate(e.target.value)}
                    className="form-control"
                    id="shippingDate"
                    placeholder="Enter expected shipping date"
                  />
                </div>
                {/* Shipping Date  */}
              </div>

              <button type="submit" className="btn btn-lg mt-3 btn-primary">
                Submit
              </button>
              {state?<button onClick={()=>Navigate("/myproducts")} className="btn btn-danger mt-3 ml-1 btn-lg">Cancel</button>:null}
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
