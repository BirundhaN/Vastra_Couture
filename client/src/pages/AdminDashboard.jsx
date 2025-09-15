import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase"; // adjust path to your firebase.js

function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const ordersList = snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("❌ Error fetching orders:", error.message);
        alert("Failed to fetch orders. Please check your permissions.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Update order status
  const updateStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });
      alert(`Order ${orderId} updated to ${newStatus}`);

      // refresh orders after update
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("❌ Error updating order:", error.message);
      alert("You don’t have permission to update this order.");
    }
  };

  if (loading) return <p className="p-6">Loading orders...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard - Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer ID</th>
              <th className="p-2 border">OTP</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border">
                <td className="p-2 border">{order.id}</td>
                <td className="p-2 border">
                  {order.customerId || "N/A"}
                </td>
                <td className="p-2 border">{order.otp || "N/A"}</td>
                <td className="p-2 border">{order.status || "pending"}</td>
                <td className="p-2 border">
                  <button
                    className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                    onClick={() => updateStatus(order.id, "shipped")}
                  >
                    Mark Shipped
                  </button>
                  <button
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => updateStatus(order.id, "cancelled")}
                  >
                    Cancel Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
