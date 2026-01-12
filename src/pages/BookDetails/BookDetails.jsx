import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import PurchaseModal from '../../components/Modal/PurchaseModal';
import BookCard from '../../../src/pages/Home/BookCard/BookCard';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const BookDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  // State for Review Form
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch Main Book Details
  const { data: book = {}, isLoading } = useQuery({
    queryKey: ['book', id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/books/${id}`
      );
      return result.data;
    },
  });

  // 2. Fetch Related Books
  const { data: relatedBooks = [] } = useQuery({
    queryKey: ['relatedBooks', book?.category, book?._id],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/books?category=${book.category}`
      );
      return (result.data || []).filter((b) => b._id !== id).slice(0, 3);
    },
    enabled: !!book?.category,
  });

  // 3. Fetch Reviews for this Book
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?bookId=${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <p className="text-center mt-20">Loading...</p>;
  }

  const { name, image, author, category, price, quantity, description } = book;

  const handleAddToWishlist = async () => {
    if (!user?.email) {
      toast.error('Please login first');
      navigate('/login'); // Optional: navigate to login on wishlist click too
      return;
    }
    try {
      await axiosSecure.post('/wishlist', book);
      toast.success('Added to wishlist!');
    } catch (err) {
      if (err.response?.status === 409) {
        toast.info('Book already in wishlist');
      } else {
        toast.error('Failed to add to wishlist');
      }
    }
  };

  // Submit Review Function
  const handleReviewSubmit = async () => {
    if (!user?.email) {
      toast.error('Please login to write a review');
      return;
    }
    if (!reviewText.trim()) {
      toast.error('Please write a comment');
      return;
    }

    const reviewData = {
      bookId: id,
      bookName: name,
      userName: user?.displayName || user?.email,
      userImage: user?.photoURL,
      rating: parseInt(rating),
      comment: reviewText,
      date: new Date().toISOString(),
    };

    try {
      await axiosSecure.post('/reviews', reviewData);
      toast.success('Review submitted successfully!');
      setReviewText("");
      setRating(5);
      refetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit review');
    }
  };

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

        {/* Purchase Card */}
        <div className="lg:col-span-3">
          <div className="sticky top-24 border border-secondary rounded-xl p-6 shadow-md bg-white space-y-5">
            <p className="text-3xl font-bold text-primary">${price}</p>

            <p className="text-sm text-green-600 font-medium">
              ✔ In Stock ({quantity} available)
            </p>

            {/* UPDATED BUTTON LOGIC */}
            <button
              onClick={() => {
                if (user && user.email) {
                  setIsOpen(true);
                } else {
                  toast.error("Please login to purchase");
                  navigate('/login');
                }
              }}
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

        {/* Review Input Form */}
        <div className="border border-primary p-3 rounded-2xl mt-4">
          <select 
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border border-primary p-1 mb-2 w-full md:w-auto"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} Star
              </option>
            ))}
          </select>

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border border-primary w-full p-2 mb-2"
            rows="2"
            placeholder="Write your review..."
          />

          <button 
            onClick={handleReviewSubmit}
            className="bg-primary text-white px-4 py-1 rounded-xl"
          >
            Submit Review
          </button>
        </div>

        {/* Display Existing Reviews */}
        <div className="space-y-4 mt-8">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review._id} className="border border-primary p-3 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {review.userImage && (
                      <img src={review.userImage} alt="User" className="w-6 h-6 rounded-full" />
                    )}
                    <span className="font-bold text-sm text-gray-800">{review.userName}</span>
                  </div>
                  <span className="text-xs text-primary font-bold bg-gray-100 px-2 py-1 rounded">
                    {review.rating} ★
                  </span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>

      {/* RELATED BOOKS SECTION */}
      {relatedBooks.length > 0 && (
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You may also like
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {relatedBooks.map((relatedBook) => (
              <BookCard key={relatedBook._id} book={relatedBook} />
            ))}
          </div>
        </div>
      )}

      <PurchaseModal
        book={book}
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
      />
    </div>
  );
};

export default BookDetails;