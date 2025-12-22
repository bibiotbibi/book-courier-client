import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const authors = [
  {
    id: 1,
    name: "J.K. Rowling",
    bio: "Author of the world-famous Harry Potter series.",
    image: "https://i.ibb.co.com/5XWdkYf1/jk.webp",
  },
  {
    id: 2,
    name: "George R.R. Martin",
    bio: "Creator of the epic fantasy series 'A Song of Ice and Fire'.",
    image: "https://i.ibb.co.com/B8FN6bG/Portrait-photoshoot-at-Worldcon-75-Helsinki-before-the-Hugo-Awards-George-R-R-Martin-cropped.jpg",
  },
  {
    id: 3,
    name: "Paulo Coelho",
    bio: "Author of 'The Alchemist' and inspirational books.",
    image: "https://i.ibb.co.com/fzswZyKD/notexist2.jpg",
  },
  {
    id: 4,
    name: "Agatha Christie",
    bio: "Queen of mystery novels, author of Hercule Poirot series.",
    image: "https://i.ibb.co.com/Wp3YrMYj/699ea405f21c6ce6.jpg",
  },
  {
    id: 5,
    name: "Ernest Hemingway",
    bio: "Nobel Prize-winning author known for classics like 'The Old Man and the Sea'.",
    image: "https://i.ibb.co.com/8gScrmpv/IMG-1312.jpg",
  },
];


const Writers = () => {
  return (
   <section className="relative py-24 bg-gradient-to-b from-[#5E2A2B80]  via-[#C9A99A] to-[#FBF9D1] overflow-hidden">

      <div className="absolute top-0 left-0 w-72 h-72 bg-[#C9A99A] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Legendary Book Writers
        </h2>
        <p className="text-gray-700 mb-16 max-w-2xl mx-auto">
          Meet some of the most influential authors whose stories shaped generations.
        </p>

   <div className="flex flex-wrap justify-center -mx-4">
          {authors.map((author, index) => (
            <motion.div
              key={author.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative w-64 m-4 bg-white rounded-3xl shadow-2xl transform hover:-translate-y-4 hover:scale-105 transition-all cursor-pointer overflow-hidden"
            >
              <div className="relative">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-72 object-cover rounded-3xl"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-6 rounded-3xl">
                  <h3 className="text-xl font-bold text-white">{author.name}</h3>
                  <p className="text-gray-200 text-sm mt-1">{author.bio}</p>
                 
                    <button className="mt-4 bg-primary hover:bg-secondary hover:text-black  text-white py-2 px-4 rounded-lg font-semibold transition-all">
                      View Books
                    </button>
                 
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Writers;
