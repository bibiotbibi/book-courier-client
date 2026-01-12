import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const blogs = [
  {
    title: "People come & go — but books always remain",
    subtitle: "How we preserve memories through delivery",
    short:
      "Every book carries a piece of someone’s life. Our mission is to protect those stories as they travel across cities and countries.",
    full: `At Book Courier, we believe books are not just paper — they are memories, knowledge, and emotional connections. 
When someone sends a book, they are sending a part of themselves. That is why we use layered protection, moisture control packaging, 
and custom-sized boxes to ensure every book arrives exactly as it was sent.

Whether it is a handwritten novel, a rare collector’s edition, or a university textbook, our delivery process is built around respect and care.`,
    image: "https://i.ibb.co/4wv3Ly8x/download-10.jpg",
    quote:
      "A book may travel thousands of miles, but its story must never be damaged.",
  },
  {
    title: "Behind every package is a story",
    subtitle: "Why Book Courier exists",
    short:
      "We started Book Courier because normal delivery services don’t understand books.",
    full: `Regular couriers treat books like ordinary parcels. We don’t. 
Our team is trained to handle fragile pages, rare bindings, and heavy academic collections. 
Each shipment is tracked, padded, and protected as if it were our own.

This is why libraries, authors, and readers trust Book Courier for their most valuable shipments.`,
    image: "https://i.ibb.co/WvjymhqZ/download-11.jpg",
    quote:
      "We don’t ship boxes. We ship knowledge.",
  },
];

const BlogCard = ({ blog, reverse }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Image frame */}
      <div className="relative">
        <div className="absolute -inset-4 border border-primary/30 rounded-3xl"></div>
        <img
          src={blog.image}
          alt={blog.title}
          className="relative rounded-3xl object-cover w-full h-[420px] shadow-xl"
        />
      </div>

      {/* Content */}
      <div className="space-y-6">
        <p className="uppercase tracking-widest text-secondary text-sm">
          Book Courier Journal
        </p>

        <h3 className="text-4xl  text-gray-900 leading-tight">
          {blog.title}
        </h3>

        <p className="text-primary  text-lg">
          {blog.subtitle}
        </p>

        <p className="text-gray-600">{blog.short}</p>

        <blockquote className="border-l-4 border-primary pl-4 text-gray-500 italic">
          “{blog.quote}”
        </blockquote>

        <button
          onClick={() => setOpen(!open)}
          className="text-primary font-semibold hover:text-secondary transition"
        >
          {open ? "Close" : "Read More →"}
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-600 leading-relaxed overflow-hidden"
            >
              {blog.full}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const BlogMagazineWhite = () => {
  return (
    <section className="py-32 bg-[#FBF9D1]">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        {blogs.map((blog, i) => (
          <BlogCard key={i} blog={blog} reverse={i % 2 !== 0} />
        ))}
      </div>
    </section>
  );
};

export default BlogMagazineWhite;
