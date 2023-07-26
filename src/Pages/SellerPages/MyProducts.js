import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MyProducts() {
  const email = localStorage.getItem("aircraft-trading-platform-user-email");
  const [products, setProducts] = useState([]);
  const [keyword, setKeyword] = useState("");
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const Navigate = useNavigate("");
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const fetchProduct = () => {
    fetch(`http://localhost:8080/api/v1/seller/getproduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({ email }),
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result);
              setProducts(result.product);
            })
            .catch((error) => {
              toast.error(error, toastOptions);
            });
        } else {
          toast.error("Failed in fetching products", toastOptions);
        }
      })
      .catch((error) => {
        toast.error(error, toastOptions);
      });
  };

  const updateProduct = (product) => {
    Navigate("/addproduct", { state: product });
  };

  const deleteProduct = (_id) => {
    fetch(`http://localhost:8080/api/v1/seller/deleteproduct?_id=${_id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((resolve) => {
        if (resolve.status === 200) {
          toast.success("Product deleted successfully", toastOptions);
          fetchProduct();
        } else {
          toast.error("Failed to delete product", toastOptions);
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
          fetchProduct();
          if (keyword !== "") toast.error("No products found with this input");
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
    fetchProduct();
    if (keyword === "") fetchProduct();
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="container-fluid d-flex mt-4 mb-4">
        <input
          value={keyword}
          onKeyUp={search}
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          className="form-control bg-warning text-dark"
          style={{ height: "3em" }}
        />
        <button onClick={search} className="btn btn-success ml-1">
          Search
        </button>
      </div>
      <div className="card-body mt-5">
        <div className="table-responsive">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">PRODUCT_NAME</th>
                <th scope="col">PRODUCT_QUANTITY</th>
                <th scope="col">PRODUCT_PRICE</th>
                <th scope="col">PRODUCT_LOCATION</th>
                <th scope="col">SHIPPING_DATE</th>
                <th scope="col">SELLER_NAME</th>
                <th scope="col">DATE_ADDED</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.productName}</td>
                  <td>{product.productQuantity}</td>
                  <td>Rs.{product.productPrice}</td>
                  <td>{product.productLocation}</td>
                  <td>{product.shippingDate}</td>
                  <td>{product.sellerName}</td>
                  <td>{product.createdAt}</td>
                  <td>
                    <button
                      onClick={() => updateProduct(product)}
                      className="bg-warning ml-2"
                    >
                      <i className="fa-solid fa-pen-nib"></i>
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="bg-danger text-white ml-2"
                    >
                      <i className="fa-solid fa-delete-left"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
