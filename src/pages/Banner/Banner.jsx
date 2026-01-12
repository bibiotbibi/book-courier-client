import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { ChevronsDown } from "lucide-react";

const slides = [
  {
    image: "https://i.ibb.co/YFpgMP2x/download-8.jpg",
    title: "Discover Trending Books",
    text: "Explore a curated collection of the most popular books across every genre.",
    bgGradient: "from-purple-400/20 via-pink-400/10 to-transparent",
  },
  {
    image: "https://i.ibb.co/PGhcXnqz/rey-seven-nm-m-Z4-Cs2-I-unsplash-1.jpg",
    title: "Read. Learn. Grow.",
    text: "Expand your knowledge with carefully selected educational and fiction titles.",
    bgGradient: "from-indigo-400/20 via-blue-400/10 to-transparent",
  },
  {
    image: "https://i.ibb.co/21Db91YH/nick-fewings-8sud-g8m-I0-unsplash.jpg",
    title: "Your Online Book Library",
    text: "Thousands of books, one beautiful reading destination.",
    bgGradient: "from-emerald-400/20 via-teal-400/10 to-transparent",
  },
];

const BookBanner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((prev) => (prev + 1) % slides.length),
      5500
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[75vh] md:min-h-[80vh] bg-[#FBF9D1] overflow-hidden">
      {/* Background */}
      <div className={`absolute inset-0  ${slides[current].bgGradient}`} />
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 flex flex-col md:flex-row items-center gap-14">
        
        {/* LEFT CONTENT */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                {slides[current].title}
              </h1>

              <p className="text-gray-600 text-lg leading-relaxed max-w-xl">
                {slides[current].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA BUTTON */}
          <div className="pt-4 flex justify-center md:justify-start">
            <Link to="/all-books">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="px-8 py-3 border-2 border-secondary rounded-xl text-primary font-semibold bg-white/70 backdrop-blur shadow-lg hover:bg-white"
              >
                Browse Books
              </motion.button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1  flex justify-center items-center">
          <AnimatePresence mode="wait">
            <motion.img
              key={slides[current].image}
              src={slides[current].image}
              alt="Books"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-90 h-50 md:h-70 
                rounded-2xl  max-w-md md:max-w-lg object-cover shadow-2xl"
            />
          </AnimatePresence>
        </div>
      </div>

      {/* DOTS */}
      <div className="relative z-10 flex justify-center gap-3 pb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-primary" : "w-2.5 bg-gray-400/70"
            }`}
          />
        ))}
      </div>

      {/* SCROLL HINT */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-700"
      >
        <ChevronsDown size={26} />
      </motion.div>
    </section>
  );
};

export default BookBanner;
