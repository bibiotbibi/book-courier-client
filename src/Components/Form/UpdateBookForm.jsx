const UpdateBookForm = () => {
  return (
    <div className='w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50 p-6'>
      <form className='w-full'>
        <div className='grid grid-cols-1 gap-6'>
          {/* Name */}
          <div className='space-y-1 text-sm'>
            <label htmlFor='name' className='block text-gray-700 font-medium'>
              Book Name
            </label>
            <input
              className='w-full px-4 py-3 text-gray-800 border border-secondary focus:outline-primary rounded-md bg-white'
              name='name'
              id='name'
              type='text'
              placeholder='Book Name'
              required
            />
          </div>

          {/* Category */}
          <div className='space-y-1 text-sm'>
            <label htmlFor='category' className='block text-gray-700 font-medium'>
              Category
            </label>
            <select
              required
              className='w-full px-4 py-3 border border-secondary focus:outline-primary rounded-md bg-white'
              name='category'
            >
                 <option value="">Select</option>
                <option value="Novel">Novel</option>
                <option value="Story">Story</option>
                <option value="Education">Education</option>
                <option value="Sci-Fi">Sci-Fi</option>
            </select>
            
          </div>

          {/* Description */}
          <div className='space-y-1 text-sm'>
            <label htmlFor='description' className='block text-gray-700 font-medium'>
              Description
            </label>
            <textarea
              id='description'
              placeholder='Write book description here...'
              className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-secondary bg-white focus:outline-primary'
              name='description'
            ></textarea>
          </div>

          {/* Price & Quantity */}
          <div className='flex justify-between gap-4'>
            {/* Price */}
            <div className='space-y-1 text-sm flex-1'>
              <label htmlFor='price' className='block text-gray-700 font-medium'>
                Price
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-secondary focus:outline-primary rounded-md bg-white'
                name='price'
                id='price'
                type='number'
                placeholder='Price per unit'
                required
              />
            </div>

            {/* Quantity */}
            <div className='space-y-1 text-sm flex-1'>
              <label htmlFor='quantity' className='block text-gray-700 font-medium'>
                Quantity
              </label>
              <input
                className='w-full px-4 py-3 text-gray-800 border border-secondary focus:outline-primary rounded-md bg-white'
                name='quantity'
                id='quantity'
                type='number'
                placeholder='Available quantity'
                required
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className='p-4 w-full rounded-lg'>
            <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
              <div className='flex flex-col w-max mx-auto text-center'>
                <label>
                  <input
                    className='text-sm cursor-pointer w-36 hidden'
                    type='file'
                    name='image'
                    id='image'
                    accept='image/*'
                  />
                  <div className='bg-primary text-white border border-gray-300 rounded font-semibold cursor-pointer p-2 px-4 hover:bg-black'>
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type='submit'
            className='w-full p-3 mt-4 text-center font-semibold text-white transition duration-200 rounded shadow-md bg-primary hover:bg-black'
          >
            Update Book
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBookForm
