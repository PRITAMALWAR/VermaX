
import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-black text-white">
                <ShoppingBag size={21} />
              </span>

              <span className="text-2xl font-bold tracking-tight">
                VermaX
              </span>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-gray-600">
              Discover products for your everyday needs. We make it
              easier to explore, find your favorites, and enjoy a simple
              shopping experience.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-black hover:text-black"
              >
                <Facebook size={18} />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-black hover:text-black"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-black hover:text-black"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/" className="text-sm text-gray-600 hover:text-black">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm text-gray-600 hover:text-black">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-gray-600 hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-gray-600 hover:text-black">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Customer Care
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/returns" className="text-sm text-gray-600 hover:text-black">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-sm text-gray-600 hover:text-black">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-600 hover:text-black">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-black">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide">
              Get in Touch
            </h3>

            <p className="mt-6 text-sm leading-6 text-gray-600">
              Have a question? Get in touch with us.
            </p>

            <div className="mt-5 space-y-4">
              <a
                href="mailto:support@vermax.com"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-black"
              >
                <Mail size={18} className="shrink-0 text-black" />
                <span>support@vermax.com</span>
              </a>

              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-black"
              >
                <Phone size={18} className="shrink-0 text-black" />
                <span>+1 (800) 123-4567</span>
              </a>

              <div className="flex items-center gap-3 text-sm text-gray-600">
                <MapPin size={18} className="shrink-0 text-black" />
                <span>123 Commerce St, City, Country</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
