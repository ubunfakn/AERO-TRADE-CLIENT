import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const [totalPrice, setTotalPrice] = useState();
  const [outOfStock, setOutOfStock] = useState(false);
  const Navigate = useNavigate("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  const fetchProducts = () => {
    fetch(`http://localhost:8080/api/v1/buyer/cart`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result);
              setProducts(result.products);
              setTotalPrice(result.totalPrice);
              products.forEach((product) => {
                localStorage.setItem(product._id, 1);
              });
            })
            .catch((error) => {
              toast.error("Please try later", toastOptions);
            });
        }
      })
      .catch((error) => {
        toast.error("Please try later", toastOptions);
      });
  };

  const removeFromCart = (_id) => {
    fetch(`http://localhost:8080/api/v1/buyer/removefromcart?_id=${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          toast.success("Product removed successfully", toastOptions);
          fetchProducts();
        } else {
          toast.error("Failed to remove product", toastOptions);
        }
      })
      .catch((error) => {
        toast.error(error, toastOptions);
      });
  };

  const handleTotalPrice = (items) => {
    const totalPrice = items.reduce((total, product) => {
      return total + product.productPrice * product.quantity;
    }, 0);
    return totalPrice;
  };

  const handleQuantityUpdate = (_id, quantity) => {
    if (quantity > 0) {
      const updatedproducts = products.map((product) => {
        if (product.productQuantity < quantity) {
          setOutOfStock(true);
          return product;
        } else {
          setOutOfStock(false);
          if (product._id === _id) return { ...product, quantity: quantity };
          else return product;
        }
      });
      setProducts(updatedproducts);
      setTotalPrice(handleTotalPrice(updatedproducts));
    }
  };

  const checkout = () => {
    if (totalPrice <= 0) {
      toast.warning("Please add some items to cart to checkout", toastOptions);
    } else {
      fetch(`http://localhost:8080/api/v1/payment/createorder`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ totalPrice }),
      })
        .then((resolve) => {
          if (resolve.status === 201) {
            resolve.json().then((result) => {
              console.log(result);
              processingOrder(result);
            });
          } else {
            console.log("error");
            resolve.json().then((result) => {
              toast.error(result.error, toastOptions);
            });
          }
        })
        .catch((error) => {
          toast.error(error, toastOptions);
        });
    }
  };

  const processingOrder = (data) => {
    try {
      const option = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: data.amount.toString(),
        currency: data.currency,
        name: "AERO-TRADE",
        Description: "Order payment",
        order_id: data.id,
        handler: async (response) => {
          paymentSuccessHandler(response);
        },
        prefill: {
          email: "test@example.com",
          contact: "1234567895",
        },
        notes: {
          address: "Test address",
        },
        theme: {
          color: "red",
        },
      };

      const rzp = new window.Razorpay(option);
      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };

  const paymentSuccessHandler = (response) => {
    const data = {
      products,
      response,
      totalPrice,
    };
    fetch(`http://localhost:8080/api/v1/payment/updateorder`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve.json().then((result) => {
            console.log(result);
          });
          Navigate("/orders");
        } else {
          toast.error(
            "Failed to update data.....We will get back to you soon..",
            toastOptions
          );
        }
      })
      .catch((error) => {
        toast.error(error, toastOptions);
      });
  };

  useEffect(() => {
    const razorpayScript = document.createElement("script");
    razorpayScript.src = "https://checkout.razorpay.com/v1/checkout.js";
    razorpayScript.async = true;
    document.body.appendChild(razorpayScript);
    fetchProducts();
    //eslint-disable-next-line
  }, []);

  return (
    <div id="cart-page" className="mt-3">
      <div id="productsDiv" className="productsssss">
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3 ml-2 mr-1 d-flex" key={product._id}>
              <div
                className="card text-white mt-4"
                style={{ fontSize: "21px" }}
              >
                <div className="card-body">
                  <h3>
                    <i>
                      <strong>{product.productName}</strong>
                    </i>
                  </h3>
                  <br />
                  <h5 className="d-flex">
                    Price: <strong> Rs.{product.productPrice}</strong>
                  </h5>
                  <h5 className="d-flex">
                    Quantity: <strong> &nbsp;{product.quantity}</strong>
                    <button
                      onClick={() =>
                        handleQuantityUpdate(product._id, product.quantity + 1)
                      }
                      className="ml-3 bg-secondary btn-group-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() =>
                        handleQuantityUpdate(product._id, product.quantity - 1)
                      }
                      className="ml-3 bg-secondary btn-group-sm"
                    >
                      -
                    </button>
                  </h5>
                  {outOfStock === true ? (
                    <h5 className="text-danger d-flex">
                      <strong>
                        <sup>Out of stock!</sup>
                      </strong>
                    </h5>
                  ) : null}
                  <h5 className="d-flex">
                    Location: <strong>{product.productLocation}</strong>
                  </h5>
                  <h5 className="d-flex">
                    Shipping Date: <strong>{product.shippingDate}</strong>
                  </h5>
                  <h5 className="d-flex">
                    Seller Name: <strong>{product.sellerName}</strong>
                  </h5>
                </div>
                <div className="card-footer">
                  <button
                    onClick={() => removeFromCart(product._id)}
                    className="btn btn-block btn-danger mt-3"
                  >
                    Remove from Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div id="cartsDiv" className="sum">
        <div className="card bg-warning text-black">
          <div className="card-body">
            <h3>
              Total Price: <strong>Rs.{totalPrice}</strong>
            </h3>
            <button
              onClick={checkout}
              className="btn btn-block btn-lg btn-success mt-4"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
