import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import { FaReceipt } from 'react-icons/fa'

const Invoices = () => {
  const axiosSecure = useAxiosSecure()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await axiosSecure.get('/my-orders')
        setPayments(res.data)
      } catch (err) {
        console.error(err)
        setError('Failed to fetch payments')
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6">
        <div className="flex items-center gap-3 mb-6">
          <FaReceipt className="text-3xl text-primary" />
          <h1 className="text-2xl font-bold text-gray-800">My Payments</h1>
        </div>

        {loading ? (
          <p className="text-gray-600">Loading payments...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : payments.length === 0 ? (
          <p className="text-gray-600">No payments found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="px-4 py-2 font-medium">Payment ID</th>
                  <th className="px-4 py-2 font-medium">Amount</th>
                  <th className="px-4 py-2 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-2 font-mono break-all">{payment.transactionId}</td>
                    <td className="px-4 py-2">${payment.price.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      {new Date(payment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Invoices
