import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [role] = useState(
    localStorage.getItem("aircraft-trading-platform-user-role")
  );
  const [isBuyer] = useState(role === "BUYER" ? true : false);
  const [keyword, setKeyword] = useState("");
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const Navigate = useNavigate("");
  const [sellers, setSellers] = useState([]);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const fetchProducts = () => {
    fetch(`http://localhost:8080/api/v1/products`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve.json().then((data) => {
            console.log(data);
            setProducts(data.products);
          });
        } else {
          toast.error("Failed fetching products", toastOptions);
        }
      })
      .catch((error) => {
        toast.error(error, toastOptions);
      });
  };
  const search = (e) => {
    setKeyword(e.target.value);
    fetch(`http://localhost:8080/api/v1/search?keyword=${keyword}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve.json().then((data) => {
            setProducts(data.products);
          });
        } else {
          fetchProducts();
        }
      })
      .catch((error) => {
        toast.error(
          "Error occurred while fetching products.. Please try again later",
          toastOptions
        );
      });
  };

  const addToCart = (_id) => {
    fetch(`http://localhost:8080/api/v1/buyer/addtocart?_id=${_id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 201) {
          Navigate("/cart");
        } else {
          toast.error(
            "Error occurred while adding product to cart",
            toastOptions
          );
        }
      })
      .catch((error) => {
        toast.error(
          "Error occurred while fetching products.. Please try again later",
          toastOptions
        );
      });
  };

  const fetchSellers = () => {
    fetch(`http://localhost:8080/api/v1/getsellers`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log("Seller result:", result);
              setSellers(result.sellers);
            })
            .catch(() => {
              toast.error(
                "Error occurred while fetching sellers.. Please try again later",
                toastOptions
              );
            });
        }
      })
      .catch((error) => {
        toast.error(
          "Error occurred while fetching sellers.. Please try again later",
          toastOptions
        );
      });
  };

  const fetchProductsBySeller = (e) => {
    const sellerName = e.target.value;
    let seller;
    for (let i = 0; i < sellers.length; i++) {
      if (sellers[i].name.localeCompare(sellerName)) {
        seller = sellers[i];
      }
    }
    console.log(seller)
    const _id = seller._id;
    fetch(`http://localhost:8080/api/v1/getproductsbyseller?_id=${_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
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
            })
            .catch((error) => {
              toast.error(
                "Error occurred while fetching products.. Please try again later",
                toastOptions
              );
            });
        }
      })
      .catch((error) => {
        toast.error(
          "Error occurred while fetching products.. Please try again later",
          toastOptions
        );
      });
  };

  useEffect(() => {
    fetchProducts();
    fetchSellers();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="container-fluid d-flex mt-4 mb-4">
        <div id="search" className="d-flex">
          <input
            onKeyUp={search}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            type="text"
            className="form-control bg-warning text-dark"
            style={{ height: "3em" }}
          />
          <button onClick={search} className="btn btn-success ml-1">
            Search
          </button>
        </div>
        <div id="filter">
          <select
            onChange={(e) => fetchProductsBySeller(e)}
            onClick={fetchSellers}
            name="seller"
            id="seller"
          >
            <option value="Filter By Seller">Filter By Seller</option>
            {sellers.map((seller) => (
              <option key={seller._id} value={seller.name}>
                {seller.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mr-1 ml-5" key={product._id}>
            <div className="card text-white mt-4" style={{ fontSize: "21px" }}>
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
                  Quantity Available: <strong>{product.productQuantity}</strong>
                </h5>
                <h5 className="d-flex">
                  Location: <strong>{product.productLocation}</strong>
                </h5>
                <h5 className="d-flex">
                  Shipping Date: <strong>{product.shippingDate}</strong>
                </h5>
                <h5 className="d-flex">
                  Seller Name: <strong>{product.sellerName}</strong>
                </h5>
                {isBuyer === true ? (
                  <div>
                    <button
                      onClick={() => addToCart(product._id)}
                      className="btn-block btn-danger"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() =>
                        Navigate("/chat", {
                          state: [product.sellerId, product.sellerName],
                        })
                      }
                      className="btn-block btn-primary"
                    >
                      Chat with seller
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
}
