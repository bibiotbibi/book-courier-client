import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaBook } from 'react-icons/fa';

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axiosSecure.get('/books'); // fetch all books from backend
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaBook /> Manage Books
      </h3>

      {loading ? (
        <p className="text-gray-600">Loading books...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : books.length === 0 ? (
        <p className="text-gray-600">No books found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="px-4 py-2 font-medium">Book Name</th>
                <th className="px-4 py-2 font-medium">Author</th>
                <th className="px-4 py-2 font-medium">Category</th>
                <th className="px-4 py-2 font-medium">Price</th>
                <th className="px-4 py-2 font-medium">Quantity</th>
              </tr>
            </thead>
           <tbody>
  {books.map((book) => (
    <tr key={book._id} className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2 font-medium">{book.name}</td>
      <td className="px-4 py-2">
        <div className="flex flex-col">
          <span>{book.author?.name}</span>
          <span className="text-gray-500 text-sm">{book.author?.email}</span>
        </div>
      </td>
      <td className="px-4 py-2">{book.category}</td>
      <td className="px-4 py-2">${Number(book.price || 0).toFixed(2)}</td>
      <td className="px-4 py-2">{book.quantity}</td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default ManageBooks;
