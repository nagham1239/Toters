import React, { useState } from "react";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products] = useState([
    { id: 1, name: "Apple", price: "$2", image: "/images/apple.jpg" },
    { id: 2, name: "Milk", price: "$5", image: "/images/milk.jpg" },
  ]);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
