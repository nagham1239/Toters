import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // For managing cookies
import { db } from "../components/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FaTruck, FaClock, FaCheckCircle } from "react-icons/fa";

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch orders for the logged-in user
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = Cookies.get("userSession"); // Retrieve user ID from cookie
        if (!userId) {
          setError("Please log in to view your orders.");
          setLoading(false);
          return;
        }

        // Query Firestore for orders belonging to the user
        const q = query(collection(db, "orders"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          setError("No orders found.");
          setLoading(false);
          return;
        }

        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to load orders. Please try again.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="order-tracking-container">
      {/* Header */}
      <div className="header">
        <h1>Track Your Orders</h1>
        <p>View the status of all your orders below.</p>
      </div>

      {/* Order List */}
      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Order ID: {order.id}</h2>
              <div className="order-details">
                <div className="status-item">
                  <FaTruck />
                  <p>Status: Completed</p> {/* You can replace this with dynamic status */}
                </div>
                <div className="status-item">
                  <FaClock />
                  <p>Placed On: {new Date(order.timestamp?.seconds * 1000).toLocaleString()}</p>
                </div>
                <div className="status-item">
                  <FaCheckCircle />
                  <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                </div>
              </div>
              <div className="items-list">
                <h3>Items:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;