import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router'
import { FaCheckCircle } from 'react-icons/fa'
import { FaBookOpen } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [loading, setLoading] = useState(true)
  const [transactionId, setTransactionId] = useState(null)

  useEffect(() => {
    if (sessionId) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/payment-success`, {
          sessionId,
        })
        .then(res => {
          setTransactionId(res.data.transactionId)
          setLoading(false)
        })
        .catch(err => {
          console.error(err)
          setLoading(false)
        })
    }
  }, [sessionId])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">

        {loading ? (
          <div className="flex flex-col items-center gap-4">
           <FaBookOpen className="animate-spin text-5xl text-primary" />

            <p className="text-gray-600 font-medium">
              Verifying your payment...
            </p>
          </div>
        ) : (
          <>
            <FaCheckCircle className="text-6xl text-primary mx-auto mb-4" />

            <h1 className="text-2xl font-bold text-gray-800">
              Payment Successful 🎉
            </h1>

            <p className="text-gray-600 mt-2">
              Thank you for your purchase. Your order has been placed
              successfully.
            </p>

            {transactionId && (
              <div className="mt-4 bg-gray-50 border rounded-lg p-3 text-sm">
                <p className="text-gray-500">Transaction ID</p>
                <p className="font-mono text-gray-800 break-all">
                  {transactionId}
                </p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to="/dashboard/my-orders"
                className="w-full bg-primary hover:bg-primary text-white py-2 rounded-lg font-semibold transition"
              >
                View My Orders
              </Link>

              <Link
                to="/"
                className="w-full border border-primary text-primary hover:bg-emerald-50 py-2 rounded-lg font-semibold transition"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PaymentSuccess
