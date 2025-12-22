import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from './SocialLogin/SocialLogin';
import { saveOrUpdateUser } from '../../../utils';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      //  Login user
      const result = await signInUser(data.email, data.password);
      const user = result.user;

      console.log('Logged in user:', user);

      // 2️⃣ Save / update user in DB
      await saveOrUpdateUser({
        name: user.displayName || 'No Name',
        email: user.email,
        image: user.photoURL || '',
      });

      // 3️⃣ Navigate
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <h2 className="text-2xl font-bold text-center mt-4">Login</h2>

      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="card-body">
          <fieldset className="fieldset">

            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-400">Email is required.</p>}

            <label className="label">Password</label>
            <input
              type="password"
              {...register('password', { required: true })}
              className="input"
              placeholder="Password"
            />
            {errors.password && <p className="text-red-400">Password is required.</p>}

            <button className="btn btn-neutral mt-4">
              Login
            </button>
          </fieldset>

          <p className="mt-3">
            Don't have an Account?
            <Link to="/register" className="link-hover font-semibold ml-1">
              Register
            </Link>
          </p>
        </div>
      </form>

      <SocialLogin />
    </div>
  );
};

export default Login;
