
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  X,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Navbar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { state } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (onSearch) {
      onSearch(query);
    } else {
      navigate(
        query
          ? `/products?search=${encodeURIComponent(query)}`
          : "/products"
      );
    }

    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors ${
      isActive
        ? "text-black after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-black"
        : "text-gray-600 hover:text-black"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white">
      <nav className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-[76px] items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              aria-label="ShopEase home"
              className="flex shrink-0 items-center gap-2.5"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                <ShoppingBag size={21} />
              </span>

              <span className="text-xl font-bold tracking-tight sm:text-2xl">
                VermaX
              </span>
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              className="mx-5 hidden max-w-md flex-1 md:block"
            >
              <div className="flex items-center rounded-md border border-gray-300 transition focus-within:border-black">
                <Search
                  size={18}
                  className="ml-3 shrink-0 text-gray-500"
                />

                <input
                  type="search"
                  value={searchQuery}
                  onChange={(event) =>
                    setSearchQuery(event.target.value)
                  }
                  placeholder="Search products..."
                  aria-label="Search products"
                  className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-gray-400"
                />

                <button
                  type="submit"
                  className="m-1 rounded px-3 py-2 text-xs font-semibold text-black transition hover:bg-gray-100"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-6 lg:flex">
              <NavLink to="/" className={navLinkClass}>
                Home
              </NavLink>

              <NavLink to="/products" className={navLinkClass}>
                Products
              </NavLink>

              <NavLink to="/about" className={navLinkClass}>
                About
              </NavLink>

              {isLoggedIn && user?.role === "admin" && (
                <NavLink
                  to="/admin/products"
                  className={navLinkClass}
                >
                  Admin
                </NavLink>
              )}
            </div>

            {/* Desktop Account Actions */}
            <div className="hidden items-center gap-4 md:flex">

              {/* Cart */}
              <Link
                to="/cart"
                aria-label={`Shopping cart, ${state.totalItems || 0} items`}
                className="relative rounded-md p-2 text-gray-700 transition hover:bg-gray-100 hover:text-black"
              >
                <ShoppingCart size={21} />

                {state.totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                    {state.totalItems}
                  </span>
                )}
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/profile"
                    className="flex max-w-32 items-center gap-2 text-sm font-medium text-gray-700 hover:text-black"
                  >
                    <User size={19} />
                    <span className="truncate">
                      {user?.username || "Account"}
                    </span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium transition hover:border-black hover:bg-gray-50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    to="/login"
                    className="text-sm font-semibold text-gray-700 transition hover:text-black"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-1 md:hidden">
              <Link
                to="/cart"
                aria-label="Shopping cart"
                className="relative rounded-md p-2 text-black hover:bg-gray-100"
              >
                <ShoppingCart size={21} />

                {state.totalItems > 0 && (
                  <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">
                    {state.totalItems}
                  </span>
                )}
              </Link>

              <button
                type="button"
                onClick={() =>
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                }
                aria-label={
                  isMobileMenuOpen ? "Close menu" : "Open menu"
                }
                aria-expanded={isMobileMenuOpen}
                className="rounded-md p-2 transition hover:bg-gray-100"
              >
                {isMobileMenuOpen ? (
                  <X size={23} />
                ) : (
                  <Menu size={23} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 py-5 md:hidden">

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-5">
                <div className="flex items-center rounded-md border border-gray-300 focus-within:border-black">
                  <Search
                    size={18}
                    className="ml-3 shrink-0 text-gray-500"
                  />

                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) =>
                      setSearchQuery(event.target.value)
                    }
                    placeholder="Search products..."
                    aria-label="Search products"
                    className="w-full min-w-0 bg-transparent px-3 py-3 text-sm outline-none"
                  />

                  <button
                    type="submit"
                    className="px-3 py-3 text-sm font-semibold"
                  >
                    Go
                  </button>
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <div className="flex flex-col gap-1">
                <NavLink
                  to="/"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/about"
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `rounded-md px-3 py-3 text-sm font-medium ${
                      isActive
                        ? "bg-gray-100 text-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`
                  }
                >
                  About
                </NavLink>

                {isLoggedIn && user?.role === "admin" && (
                  <NavLink
                    to="/admin/products"
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `rounded-md px-3 py-3 text-sm font-medium ${
                        isActive
                          ? "bg-gray-100 text-black"
                          : "text-gray-600 hover:bg-gray-50 hover:text-black"
                      }`
                    }
                  >
                    Admin Panel
                  </NavLink>
                )}

                <Link
                  to="/cart"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black"
                >
                  <ShoppingCart size={19} />
                  Cart ({state.totalItems || 0})
                </Link>
              </div>

              {/* Mobile Account Actions */}
              <div className="mt-4 border-t border-gray-200 pt-4">
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <Link
                      to="/profile"
                      onClick={closeMobileMenu}
                      className="flex items-center gap-2 px-3 py-2 text-sm font-medium hover:text-gray-600"
                    >
                      <User size={18} />
                      {user?.username || "My Account"}
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/login"
                      onClick={closeMobileMenu}
                      className="rounded-md border border-gray-300 px-4 py-3 text-center text-sm font-semibold hover:border-black"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={closeMobileMenu}
                      className="rounded-md bg-black px-4 py-3 text-center text-sm font-semibold text-white hover:bg-gray-800"
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
    </header>
  );
};

export default Navbar;











// import React, { useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
// import { useCart } from "../../context/CartContext";
// import { useAuth } from "../../context/AuthContext";

// const Navbar = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { state } = useCart();
//   const { user, isLoggedIn, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (onSearch) {
//       onSearch(searchQuery);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/');
//     setIsMobileMenuOpen(false);
//   };

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <Link to="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
//             VermaX
//           </Link>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex flex-1 max-w-md mx-8">
//             <form onSubmit={handleSearch} className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//               />
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//             </form>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             <NavLink 
//               to="/" 
//               className={({ isActive }) => 
//                 `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink 
//               to="/products" 
//               className={({ isActive }) => 
//                 `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//               }
//             >
//               Products
//             </NavLink>
//             <NavLink 
//               to="/about" 
//               className={({ isActive }) => 
//                 `hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//               }
//             >
//               About
//             </NavLink>

//             {/* Cart Icon */}
//             <Link to="/cart" className="relative hover:text-purple-600 transition-colors">
//               <ShoppingCart className="w-6 h-6" />
//               {state.totalItems > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                   {state.totalItems}
//                 </span>
//               )}
//             </Link>

//             {/* User Menu */}
//             {isLoggedIn ? (
//               <div className="flex items-center space-x-4">
//                 <Link 
//                   to="/profile" 
//                   className="flex items-center space-x-1 hover:text-purple-600 transition-colors"
//                 >
//                   <User className="w-5 h-5" />
//                   <span>{user?.username}</span>
//                 </Link>
//                 <button 
//                   onClick={handleLogout}
//                   className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link 
//                   to="/login" 
//                   className="text-purple-600 hover:text-purple-700 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link 
//                   to="/signup" 
//                   className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
//           >
//             {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 py-4">
//             {/* Mobile Search */}
//             <div className="mb-4">
//               <form onSubmit={handleSearch} className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search products..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//                 />
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               </form>
//             </div>

//             {/* Mobile Navigation Links */}
//             <div className="space-y-3">
//               <NavLink 
//                 to="/" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink 
//                 to="/products" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//                 }
//               >
//                 Products
//               </NavLink>
//               <NavLink 
//                 to="/about" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className={({ isActive }) => 
//                   `block hover:text-purple-600 transition-colors ${isActive ? 'text-purple-600 font-medium' : 'text-gray-700'}`
//                 }
//               >
//                 About
//               </NavLink>
              
//               <Link 
//                 to="/cart" 
//                 onClick={() => setIsMobileMenuOpen(false)}
//                 className="flex items-center space-x-2 hover:text-purple-600 transition-colors"
//               >
//                 <ShoppingCart className="w-5 h-5" />
//                 <span>Cart ({state.totalItems})</span>
//               </Link>

//               {isLoggedIn ? (
//                 <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
//                   <Link 
//                     to="/profile" 
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="flex items-center space-x-2 hover:text-purple-600 transition-colors"
//                   >
//                     <User className="w-5 h-5" />
//                     <span>{user?.username}</span>
//                   </Link>
//                   <button 
//                     onClick={handleLogout}
//                     className="block w-full text-left bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
//                   >
//                     Logout
//                   </button>
//                 </div>
//               ) : (
//                 <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
//                   <Link 
//                     to="/login" 
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block text-purple-600 hover:text-purple-700 transition-colors"
//                   >
//                     Login
//                   </Link>
//                   <Link 
//                     to="/signup" 
//                     onClick={() => setIsMobileMenuOpen(false)}
//                     className="block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors text-center"
//                   >
//                     Sign Up
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



































