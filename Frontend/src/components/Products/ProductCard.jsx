import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <button
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
          </button>
        </div>
        {product.discount && product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {product.discount}% OFF
          </div>
        )}
        <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-purple-600 uppercase font-medium">
            {product.brand}
          </p>
          <h2 className="text-lg font-semibold text-gray-800 truncate group-hover:text-purple-600 transition-colors">
            {product.title}
          </h2>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < Math.floor(product.rating)
                    ? "fill-yellow-400"
                    : "fill-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">
            ({product.rating})
          </span>
        </div>

        {/* Price */}
        <div className="mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">
              ${product.price}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stock Status & Button */}
        <div className="flex items-center justify-between">
          <p className="text-sm">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of Stock</span>
            )}
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="text-sm">Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
