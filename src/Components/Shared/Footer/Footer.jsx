import { Link } from "react-router";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { LuGithub } from "react-icons/lu";

const Footer = () => {
  return (
    <footer className="bg-secondary text-gray-300 py-12 px-6">

      {/* Logo */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-primary tracking-wide font-serif">
          BookCourier
        </h2>
      </div>

      {/* Quick Links */}
      <div className="flex justify-center gap-6 flex-wrap text-sm mb-8">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/all-books" className="hover:underline">All Books</Link>
        <Link to="/about-us" className="hover:underline">About Us</Link>
        <Link to="/coverage" className="hover:underline">Coverage</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/faq" className="hover:underline">FAQ</Link>
      </div>

      <hr className="border-gray-600 w-11/12 mx-auto mb-8" />

      {/* Contact Info */}
      <div className="text-center text-sm mb-8 space-y-1">
        <p>
          Email:{" "}
          <a href="mailto:support@bookcourier.com" className="hover:underline">
            support@bookcourier.com
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href="tel:+8801234567890" className="hover:underline">
            +880 1234-567890
          </a>
        </p>
        <p>Address: Dhaka, Bangladesh</p>
      </div>

      {/* Social Links */}
      <div className="flex justify-center gap-4 mb-8">
        {/* Replace href with your real social profiles */}
        <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaFacebookF size={18} />
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaXTwitter size={18} />
        </a>
        <a href="https://github.com/" target="_blank" rel="noreferrer" className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <LuGithub size={18} />
        </a>
        <a href="https://linkedin.com/in/" target="_blank" rel="noreferrer" className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaLinkedinIn size={18} />
        </a>
        <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaInstagram size={18} />
        </a>
      </div>

      {/* Policies */}
      <div className="text-center text-xs text-gray-500 space-x-4 mb-2">
        <Link to="/terms" className="hover:text-gray-300">Terms & Conditions</Link>
        <Link to="/privacy" className="hover:text-gray-300">Privacy Policy</Link>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-600">
        © {new Date().getFullYear()} BookCourier. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
