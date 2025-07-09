import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submitted = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}h/login`, {
        email: data.email,
        password: data.password
      });

      localStorage.setItem("jwt", response.data.token);
      reset();
    //   navigate('/');
    window.location.href = '/'
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className='h-screen flex items-center justify-center px-[1rem] bg-gray-100'>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300"
        onSubmit={handleSubmit(submitted)}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Email */}
        <div className="mb-4">
          <input
            placeholder='Email'
            id="email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 rounded mt-1 bg-[#E9EDF1] focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            placeholder='Password'
            id="password"
            type={showPassword ? 'text' : 'password'}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full p-2 rounded mt-1 bg-[#E9EDF1] pr-10 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="button"
            onClick={() => setShowPassword(prev => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#ADCBEA] text-black font-bold py-2 px-4 rounded hover:bg-[#89B4E0] transition duration-300"
        >
          Submit
        </button>

        {/* Redirect to Register */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="text-blue-600 hover:underline font-medium"
          >
            Register here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
