import { useQuery } from '@tanstack/react-query'
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import BookDataRow from '../../../Components/Dashboard/TableRows/BookDataRow'

const MyInventory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: books = [], isLoading } = useQuery({
    queryKey: ['mybook', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/my-books/${user.email}`
      )
      return data
    },
  })

  if (isLoading) return <p>Loading....</p>

  return (
    <div className='container mx-auto px-4 sm:px-8'>
      <div className='py-8'>
        <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
          <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
            <table className='min-w-full leading-normal'>
  <thead>
    <tr>
      <th
        className='px-5 py-3 bg-white border-b border-gray-200 text-left text-sm font-semibold'
      >
        Image
      </th>

      <th
        className='px-5 py-3 bg-white border-b border-gray-200 text-left text-sm font-semibold'
      >
        Name
      </th>

      <th
        className='px-5 py-3 bg-white border-b border-gray-200 text-left text-sm font-semibold'
      >
        Edit
      </th>
      <th
        className='px-5 py-3 bg-white border-b border-gray-200 text-left text-sm font-semibold'
      >
        Status
      </th>
    </tr>
  </thead>

  <tbody>
    {books.map(book => (
      <BookDataRow key={book._id} book={book} />
    ))}
  </tbody>
</table>

          </div>
        </div>
      </div>
    </div>
  )
}

export default MyInventory
