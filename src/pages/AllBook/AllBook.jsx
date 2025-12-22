import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import BookCard from "../Home/BookCard/BookCard";

const AllBook = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc

  // Fetch all books
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["/books"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
      return result.data; // direct array
    },
  });

  // Filter & sort books
  const filteredBooks = useMemo(() => {
    let filtered = books;

    // search by name
    if (search) {
      filtered = filtered.filter((book) =>
        book.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // sort by price
    filtered = filtered.sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
    });

    return filtered;
  }, [books, search, sortOrder]);

  if (isLoading) return <p>Loading....</p>;

  return (
    <div className="p-6 bg-[#FBF9D1] px-15">
      <h1 className="text-4xl text-center  font-bold mb-10">All Books</h1>

      {/* Search & Sort Controls */}
      <div className="flex justify-between md:flex-row md:items-center gap-4 mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border-gray-400 border px-4 py-2 rounded w-full md:w-1/3"
        />

        {/* Sort */}
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-200 px-4 py-2 rounded w-full md:w-1/4"
        >
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No books found.</p>
      )}
    </div>
  );
};

export default AllBook;
