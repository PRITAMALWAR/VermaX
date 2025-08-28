import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 text-white py-12 mt-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-yellow-300">VermaX</h3>
            <p className="text-white mb-4">
              Your one-stop destination for quality products at unbeatable prices.
              Shop with confidence and convenience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-yellow-300 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-yellow-300 transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-300 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-300 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/returns" className="hover:text-yellow-300 transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-yellow-300 transition-colors">Shipping Info</Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-yellow-300 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-yellow-300 transition-colors">Terms of Service</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-300" />
                <span className="text-white">support@VermaX.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-300" />
                <span className="text-white">+1 (800) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-yellow-300" />
                <span className="text-white">123 Commerce St, City, Country</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm mb-4 md:mb-0">
              &copy; 2025 VermaX. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-white hover:text-yellow-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white hover:text-yellow-300 text-sm transition-colors">
                Terms of Use
              </Link>
              <Link to="/cookies" className="text-white hover:text-yellow-300 text-sm transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
