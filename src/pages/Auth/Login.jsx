import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import { saveOrUpdateUser } from '../../../utils';
import { motion } from 'framer-motion';

/* Demo Account */
const DEMO_USER = {
  email: "demo@bookapp.com",
  password: "Demo@1234",
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue
  } = useForm({ mode: "onChange" });

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      if (!result?.user) throw new Error("Login failed");

      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName || 'No Name',
        email: user.email,
        image: user.photoURL || '',
      });

      navigate('/');
    } catch (error) {
      console.error(error);

      if (error.code === "auth/user-not-found") {
        alert("No account found with this email.");
      }
      else if (error.code === "auth/wrong-password") {
        alert("Incorrect password.");
      }
      else if (error.code === "auth/too-many-requests") {
        alert("Too many failed attempts. Try again later.");
      }
      else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleDemoLogin = async () => {
    try {
      setValue("email", DEMO_USER.email);
      setValue("password", DEMO_USER.password);

      const result = await signInUser(DEMO_USER.email, DEMO_USER.password);
      if (!result?.user) throw new Error("Demo login failed");

      const user = result.user;

      await saveOrUpdateUser({
        name: user.displayName || "Demo User",
        email: user.email,
        image: user.photoURL || '',
      });

      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Demo login failed");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/Tp78Vqg/miniature.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="absolute top-10 left-10 w-72 h-72 bg-white/5 blur-3xl rounded-full"
      />
      <motion.div
        animate={{ x: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 12 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-primary/10 blur-3xl rounded-full"
      />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl z-10"
      >
        <div className="p-10">
          <h2 className="text-4xl font-extrabold text-white text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Login to your account
          </p>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <div>
              <label className="text-gray-300 text-xs uppercase font-semibold">
                Email
              </label>
              <input
                type="email"
                {...register('email', {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address"
                  }
                })}
                placeholder="example@mail.com"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
              {errors.email && <p className="text-red-400 text-xs">{errors.email.message}</p>}
            </div>

            <div>
              <label className="text-gray-300 text-xs uppercase font-semibold">
                Password
              </label>
              <input
                type="password"
                {...register('password', { required: "Password is required" })}
                placeholder="••••••••"
                className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
              {errors.password && <p className="text-red-400 text-xs">{errors.password.message}</p>}
            </div>

            <motion.button
              disabled={isSubmitting}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transition ${
                isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-secondary"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleDemoLogin}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl bg-white/20 border border-secondary text-primary font-bold hover:bg-primary hover:text-white transition"
            >
              Try Demo Account
            </motion.button>
          </form>

          <p className="text-center text-gray-300 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-secondary font-bold">
              Register
            </Link>
          </p>
        </div>

        <div className="relative my-6">
          <div className="absolute inset-0 border-t border-white/20"></div>
          <p className="relative text-center text-white text-xs uppercase bg-black/20 px-4 inline-block mx-auto">
            Or continue with
          </p>
        </div>

        <div className="px-10 pb-10">
          <SocialLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
