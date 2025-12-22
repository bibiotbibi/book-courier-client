import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import BookCard from '../BookCard/BookCard';

const Books = () => {
    const { data: books = [], isLoading } = useQuery({
        queryKey: ['/books'],
        queryFn: async () => {
            const result = await axios(`${import.meta.env.VITE_API_URL}/books`)
            console.log(result.data);

           return result.data;
        },
    })

    if (isLoading) return <p>Loading....</p>



    return (
        <div>
            {books && books.length > 0 ? (
                <div className='pt-12 w-10/12  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {books.map(book => (
                        <BookCard key={book._id} book={book} />
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default Books;