
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Common/Navbar";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./components/Products/ProductDetails";
import Cart from "./components/Cart/Cart";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Profile from "./pages/Profile";
import About from "./pages/About";
import AdminProducts from "./pages/AdminProducts";
import Page404 from "./pages/Page404";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/about" element={<About />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/products" 
                    element={
                      <ProtectedRoute adminOnly={true}>
                        <AdminProducts />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Suspense>
            </main>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  style: {
                    background: '#10B981',
                  },
                },
                error: {
                  style: {
                    background: '#EF4444',
                  },
                },
              }}
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;















































// import React, { Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import { AuthProvider } from "./context/AuthContext";
// import { CartProvider } from "./context/CartContext";
// import Navbar from "./components/Common/Navbar";
// import ProtectedRoute from "./components/Common/ProtectedRoute";
// import Home from "./pages/Home";
// import Products from "./pages/Products";
// import ProductDetails from "./components/Products/ProductDetails";
// import Cart from "./components/Cart/Cart";
// import Login from "./components/Auth/Login";
// import Signup from "./components/Auth/Signup";
// import Profile from "./pages/Profile";
// import About from "./pages/About";
// import AdminProducts from "./pages/AdminProducts";

// import Page404 from "./pages/Page404";

// function App() {
//   return (
//     <AuthProvider>
//       <CartProvider>
//         <Router>
//           <div className="min-h-screen bg-gray-50">
//             <Navbar />
//             <main className="flex-1">
//               <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/products" element={<Products />} />
//                   <Route path="/products/:id" element={<ProductDetails />} />
//                   <Route path="/cart" element={<Cart />} />
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/signup" element={<Signup />} />
//                   <Route path="/about" element={<About />} />
//                   <Route 
//                     path="/profile" 
//                     element={
//                       <ProtectedRoute>
//                         <Profile />
//                       </ProtectedRoute>
//                     } 
//                   />
//                   <Route path="/admin/products" element={<AdminProducts />} />
//                   <Route path="*" element={<Page404 />} />
//                 </Routes>
//               </Suspense>
//             </main>

//             <Toaster
//               position="top-right"
//               toastOptions={{
//                 duration: 3000,
//                 style: {
//                   background: '#363636',
//                   color: '#fff',
//                 },
//                 success: {
//                   style: {
//                     background: '#10B981',
//                   },
//                 },
//                 error: {
//                   style: {
//                     background: '#EF4444',
//                   },
//                 },
//               }}
//             />
//           </div>
//         </Router>
//       </CartProvider>
//     </AuthProvider>
//   );
// }

// export default App;

























