import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GrLinkNext } from "react-icons/gr";
import React from 'react';
import { Link, useNavigate } from 'react-router';
import BookCard from '../BookCard/BookCard';

const Books = () => {
    const navigate = useNavigate();

    const { data: books = [], isLoading } = useQuery({
        queryKey: ['/books'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/books`);
            return result.data;
        },
    });

    if (isLoading) return <p>Loading....</p>;

    // Take only first 6 books
    const firstSixBooks = books.slice(0, 8);

    return (
        <div className="w-10/12 mx-auto pt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {firstSixBooks.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>

            {/* View All Button */}
            {books.length > 8 && (
                <Link to="/all-books"  className=" flex justify-center mt-8">
                    <button
                        onClick={() => navigate('/all-books')}
                        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/70 transition"
                    >
                       <GrLinkNext />
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Books;
