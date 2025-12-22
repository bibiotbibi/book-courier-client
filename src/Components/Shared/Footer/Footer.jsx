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

      {/* Top Quick Links */}
      <div className="flex justify-center gap-8 text-sm mb-8">
        <a href="/" className="text-white">BRANDS</a>
        <a href="/" className="text-white">MEDIA</a>
        <a href="/" className="text-white">PR AGENCIES</a>
      </div>

      <hr className="border-gray-600 w-11/12 mx-auto mb-8" />

      {/* Bottom Quick Links */}
      <div className="flex justify-center flex-wrap gap-6 text-sm mb-8">
        <a href="/" className="text-white">BRAND DIRECTORY</a>
        <a href="/" className="text-white">CASE STUDIES</a>
        <a href="/" className="text-white">BLOG</a>
        <a href="/" className="text-white">PRICING</a>
        <a href="/" className="text-white">FAQ</a>
        <a href="/" className="text-white">ABOUT</a>
        <a href="/" className="text-white">CONTACT</a>
      </div>

      {/* Contact Details (added) */}
      <div className="text-center text-sm mb-8 space-y-1">
        <p>Email: <span className="text-white">support@bookcourier.com</span></p>
        <p>Phone: <span className="text-white">+880 1234-567890</span></p>
        <p>Address: <span className="text-white">Dhaka, Bangladesh</span></p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-4 mb-8">
        <button className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaFacebookF size={18} />
        </button>

        <button className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaXTwitter size={18} />
        </button>

        <button className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <LuGithub size={18} />
        </button>

        <button className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaLinkedinIn size={18} />
        </button>

        <button className="bg-[#5E2A2B] p-3 rounded-full hover:bg-[#333]">
          <FaInstagram size={18} />
        </button>
      </div>

      {/* Policies */}
      <div className="text-center text-xs text-gray-500 space-x-4 mb-2">
        <a href="/" className="hover:text-gray-300">Terms & Conditions</a>
        <a href="/" className="hover:text-gray-300">Privacy Policy</a>
      </div>

      {/* Copyright */}
      <p className="text-center text-xs text-gray-600">
        Copyright © 2025 BookCourier. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
