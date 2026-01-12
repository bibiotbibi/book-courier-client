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
  <div className="flex justify-center items-center min-h-screen bg-secondary/20">
  <div className="bg-white shadow-2xl rounded-3xl md:w-4/5 lg:w-3/5 overflow-hidden animate-fade-in">

    {/* Cover */}
    <div className="relative">
      <img
        alt="cover"
        src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png"
        className="w-full h-44 object-cover"
      />
      <div className="absolute inset-0 bg-primary/60"></div>
    </div>

    {/* Profile */}
    <div className="flex flex-col items-center p-6 -mt-20 relative z-10">

      {/* Avatar */}
      <div className="relative group">
        <img
          src={preview}
          alt=""
          className="mx-auto object-cover rounded-full h-28 w-28 border-4 border-secondary shadow-xl
          transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 rounded-full ring-4 ring-primary/40 animate-pulse"></div>
      </div>

      {/* Role */}
      <p className="mt-4 px-6 py-1 text-xs text-secondary bg-primary rounded-full shadow-lg tracking-wide">
        {role}
      </p>

      <p className="mt-2 text-xs text-gray-500">
        User ID: {user?.uid}
      </p>

      {/* Form */}
      <div className="w-full mt-8 bg-secondary/10 rounded-2xl shadow-lg p-6 space-y-6">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="text-xs font-semibold text-primary">Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input input-bordered w-full border-secondary focus:ring-2 focus:ring-primary transition"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-primary">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={e => {
                setPhoto(e.target.files[0])
                setPreview(URL.createObjectURL(e.target.files[0]))
              }}
              className="input input-bordered w-full border-secondary
             file:text-primary file:border-none
              file:rounded-lg file:px-4 file:py-1"
            />
          </div>

        </div>

        <div className="flex justify-end">
          <button
            onClick={handleUpdateProfile}
            disabled={loading}
            className="bg-primary px-12 py-3 rounded-xl text-secondary font-semibold shadow-xl
            hover:bg-primary/90 hover:scale-[1.05] transition-all duration-300"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </div>
      </div>

      {/* Email */}
      <div className="mt-6 bg-secondary px-6 py-3 rounded-xl shadow-md">
        <p className="text-primary text-sm">
          Email: <span className="font-bold">{user?.email}</span>
        </p>
      </div>

    </div>
  </div>
</div>


  )
}

export default Profile
