import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    image: "https://i.ibb.co/dwqF8qXm/Screenshot-13-removebg-preview.png",
    title: "Discover Trending Books",
    text: "Explore a wide collection of the most popular books across all genres.",
    bgGradient: "from-purple-500 to-pink-500",
  },
  {
    image: "https://i.ibb.co/Y4TmjF2J/Screenshot-16-removebg-preview.png",
    title: "Read, Learn & Grow",
    text: "Expand your knowledge with the best educational, fiction, and non-fiction books.",
    bgGradient: "from-indigo-500 to-blue-500",
  },
  {
    image: "https://i.ibb.co/qYGCHvgw/Screenshot-15-removebg-preview.png",
    title: "Your Favorite Library Online",
    text: "Browse thousands of books and dive into a world of imagination.",
    bgGradient: "from-emerald-400 to-teal-500",
  },
];

const BookBanner = () => {
  const [current, setCurrent] = useState(0);

  // Auto Slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[90vh] overflow-hidden bg-[#FBF9D1]">
      {/* Background Gradient + Glow */}
      <div className="absolute inset-0 z-0">
        
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-16 lg:px-24 py-10 gap-10 h-full">
        {/* LEFT TEXT */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">
                {slides[current].title}
              </h1>
              <p className="text-gray-600 text-lg md:text-xl max-w-md">
                {slides[current].text}
              </p>
              <Link to="/all-books">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.4)" }}
                  className="px-8 py-3 bg-primary text-secondary hover:text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  View All Books
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].image}
              src={slides[current].image}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-md md:max-w-lg object-contain drop-shadow-2xl"
              alt="Book Banner"
            />
          </AnimatePresence>

          {/* Floating Circle Decorations */}
         
        </div>
      </div>

      {/* Slide Dots */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              idx === current ? "bg-white scale-125" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default BookBanner;
