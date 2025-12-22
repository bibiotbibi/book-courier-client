import React, { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { updateProfile } from 'firebase/auth'
import axios from 'axios'
import { saveOrUpdateUser } from '../../../../utils'
import useRole from '../../../hooks/useRole'

const Profile = () => {
  const { user } = useAuth()
  const [role, isRoleLoading] = useRole()
  console.log(role, isRoleLoading)

  const [name, setName] = useState(user?.displayName || '')
  const [photo, setPhoto] = useState(null)
  const [preview, setPreview] = useState(user?.photoURL || '')
  const [loading, setLoading] = useState(false)

  const handleUpdateProfile = async () => {
    if (!name && !photo) return

    try {
      setLoading(true)

      let imageUrl = user?.photoURL

      // 1️⃣ Upload image if selected
      if (photo) {
        const formData = new FormData()
        formData.append('image', photo)

        const imgURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`
        const res = await axios.post(imgURL, formData)
        imageUrl = res.data.data.url
      }

      // 2️⃣ Update Firebase profile
      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      })

      // 3️⃣ Update user in backend DB
      await saveOrUpdateUser({
        name,
        email: user.email,
        image: imageUrl,
      })

      alert('Profile updated successfully ✅')
    } catch (error) {
      console.error(error)
      alert('Failed to update profile ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-4/5">

        <img
          alt="cover"
          src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png"
          className="w-full rounded-t-lg h-36 object-cover"
        />

        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <img
            src={preview}
            alt=""
            className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
          />

          <p className="p-2 px-4 text-xs text-white bg-primary rounded-full mt-2">
            {role}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            User ID: {user?.uid}
          </p>

          {/* UPDATE FORM */}
          <div className="w-full p-4 mt-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <div>
                <label className="text-sm text-gray-600">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Profile Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    setPhoto(e.target.files[0])
                    setPreview(URL.createObjectURL(e.target.files[0]))
                  }}
                  className="input input-bordered w-full"
                />
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="bg-primary px-10 py-2 rounded-lg text-white hover:bg-lime-800"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 font-medium">
              Email: <span className="font-bold">{user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
