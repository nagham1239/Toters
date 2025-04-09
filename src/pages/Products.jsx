import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaShoppingBasket, FaFilter } from "react-icons/fa";
import { db } from "../components/firebase";
import { collection, getDocs } from "firebase/firestore";

const Products = () => {
  // State to store products fetched from Firestore
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        alert("Failed to load products. Please try again.");
      }
    };

    fetchProducts();
  }, []);

  // Filtered products based on selected category
  const filteredProducts =
    filter === "All"
      ? products
      : products.filter((product) => product.category === filter);

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">Our Products</h1>
        <FaShoppingBasket className="icon-basket" />
      </div>

      {/* Filter Options */}
      <div className="filter-options">
        <FaFilter className="filter-icon" />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Fruits">Fruits</option>
          <option value="Dairy">Dairy</option>
          <option value="Bakery">Bakery</option>
        </select>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;