import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("aircraft-trading-platform-token");
  const [isSeller, setIsSeller] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 6500,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const fetchOrders = () => {
    fetch(`http://localhost:8080/api/v1/buyer/getOrders`, {
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
              console.log(result.orders);
              setOrders(result.orders);
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  };

  const cancelOrder = (_id)=>{
    console.log(_id)
    fetch(`http://localhost:8080/api/v1/buyer/cancelorder?_id=${_id}`,{
        method:"DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
    }).then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result);
              toast.success("Order cancelled", toastOptions);
              fetchOrders();
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  }

  const approveRequest = (_id)=>{
    fetch(`http://localhost:8080/api/v1/seller/acceptorder?_id=${_id}`,{
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
    }).then((resolve) => {
        if (resolve.status === 200) {
          resolve
            .json()
            .then((result) => {
              console.log(result);
              toast.success("Order Accepted", toastOptions);
              fetchOrders();
            })
            .catch((error) => {
              console.log(error);
              toast.error(error, toastOptions);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error(error, toastOptions);
      });
  }

  useState(() => {
    const role = localStorage.getItem("aircraft-trading-platform-user-role");
    if (role === "SELLER") {
      setIsSeller(true);
      setIsBuyer(false);
    } else if (role === "BUYER") {
      setIsSeller(false);
      setIsBuyer(true);
    }
    fetchOrders();
  }, []);
  return (
    <div>
      <div className="card-body mt-5">
      <div className="text-white">
            <h2 id="note" style={{fontStyle:'italic', fontFamily:'cursive'}}>NOTE: "If the order is cancelled Refund will be initiated within 5-7 business days"</h2>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-dark mt-2">
            <thead>
              <tr>
                <th scope="col">PRODUCT_NAME</th>
                <th scope="col">PRODUCT_QUANTITY</th>
                <th scope="col">PRODUCT_PRICE</th>
                <th scope="col">SHIPPING_DATE</th>
                <th scope="col">SELLER_NAME</th>
                <th scope="col">ORDER_STATUS</th>
                <th scope="col">BUYER_ID</th>
                <th scope="col">PAYMENT_ID</th>
                <th scope="col">PAYMENT_STATUS</th>
                <th scope="col">ORDER_DATE</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.products.name}</td>
                  <td>{order.products.quantity}</td>
                  <td>Rs.{order.products.price}</td>
                  <td>{order.products.shippingDate}</td>
                  <td>{order.products.sellerName}</td>
                  <td>{order.orderStatus}</td>
                  <td>{order.buyerId}</td>
                  <td>{order.razorpay_payment_id}</td>
                  <td>{order.paymentStatus}</td>
                  <td>{order.createdAt}</td>
                  <td className="d-flex">
                    {isSeller && order.orderStatus!=="CANCELLED" && order.orderStatus!=="ACCEPTED" ? (
                      <button onClick={()=>approveRequest(order._id)} className="btn btn-sm btn-success">
                        <i className="fa-solid fa-check"></i>
                      </button>
                    ) : null}
                    {order.orderStatus!=="CANCELLED"?<button onClick={()=>cancelOrder(order._id)} className="btn btn-sm btn-danger ml-1">
                      <i className="fa-solid fa-x"></i>
                    </button>:null}
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
