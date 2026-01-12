import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import axios from 'axios';
import { saveOrUpdateUser } from '../../../utils';
import { motion } from 'framer-motion';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm({ mode: "onChange" });

  const { registerUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegistration = async (data) => {
    try {
      const profileImg = data.photo[0];

      const result = await registerUser(data.email, data.password);
      if (!result?.user) throw new Error("Firebase registration failed");

      const formData = new FormData();
      formData.append('image', profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;
      const imageRes = await axios.post(image_API_URL, formData);

      if (!imageRes?.data?.data?.url) {
        throw new Error("Image upload failed");
      }

      const imageUrl = imageRes.data.data.url;

      await updateUserProfile({
        displayName: data.name,
        photoURL: imageUrl
      });

      await saveOrUpdateUser({
        name: data.name,
        email: data.email,
        image: imageUrl
      });

      reset();
      navigate('/');

    } catch (err) {
      console.error('Registration Error:', err);

      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered.");
      } 
      else if (err.code === "auth/weak-password") {
        alert("Password is too weak.");
      }
      else if (err.response) {
        alert("Image upload failed. Try again.");
      }
      else {
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative bg-black overflow-hidden"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Tp78Vqg/miniature.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        animate={{ y: [0, -30, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-10 left-10 w-72 h-72 bg-white/5 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: [0, 30, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl"
      >
        <div className="p-10">
          <h2 className="text-4xl font-bold text-white text-center mb-2">
            Create Account
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Join us and start your journey
          </p>

          <form onSubmit={handleSubmit(handleRegistration)} className="space-y-5">

            <div>
              <label className="text-xs uppercase text-gray-300">Name</label>
              <input
                {...register('name', {
                  required: 'Name is required',
                  minLength: { value: 3, message: 'Name must be at least 3 characters' }
                })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase text-gray-300">Photo</label>
              <input
                type="file"
                {...register('photo', {
                  required: 'Photo is required',
                  validate: {
                    fileSize: files => files[0]?.size < 2000000 || 'Max 2MB allowed',
                    fileType: files =>
                      ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type) ||
                      'Only JPG, PNG or WEBP allowed'
                  }
                })}
                className="w-full px-3 py-2 rounded-xl bg-white/20 border border-gray-400 text-white file:bg-primary file:border-none file:px-4 file:py-2 file:text-white file:rounded-lg"
              />
              {errors.photo && <p className="text-red-400 text-xs mt-1">{errors.photo.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase text-gray-300">Email</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="example@mail.com"
              />
              {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-xs uppercase text-gray-300">Password</label>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Min 6 characters' },
                  validate: value =>
                    /(?=.*[A-Z])(?=.*[0-9])/.test(value) ||
                    'Must contain at least 1 uppercase & 1 number'
                })}
                className="w-full px-4 py-3 rounded-xl bg-white/20 border border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
                placeholder="••••••••"
              />
              {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
            </div>

            <motion.button
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 font-bold rounded-xl shadow-lg transition-all ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"
              } text-white`}
            >
              {isSubmitting ? "Creating Account..." : "Register"}
            </motion.button>
          </form>

          <p className="text-gray-300 text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-bold hover:text-secondary">
              Login
            </Link>
          </p>
        </div>

        <div className="border-t border-white/20 my-4"></div>

        <div className="px-10 pb-10">
          <SocialLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
