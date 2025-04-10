import React from "react";
import { FaCartPlus, FaCheck } from "react-icons/fa";
import "./ProductCard.css";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import Cookies from "js-cookie"; // For managing cookies

const ProductCard = ({ product }) => {
  // State to track if the item is added to the cart
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);

  // Function to handle "Add to Cart" button click
  const handleAddToCart = async () => {
    try {
      // Retrieve the user's ID from the cookie
      const userId = Cookies.get("userSession"); // Assuming the cookie stores the user's uid
      if (!userId) {
        alert("Please log in to add items to the cart.");
        return;
      }

      // Add the product to the Firestore "cart" collection
      await addDoc(collection(db, "cart"), {
        userId: userId, // Associate the cart item with the user's ID
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        timestamp: new Date(), // Optional: Add a timestamp for when the item was added
      });

      // Update UI state
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000); // Revert state after 2 seconds

      console.log(`${product.name} added to cart for user ${userId}`);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">
          {product.price}$ {product.category === "Fruits" && <span>per kg</span>}
        </p>
      </div>
      <button
        className={`add-to-cart-button ${isAddedToCart ? "added" : ""}`}
        onClick={handleAddToCart}
      >
        {isAddedToCart ? (
          <>
            <FaCheck /> Added!
          </>
        ) : (
          <>
            <FaCartPlus /> Add to Cart
          </>
        )}
      </button>
    </div>
  );
  
};

export default ProductCard;