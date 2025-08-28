import React, { useState, useEffect } from "react";
import productsJson from "../data/products.json";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    image: "",
    category: "",
    brand: "",
    detail: "",
    price: "",
    originalPrice: "",
    discount: "",
    rating: "",
    stock: "",
    tags: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setProducts(productsJson.products || []);
  }, []);

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      image: "",
      category: "",
      brand: "",
      detail: "",
      price: "",
      originalPrice: "",
      discount: "",
      rating: "",
      stock: "",
      tags: "",
    });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...formData,
      id: Date.now(),
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount),
      rating: Number(formData.rating),
      stock: Number(formData.stock),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      images: [formData.image],
    };

    setProducts((prev) => [...prev, newProduct]);
    resetForm();
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setFormData({
      ...product,
      tags: product.tags.join(", "),
    });
  };

  const handleUpdateProduct = () => {
    const updated = {
      ...formData,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      discount: Number(formData.discount),
      rating: Number(formData.rating),
      stock: Number(formData.stock),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      images: [formData.image],
    };

    setProducts((prev) =>
      prev.map((p) => (p.id === formData.id ? updated : p))
    );
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {isEditing ? "Edit Product" : "Add New Product"}
      </h2>

      {/* Product Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-6 rounded shadow mb-10">
        {[
          "title",
          "image",
          "category",
          "brand",
          "detail",
          "price",
          "originalPrice",
          "discount",
          "rating",
          "stock",
          "tags",
        ].map((field) => (
          <div key={field}>
            <label className="block font-medium capitalize mb-1">
              {field === "image" ? "Image URL" : field}
            </label>
            <input
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              placeholder={`Enter ${field}`}
            />
          </div>
        ))}

        <div className="col-span-1 md:col-span-2 flex gap-4 mt-4">
          <button
            onClick={isEditing ? handleUpdateProduct : handleAddProduct}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && (
            <button
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Product List */}
      <h3 className="text-xl font-semibold mb-4">All Products ({products.length})</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{product.title}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">${product.price}</td>
                <td className="p-3">{product.stock}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6">
                  No products available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
