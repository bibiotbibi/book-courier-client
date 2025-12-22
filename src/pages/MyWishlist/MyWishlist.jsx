import { useQuery } from '@tanstack/react-query'
import useAuth from '../../hooks/useAuth'
import useAxiosSecure from '../../hooks/useAxiosSecure'

const MyWishlist = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.email],
    queryFn: async () => {
      if (!user?.email) return []

      const res = await axiosSecure.get(`/wishlist/${user.email}`)
      return res.data
    },
    enabled: !!user?.email,
  })

  if (isLoading) return <p className="text-center mt-20">Loading...</p>
  if (books.length === 0) return <p className="text-center mt-20">No books in your wishlist.</p>

  return (
    <div className="max-w-5xl mx-auto mt-12 px-4">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id} className="text-center hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                <img src={book.image} alt={book.name} className="w-20 h-24 object-cover mx-auto rounded" />
              </td>
              <td className="border border-gray-300 px-4 py-2">{book.name}</td>
              <td className="border border-gray-300 px-4 py-2">${book.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default MyWishlist
