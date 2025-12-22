import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import useAuth from '../../hooks/useAuth';
import axios from 'axios';

const PurchaseModal = ({ closeModal, isOpen, book }) => {
  const { user } = useAuth()
  const { _id, name, price, category, author } = book || {}


  const handlePayment = async () => {
    const paymentInfo = {
      bookId: _id,
      name,
      category,
      price,
      author,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`, paymentInfo)
    window.location.href = data.url
    console.log(data.url)

  }

  return (
    <Dialog
      open={isOpen}
      as='div'
      className='relative z-10 focus:outline-none'
      onClose={closeModal}
    >
      {/* Overlay */}
      <div className='fixed inset-0 bg-black/40 backdrop-blur-sm' />

      <div className='fixed inset-0 z-10 flex items-center justify-center p-4'>
        <DialogPanel
          transition
          className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl duration-300 ease-out data-closed:scale-95 data-closed:opacity-0'
        >
          {/* Header */}
          <DialogTitle
            as='h3'
            className='text-2xl font-semibold text-gray-900 text-center'
          >Confirm Your Order
          </DialogTitle>
          <div className='pt-3'>
            <h2> You are about to pay  <span className='text-red-400'>${price}</span>   for the book: {name}</h2>
          </div>
           {/* Name */}
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

             {/* Email */}
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border rounded-md px-3 py-2 bg-gray-100"
              />
            </div>

               {/* Phone */}
            <div>
              <label className="text-sm font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                required
                placeholder="Enter phone number"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

               {/* Addres*/}
            <div>
              <label className="text-sm font-medium">Address</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Enter Address"
                className="w-full border rounded-md px-3 py-2"
              />
            </div>



          <div className='mt-6 space-y-4'>
            {/* Actions */}
            <div className='flex gap-4 pt-4'>
              <button
                onClick={handlePayment}
                type='submit'
                className='flex-1 rounded-lg bg-primary py-2.5 text-sm font-semibold
                 text-white hover:bg-secondary hover:text-black transition'
              >
                Pay Now
              </button>

              <button
                type='button'
                onClick={closeModal}
                className='flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 transition'
              >
                Cancel
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  )
}

export default PurchaseModal
