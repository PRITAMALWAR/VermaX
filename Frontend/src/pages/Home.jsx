
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowRight,
  Truck,
  ShieldCheck,
} from "lucide-react";

import ProductCard from "../components/Products/ProductCard";
import Footer from "../components/Common/Footer";
import productsData from "../data/products.json";

const Home = () => {
  const products = productsData.products || [];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [announcementIndex, setAnnouncementIndex] = useState(0);

  // Announcement messages
  const announcements = [
    "Free shipping on orders over $50",
    "Discover something new at ShopEase",
    "Find your everyday favorites",
    "Explore products across categories",
  ];

  // Change announcement every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAnnouncementIndex(
        (previousIndex) =>
          (previousIndex + 1) % announcements.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get available categories from existing product data
  const categories = [
    "All",
    ...new Set(
      products
        .map((product) => product.category)
        .filter(Boolean)
    ),
  ];

  // Get one product from each category, up to eight products
  const featuredProducts = [];
  const seenCategories = new Set();

  for (const product of products) {
    if (
      !product.category ||
      !seenCategories.has(product.category)
    ) {
      featuredProducts.push(product);

      if (product.category) {
        seenCategories.add(product.category);
      }
    }

    if (featuredProducts.length === 8) break;
  }

  // Filter products by category and search text
  const filteredProducts = featuredProducts.filter((product) => {
    const matchesCategory =
      category === "All" ||
      product.category === category;

    const productText = [
      product.title,
      product.name,
      product.category,
      product.description,
      product.brand,
      ...(Array.isArray(product.tags) ? product.tags : []),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return (
      matchesCategory &&
      productText.includes(search.trim().toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-white text-black">

      {/* Announcement Bar */}
      <div
        aria-live="polite"
        className="bg-black px-4 py-2.5 text-center text-xs text-white sm:text-sm"
      >
        <p
          key={announcementIndex}
          className="animate-[fadeIn_0.4s_ease-in-out]"
        >
          {announcements[announcementIndex]}
        </p>
      </div>

      <main>

        {/* Hero Section */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">

            {/* Hero Content */}
            <div>
              <p className="mb-3 text-sm font-medium text-gray-500">
                WELCOME TO SHOPEASE
              </p>

              <h1 className="max-w-xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
                Everyday shopping,
                <br />
                made simple.
              </h1>

              <p className="mt-5 max-w-md text-base leading-7 text-gray-600">
                Discover useful products, explore different categories,
                and find what you need without the hassle.
              </p>

              <Link
                to="/products"
                className="mt-7 inline-flex items-center gap-3 rounded-md bg-black px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Browse products
                <ArrowRight size={17} />
              </Link>

              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
                <span className="flex items-center gap-2">
                  <Truck size={17} />
                  Convenient shopping
                </span>

                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} />
                  Quality-focused selection
                </span>
              </div>
            </div>

            {/* Hero Image */}
            <div className="overflow-hidden rounded-lg bg-gray-100">
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1000"
                alt="Shopping and discovering products"
                className="h-64 w-full object-cover sm:h-80 md:h-[390px]"
              />
            </div>

          </div>
        </section>

        {/* Featured Products Section */}
        <section
          id="products"
          className="border-t border-gray-200"
        >
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10">

            {/* Section Heading */}
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Products you'll love
                </h2>

                <p className="mt-2 text-sm text-gray-600 sm:text-base">
                  Explore our selection of everyday products.
                </p>
              </div>

              <Link
                to="/products"
                className="inline-flex w-fit items-center gap-2 text-sm font-semibold hover:underline"
              >
                View all products
                <ArrowRight size={17} />
              </Link>
            </div>

            {/* Product Search */}
            <div className="mt-7 flex max-w-md items-center gap-3 rounded-md border border-gray-300 px-4 py-3 transition focus-within:border-black">
              <Search
                size={19}
                className="shrink-0 text-gray-500"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div className="mt-5 flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-md border px-4 py-2 text-sm transition ${
                    category === item
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-500"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Product Count */}
            <p className="mt-7 text-sm text-gray-500">
              {filteredProducts.length} products
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="min-w-0"
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <Search size={23} className="text-gray-500" />
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  No matching products
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Try another search or choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="mt-5 rounded-md bg-black px-5 py-3 text-sm text-white transition hover:bg-gray-800"
                >
                  Show all products
                </button>
              </div>
            )}

            {/* View All Button */}
            <div className="mt-10 text-center">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-md border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Explore entire collection
                <ArrowRight size={17} />
              </Link>
            </div>

          </div>
        </section>

        {/* Information Section */}
        <section className="border-t border-gray-200 bg-gray-50">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-3 lg:px-10">

            <div>
              <h3 className="font-semibold">
                Easy to explore
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Browse products and categories in one convenient place.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                A simple experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Find products with straightforward search and navigation.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Need help?
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Learn more about ShopEase and what we offer.
              </p>

              <Link
                to="/about"
                className="mt-3 inline-flex items-center gap-1 text-sm font-semibold hover:underline"
              >
                About us
                <ArrowRight size={15} />
              </Link>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default Home;
