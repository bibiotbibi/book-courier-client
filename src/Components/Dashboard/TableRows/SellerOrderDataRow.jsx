import { useState } from 'react'
import DeleteModal from '../../Modal/DeleteModal'
import useAxiosSecure from '../../../hooks/useAxiosSecure'

const SellerOrderDataRow = ({ order, refetchOrders }) => {
  const [isOpen, setIsOpen] = useState(false)
  const axiosSecure = useAxiosSecure()

  const { _id, name, price, quantity, status, customer } = order || {}

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/orders/${_id}`)
      setIsOpen(false)
      if (refetchOrders) refetchOrders()
    } catch (err) {
      console.error('Failed to cancel order:', err)
    }
  }

  // Color badges for status
  const statusColor = status === 'Pending' ? 'bg-yellow-200 text-yellow-800' 
                     : status === 'Completed' ? 'bg-green-200 text-green-800' 
                     : 'bg-gray-200 text-gray-800'

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="px-4 py-2 font-medium">{name}</td>
      <td className="px-4 py-2">{customer}</td>
      <td className="px-4 py-2">${price.toFixed(2)}</td>
      <td className="px-4 py-2">{quantity}</td>
      <td className="px-4 py-2">
        <span className={`px-2 py-1 rounded-full text-sm font-semibold ${statusColor}`}>
          {status}
        </span>
      </td>
      <td className="px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsOpen(true)}
            className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded shadow"
          >
            Cancel
          </button>
        </div>
        <DeleteModal
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
          onConfirm={handleDelete}
        />
      </td>
    </tr>
  )
}

export default SellerOrderDataRow
