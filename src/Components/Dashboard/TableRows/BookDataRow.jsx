import { useState } from 'react'
import UpdateBookModal from '../../Modal/UpdateBookModal'

const BookDataRow = ({ book }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const { _id, name, image } = book

  return (
    <tr>
      {/* Image */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <img
          src={image}
          alt={name}
          className='h-12 w-12 object-cover rounded'
        />
      </td>

      {/* Name */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <p className='text-gray-900'>{name}</p>
      </td>

      {/* Edit */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className='px-3 py-1 bg-blue-100 text-blue-700 rounded'
        >
          Edit
        </button>

        {/* Modal should be outside button */}
        <UpdateBookModal
          isOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          book={book}
        />
      </td>

      {/* Status */}
      <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
        <select className='w-full text-gray-700'>
          <option value='published'>Published</option>
          <option value='unpublished'>Unpublished</option>
        </select>
      </td>
    </tr>
  )
}

export default BookDataRow
