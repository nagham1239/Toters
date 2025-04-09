import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // For managing cookies
import { db } from "../components/firebase";
import {collection,query,where,getDocs,deleteDoc,doc,addDoc,} from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Checkout.css";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate(); // Initialize navigation

  // Function to handle the checkout process
  const handleCheckout = async () => {
    try {
      const userId = Cookies.get("userSession"); // Retrieve user ID from cookie
      if (!userId) {
        setError("Please log in to proceed with checkout.");
        setLoading(false);
        return;
      }

      // Fetch cart items for the user
      const cartQuery = query(collection(db, "cart"), where("userId", "==", userId));
      const cartSnapshot = await getDocs(cartQuery);

      if (cartSnapshot.empty) {
        setError("Your cart is empty. Add items to proceed.");
        setLoading(false);
        return;
      }

      const cartItems = cartSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Calculate total price
      const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Create a new order in Firestore
      const orderRef = await addDoc(collection(db, "orders"), {
        userId: userId,
        items: cartItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        totalPrice: totalPrice,
        timestamp: new Date(),
      });

      // Remove all cart items for the user
      const batch = cartSnapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(batch);

      // Update state to indicate successful order placement
      setOrderPlaced(true);
      setLoading(false);
    } catch (err) {
      console.error("Error during checkout:", err);
      setError("An error occurred during checkout. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Automatically trigger the checkout process when the component mounts
    handleCheckout();
  }, []);

  if (loading) {
    return (
      <div className="checkout-loading">
        <h1>Processing Your Order...</h1>
        <p>Please wait while we finalize your purchase.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="checkout-error">
        <h1>Oops! Something Went Wrong</h1>
        <p>{error}</p>
        <button className="back-to-cart-button" onClick={() => navigate("/cart")}>
          Back to Cart
        </button>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-success">
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        <div className="checkout-actions">
          <button className="continue-shopping-button" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button
            className="track-order-button"
            onClick={() => navigate("/order-tracking")}
          >
            Track Your Order
          </button>
        </div>
      </div>
    );
  }

  return null; // Fallback in case none of the above conditions are met
};

export default Checkout;