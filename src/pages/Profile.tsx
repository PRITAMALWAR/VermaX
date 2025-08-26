import React from "react";
import { motion } from "framer-motion";
import { User, Mail, Calendar, Award, ShoppingBag, Heart } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, isLoggedIn, logout } = useAuth();
  const { state } = useCart();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  const stats = [
    {
      icon: ShoppingBag,
      label: "Orders Placed",
      value: "12",
      color: "text-blue-600",
      bg: "bg-blue-100"
    },
    {
      icon: Heart,
      label: "Wishlist Items",
      value: "8",
      color: "text-red-600",
      bg: "bg-red-100"
    },
    {
      icon: Award,
      label: "Reward Points",
      value: "450",
      color: "text-green-600",
      bg: "bg-green-100"
    }
  ];

  const recentOrders = [
    {
      id: "#12345",
      date: "Dec 15, 2024",
      status: "Delivered",
      total: "$299.99",
      items: 3
    },
    {
      id: "#12344",
      date: "Dec 10, 2024",
      status: "Shipped",
      total: "$149.50",
      items: 2
    },
    {
      id: "#12343",
      date: "Dec 5, 2024",
      status: "Processing",
      total: "$89.99",
      items: 1
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-16 h-16 text-white" />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome back, {user?.username}!
                </h1>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Member since January 2024</span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start space-x-2">
                    <Award className="w-4 h-4" />
                    <span className="text-purple-600 font-medium">{user?.role === 'admin' ? 'Admin User' : 'Premium Member'}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${stat.bg} rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className="ml-4">
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={order.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">{order.id}</p>
                        <p className="text-sm text-gray-600">{order.date}</p>
                        <p className="text-sm text-gray-600">{order.items} items</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-800">{order.total}</p>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-purple-600 hover:text-purple-700 font-medium">
                View All Orders
              </button>
            </motion.div>

            {/* Current Cart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">Current Cart</h2>
              {state.items.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div>
                  <div className="space-y-3 mb-4">
                    {state.items.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 truncate">{item.title}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-gray-800">${item.price}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total ({state.totalItems} items):</span>
                      <span>${state.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
              <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition-colors">
                View Cart
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;