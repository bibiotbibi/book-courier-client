import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  if (!book) return null;

  const { _id, name, image, author, category, price, quantity } = book;

  return (
    <div className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300 bg-white">

      {/* Image with gradient overlay */}
      <div className="px-10 py-2 h-64">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Gradient */}
        <div className=" inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Category badge */}
        <span className="absolute shadow-black shadow-2xl top-4 left-4 px-3 py-1 text-xs rounded-full bg-white text-gray-800 font-medium">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 line-clamp-1">
          {name}
        </h2>

        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={author?.image}
            alt={author?.name}
            className="w-8 h-8 rounded-full object-cover border"
          />
          <p className="text-sm text-gray-600">{author?.name}</p>
        </div>

        {/* Price & Quantity */}
        <div className="flex justify-between items-center text-sm text-gray-700 pt-1">
          <p className="font-semibold text-primary">$ {price}</p>
          <p className="text-xs text-gray-500">{quantity} in stock</p>
        </div>

        {/* Button */}
        <Link
          to={`/book-details/${_id}`}
          className="block w-full text-center mt-3 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-secondary hover:text-black transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
