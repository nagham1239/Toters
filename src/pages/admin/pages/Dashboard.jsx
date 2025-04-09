import React, { useEffect, useState } from "react";
import { db } from "../../../components/firebase";
import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import "./Dashboard.css";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [statistics, setStatistics] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch total users
        const usersSnapshot = await getDocs(collection(db, "users"));
        const totalUsers = usersSnapshot.size;

        // Fetch total orders
        const ordersSnapshot = await getDocs(collection(db, "orders"));
        const totalOrders = ordersSnapshot.size;

        // Fetch total products
        const productsSnapshot = await getDocs(collection(db, "products"));
        const totalProducts = productsSnapshot.size;

        // Update statistics
        setStatistics({ totalUsers, totalOrders, totalProducts });

        // Fetch recent orders (last 5 orders)
        const recentOrdersData = ordersSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .slice(-5); // Get last 5 orders
        setRecentOrders(recentOrdersData);

        // Fetch recent products (last 5 products)
        const recentProductsData = productsSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .slice(-5); // Get last 5 products
        setRecentProducts(recentProductsData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);

  // Data for the bar chart (order counts by status)
  const barChartData = {
    labels: ["Processing", "Out for Delivery", "Delivered"],
    datasets: [
      {
        label: "Order Counts",
        data: [3, 5, 7], // Replace with dynamic data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  // Data for the pie chart (product category distribution)
  const pieChartData = {
    labels: ["Fruits", "Dairy", "Bakery"],
    datasets: [
      {
        label: "Product Categories",
        data: [10, 5, 8], // Replace with dynamic data
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <h1>Admin Dashboard</h1>

      {/* Statistics Section */}
      <div className="statistics-section">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p>{statistics.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>{statistics.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{statistics.totalProducts}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-section">
        <div className="chart">
          <h3>Order Status Distribution</h3>
          <Bar data={barChartData} />
        </div>
        <div className="chart">
          <h3>Product Category Distribution</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      {/* Lists Section */}
      <div className="lists-section">
        <div className="list">
          <h3>Recent Orders</h3>
          <ul>
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <li key={order.id}>
                  Order ID: {order.id}, Total: ${order.totalPrice.toFixed(2)}
                </li>
              ))
            ) : (
              <p>No recent orders.</p>
            )}
          </ul>
        </div>
        <div className="list">
          <h3>Recent Products</h3>
          <ul>
            {recentProducts.length > 0 ? (
              recentProducts.map((product) => (
                <li key={product.id}>
                  {product.name} - ${product.price.toFixed(2)}
                </li>
              ))
            ) : (
              <p>No recent products.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;