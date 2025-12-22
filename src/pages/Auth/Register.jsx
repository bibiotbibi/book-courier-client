import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';
import { saveOrUpdateUser } from '../../../utils';

const Register = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth();

  const handleRegistration = async (data) => {
    console.log('Form Data:', data);
    const profileImg = data.photo[0];

    try {
      // 1️⃣ Register user in Firebase
      const result = await registerUser(data.email, data.password);
      console.log('Registered User:', result.user);

      // 2️⃣ Upload image to imgbb
      const formData = new FormData();
      formData.append('image', profileImg);
      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imageRes = await axios.post(image_API_URL, formData);
      const imageUrl = imageRes.data.data.url;
      console.log('Image uploaded:', imageUrl);

      // 3️⃣ Update Firebase profile
      await updateUserProfile({ displayName: data.name, photoURL: imageUrl });
      console.log('User profile updated');

      // 4️⃣ Save or update user in backend
      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        image: imageUrl
      });
      console.log('User saved to backend');

      alert('Registration successful!');

    } catch (err) {
      console.error('Registration Error:', err);
      alert('Failed to register. Please try again.');
    }
  };

  return (
    <div className='flex justify-center my-8'>
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className='text-3xl font-bold text-center mb-4'>Register</h2>
          <form onSubmit={handleSubmit(handleRegistration)}>
            {/* Name */}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="input input-bordered w-full"
              placeholder="Name"
            />
            {errors.name && <p className='text-red-400'>{errors.name.message}</p>}

            {/* Photo */}
            <label className="label">Photo</label>
            <input
              type="file"
              {...register('photo', { required: 'Photo is required' })}
              className="input w-full"
              accept="image/*"
            />
            {errors.photo && <p className='text-red-400'>{errors.photo.message}</p>}

            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email && <p className='text-red-400'>{errors.email.message}</p>}

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
                  message: 'Password must contain uppercase, lowercase, number, and special character'
                }
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password && <p className='text-red-400'>{errors.password.message}</p>}

            <button className="btn btn-neutral w-full mt-4">Register</button>
          </form>

          <p className='mt-4 text-center'>
            Already have an account? <Link to='/login' className='link font-semibold'>Login</Link>
          </p>

          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
