import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../Home/BookCard/BookCard";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const AllBook = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); // default, asc, desc
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  
  // How many books to show per page
  const itemsPerPage = 8; 

  // Fetch all books (Client-side filtering)
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data;
    },
  });

  // 1. Extract Unique Categories dynamically
  const categories = useMemo(() => {
    if (!books || books.length === 0) return ["All"];
    const uniqueCats = new Set(books.map((book) => book.category));
    return ["All", ...Array.from(uniqueCats)];
  }, [books]);

  // 2. Filter & Sort Logic
  const filteredAndSortedBooks = useMemo(() => {
    let tempBooks = [...books];

    // Filter by Category
    if (selectedCategory !== "All") {
      tempBooks = tempBooks.filter((book) => book.category === selectedCategory);
    }

    // Filter by Search
    if (search) {
      tempBooks = tempBooks.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortOrder === "asc") {
      tempBooks.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortOrder === "desc") {
      tempBooks.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
    // 'default' keeps the original order (usually newest added)

    return tempBooks;
  }, [books, selectedCategory, search, sortOrder]);

  // 3. Pagination Logic
  const totalFilteredBooks = filteredAndSortedBooks.length;
  const totalPages = Math.ceil(totalFilteredBooks / itemsPerPage);
  
  // Get books for the current page
  const currentBooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredAndSortedBooks.slice(startIndex, endIndex);
  }, [filteredAndSortedBooks, currentPage]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCategory, sortOrder]);

  // Handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  if (isLoading) return <div className="text-center py-20 text-xl">Loading...</div>;

  return (
    <div className="p-6 bg-[#FBF9D1] min-h-screen px-4 md:px-10">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
          All Books
        </h1>
        <p className="text-gray-600">Explore our entire collection</p>
      </div>

      {/* Controls Section */}
      <div className=" p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col lg:flex-row gap-4 justify-between items-center top-4 z-10">
        
        {/* Left: Search & Category */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            />
          </div>

          {/* Category Dropdown */}
          <div className="relative w-full sm:w-48">
            <span className="absolute left-3 top-2.5 text-gray-400">
              <ChevronDown size={18} />
            </span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg w-full appearance-none  focus:outline-none focus:ring-2 focus:ring-primary/50 transition cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Right: Sort */}
        <div className="w-full lg:w-auto">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg  focus:outline-none focus:ring-2 focus:ring-primary/50 transition cursor-pointer"
          >
            <option value="default">Sort by: Default</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Info Bar */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-600 font-medium px-2">
        <span>
          Showing {currentBooks.length} of {totalFilteredBooks} books
        </span>
        {totalFilteredBooks > 0 && (
          <span>Page {currentPage} of {totalPages}</span>
        )}
      </div>

      {/* Books Grid */}
      {currentBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {currentBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
          <p className="text-xl text-gray-500 font-medium">No books found matching your filters.</p>
          <button 
            onClick={() => {setSearch(''); setSelectedCategory('All'); setSortOrder('default');}}
            className="mt-4 text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
            }`}
          >
            <ChevronLeft size={16} /> Prev
          </button>

          {/* Simple Page Indicators */}
          <div className="flex gap-2">
            <span className={`w-2 h-2 rounded-full ${currentPage === 1 ? 'bg-primary scale-125' : 'bg-gray-300'} transition-all`}></span>
            <span className={`w-2 h-2 rounded-full ${currentPage === 2 ? 'bg-primary scale-125' : 'bg-gray-300'} transition-all`}></span>
            <span className={`w-2 h-2 rounded-full ${currentPage === 3 ? 'bg-primary scale-125' : 'bg-gray-300'} transition-all`}></span>
            {/* Visual indicator for more pages */}
            {totalPages > 3 && <span className="text-gray-400 text-xs flex items-center">...</span>}
          </div>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-sm"
            }`}
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBook;