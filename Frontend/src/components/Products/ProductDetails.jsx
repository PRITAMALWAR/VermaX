import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Heart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useCart } from "../../context/CartContext";
import productsData from "../../data/products.json";
import Loader from "../Common/Loader";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productId = parseInt(id || "0");
    const foundProduct = productsData.products.find(p => p.id === productId);
    
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate("/products")}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="aspect-square">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 p-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`w-16 h-16 rounded border-2 overflow-hidden ${
                        selectedImage === image ? "border-purple-500" : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-purple-600 uppercase font-medium mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.title}
              </h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(product.rating)
                            ? "fill-yellow-400"
                            : "fill-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-600">Category: {product.category}</span>
              </div>
            </div>

            {/* Price */}
            <div className="border-b pb-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                      {product.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.detail}</p>
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Features</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Stock:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    {product.stock} items available
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 border-l border-r border-gray-300">
                    {quantity}
                  </span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock === 0 ? "Out of Stock" : "Add to Cart"}</span>
              </motion.button>
              
              <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
