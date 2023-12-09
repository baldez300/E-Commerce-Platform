import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { currentUser, isAuthenticated } from "../../App";
import useOrders from "../../hooks/useOrders";
import useProducts from "../../hooks/useProducts";
import Order from "./Order";
import { CiReceipt } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
// import CircularProgress from "@mui/joy/CircularProgress";
import CircularProgress from "@mui/material/CircularProgress";
import "./Orders.css";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { orders, getAllOrders, setOrders, deleteOrder } = useOrders();
  const { getProductDetails } = useProducts();

  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const updateOrders = async () => {
      setIsLoading(true);
      const orders = await getAllOrders(currentUser.value?._id);
      setOrders(orders);
      const details = await getProductDetails(orders);
      setProductDetails(details);
      setIsLoading(false);
    };

    updateOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated.value]);

  return (
    <div className="user-orders-container">
      <IoIosClose
        className="checkout-template-close"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex gap-10px margin-bottom-10px vertically-center">
        <CiReceipt size={30} />
        <h1 className="form-title margin-0">Your orders</h1>
      </div>
      <ul className="order-wrapper">
        {isLoading && <CircularProgress variant="plain" size="lg" />}
        {!isLoading && orders.length === 0 && (
          <p className="no-orders">No orders yet...</p>
        )}
        {!isLoading &&
          orders.length > 0 &&
          orders.map((order, index) => {
            let totalPrice = 0;
            return (
              <div className="order" key={index}>
                <h2 className="order-id">Order: {order._id}</h2>

                {productDetails.length > 0 &&
                  order.products.map((product, productIndex) => {
                    let productDetail =
                      productDetails[
                        index * order.products.length + productIndex
                      ];
                    totalPrice += productDetail.price * product.quantity;
                    return (
                      <Order
                        key={productDetail._id}
                        {...productDetail}
                        quantity={product.quantity}
                      />
                    );
                  })}

                <div className="flex space-between">
                  <h2 className="delivered-text">
                    Delivered:{" "}
                    <span style={{ color: order.delivered ? "green" : "red" }}>
                      {order.delivered ? "Yes" : "No"}
                    </span>
                  </h2>
                  <h2 className="delivered-text">
                    Total: {totalPrice.toFixed(2)}$
                  </h2>
                  <button
                    className="order-delete-btn"
                    onClick={async () => {
                      const deletedOrder = await deleteOrder(order._id);
                      setOrders(
                        orders.filter((o) => o._id !== deletedOrder._id)
                      );
                    }}
                  >
                    delete
                  </button>
                </div>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default Orders;
