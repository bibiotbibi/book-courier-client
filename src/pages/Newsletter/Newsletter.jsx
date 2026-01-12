import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  return (
    <section
      className="relative w-full py-24 px-6 bg-fixed bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Stay Connected With <br />
            <span className="text-secondary">Book Courier</span>
          </h2>

          <p className="mt-6 text-gray-300 text-lg">
            Join thousands of authors, publishers and readers receiving
            exclusive delivery offers, book shipping tips, and early access to
            new services.
          </p>

          <ul className="mt-6 space-y-3 text-gray-200">
            <li>📦 Special shipping discounts</li>
            <li>📚 Book packaging & safety tips</li>
            <li>🚚 New delivery area alerts</li>
            <li>✍️ Author & publisher updates</li>
          </ul>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl rounded-2xl p-10 shadow-2xl border border-white/20"
        >
          <h3 className="text-2xl font-semibold text-white">
            Subscribe to Our Newsletter
          </h3>

          <p className="mt-2 text-gray-300">
            Get the latest book delivery news directly to your inbox.
          </p>

          <form className="mt-8 space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-secondary"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-5 py-4 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-secondary"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-4 bg-primary text-white font-semibold rounded-lg shadow-lg hover:bg-primary/70 transition"
            >
              Join Book Courier
            </motion.button>
          </form>

          <p className="mt-4 text-sm text-gray-300">
            We respect your privacy. No spam, only book-related updates.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
