import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import Cookies from "js-cookie"; // For managing cookies
import { db } from "../components/firebase";
import { collection, query, where, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch cart items for the logged-in user
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = Cookies.get("userSession"); // Retrieve user ID from cookie
        if (!userId) {
          setError("Please log in to view your cart.");
          setLoading(false);
          return;
        }

        // Query Firestore for cart items belonging to the user
        const q = query(collection(db, "cart"), where("userId", "==", userId));
        const querySnapshot = await getDocs(q);

        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("cart data", items);

        setCartItems(items);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to load cart items. Please try again.");
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  // Function to update item quantity in Firestore
  const updateQuantity = async (itemId, newQuantity) => {
    try {
      if (newQuantity < 1) return; // Prevent quantity from going below 1

      const itemRef = doc(db, "cart", itemId);
      await updateDoc(itemRef, { quantity: newQuantity });

      // Update local state
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity. Please try again.");
    }
  };

  // Function to remove an item from the cart in Firestore
  const removeItem = async (itemId) => {
    try {
      const itemRef = doc(db, "cart", itemId);
      await deleteDoc(itemRef);

      // Update local state
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item. Please try again.");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return <p>Loading cart...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cart-container">
      {/* Header */}
      <div className="header">
        <h1>Your Cart</h1>
        <p>Review your items before checkout.</p>
      </div>

      {/* Cart Items */}
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-controls">
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
              <button
                className="remove-button"
                onClick={() => removeItem(item.id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Total Price */}
      <div className="cart-total">
        <h3>Total: ${totalPrice}</h3>
        <button
          className="checkout-button"
          onClick={() => navigate("/Checkout")} // Use navigate to go to checkout
          disabled={cartItems.length === 0} // Disable if cart is empty
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;