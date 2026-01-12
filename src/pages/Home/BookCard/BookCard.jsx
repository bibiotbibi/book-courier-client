import React from "react";
import { Link } from "react-router";

const BookCard = ({ book }) => {
  if (!book) return null;

  const { _id, name, image, author, category, price, quantity } = book;

  return (
    <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full">
      
      {/* Compact Image Area */}
      <div className="relative h-42 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Minimal Category Badge */}
        <span className="absolute top-2 left-2 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-primary/70 rounded-sm">
          {category}
        </span>
      </div>

      {/* Compact Content Area */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Title - Truncated to 1 line */}
        <h3 className="text-base font-bold text-primary line-clamp-1 mb-1 leading-tight">
          {name}
        </h3>
        
        {/* Author - Small, gray */}
        <p className="text-xs text-gray-500 mb-3 truncate">
          by {author?.name || "Unknown"}
        </p>

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-gray-50">
          {/* Price - Bold Accent */}
          <span className="text-sm font-bold text-primary">
            ${price}
          </span>
          
          {/* Stock Status Indicator */}
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${quantity > 0 ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50'}`}>
            {quantity > 0 ? "In Stock" : "Sold Out"}
          </span>
        </div>

        {/* Small Action Button */}
        <Link
          to={`/book-details/${_id}`}
          className="mt-3 block w-full text-center py-2 text-xs font-semibold text-primary border border-gray-200 rounded hover:bg-primary hover:text-white hover:border-primary transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default BookCard;