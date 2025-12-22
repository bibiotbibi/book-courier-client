import { useParams } from 'react-router';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  //  book details
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return result.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const { name, image, author, category, price, quantity, description } = book;

  // Add book to wishlist

  const handleAddToWishlist = async () => {
    if (!user?.email) {
      toast.error('Please login first');
      return;
    }

    try {
      await axiosSecure.post('/wishlist', book);
      toast.success('Added to wishlist!');
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info('Book already in wishlist');
      } else if (err.response?.status === 401) {
        toast.error('Unauthorized! Please login again.');
      } else {
        toast.error('Failed to add to wishlist');
      }
    }
  }


  return (
    <div className="max-w-7xl mx-auto mt-12 mb-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* Book Cover */}
        <div className="lg:col-span-3 flex justify-center">
          <div className="border border-secondary rounded-xl p-4 shadow-2xl bg-white">
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-md object-cover"
            />
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-6 space-y-5">
          <h1 className="text-3xl font-bold text-gray-900">{name}</h1>

          <p className="text-sm text-primary">
            Author: <span className="font-medium">{author?.name}</span>
          </p>

          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">{category}</span>
          </p>

          <div className="flex items-center gap-3 pt-2">
            <img
              src={author?.image}
              referrerPolicy="no-referrer"
              alt="author"
              className="w-9 h-9 rounded-full border"
            />
            <p className="text-sm text-gray-700">
              Sold by <span className="font-semibold">{author?.name}</span>
            </p>
          </div>

          <hr className="border-secondary" />

          <p className="text-gray-700 leading-relaxed text-justify">
            {description}
          </p>
        </div>

        {/*  Purchase Card */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 border border-secondary rounded-xl p-6 shadow-md bg-white space-y-5">
            <p className="text-3xl font-bold text-primary">${price}</p>

            <p className="text-sm text-green-600 font-medium">
              ✔ In Stock ({quantity} available)
            </p>

            <button
              onClick={() => setIsOpen(true)}
              className="w-full bg-primary hover:bg-secondary hover:text-black transition py-3 rounded-lg font-semibold text-white"
            >
              Order Now
            </button>

            <button
      onClick={handleAddToWishlist}
      className="w-full border border-secondary hover:bg-gray-100 transition py-3 rounded-lg text-sm font-medium"
    >
      Add to Wishlist
    </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 mx-15">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        <div className="border border-primary p-3 rounded-2xl mt-4">
          <select className="border border-primary p-1 mb-2">
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </select>

          <textarea
            className="border border-primary w-full p-2 mb-2"
            rows="2"
            placeholder="Write your review..."
          />

          <button className="bg-primary text-white px-4 py-1 rounded-xl">
            Submit Review
          </button>
        </div>
      </div>

      <PurchaseModal
        book={book}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default BookDetails;
