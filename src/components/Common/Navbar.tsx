import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { state } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
            ShopEase
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
              }
            >
              About
            </NavLink>

            {/* Cart Icon */}
            <Link to="/cart" className="relative hover:text-purple-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {state.totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>{user?.username}</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="text-purple-600 hover:text-purple-700 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {/* Mobile Search */}
            <div className="mb-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-3">
              <NavLink 
                to="/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
                }
              >
                Home
              </NavLink>
              <NavLink 
                to="/products" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
                }
              >
                Products
              </NavLink>
              <NavLink 
                to="/about" 
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => 
                  `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
                }
              >
                About
              </NavLink>
              
              <Link 
                to="/cart" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 hover:text-purple-600 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Cart ({state.totalItems})</span>
              </Link>

              {isLoggedIn ? (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
                  <Link 
                    to="/profile" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 hover:text-purple-600 transition-colors"
                  >
                    <User className="w-5 h-5" />
                    <span>{user?.username}</span>
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;