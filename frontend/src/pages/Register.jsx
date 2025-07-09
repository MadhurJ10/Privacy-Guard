import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Optional icons

const baseUrl = import.meta.env.VITE_BASE_URL;

const Register = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);

    const submitted = async (data) => {
        try {
            const response = await axios.post(`${baseUrl}h/register`, {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone,
                email: data.email,
                password: data.password
            });
            localStorage.setItem("jwt", response.data.user.token);
            reset();
            window.location.href = '/'
            // navigate("/"); 
        } catch (error) {
            console.error("Registration Error:", error.response?.data || error.message);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <form
                onSubmit={handleSubmit(submitted)}
                className="bg-white w-full max-w-md p-8 rounded-xl shadow-md border border-gray-300"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>

                {/* Input Fields */}
                {[
                    { id: 'firstName', placeholder: 'First Name', type: 'text', validation: { required: "First name is required" } },
                    { id: 'lastName', placeholder: 'Last Name', type: 'text', validation: { required: "Last name is required" } },
                    {
                        id: 'phone', placeholder: 'Phone Number', type: 'tel', validation: {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Phone must be 10 digits",
                            }
                        }
                    },
                    {
                        id: 'email', placeholder: 'Email', type: 'email', validation: {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address"
                            }
                        }
                    },
                ].map(({ id, placeholder, type, validation }) => (
                    <div key={id} className="mb-4">
                        <input
                            id={id}
                            placeholder={placeholder}
                            type={type}
                            {...register(id, validation)}
                            className="w-full p-3 rounded-md bg-[#E9EDF1] focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        {errors[ id ] && (
                            <p className="text-red-500 text-sm mt-1">{errors[ id ]?.message}</p>
                        )}
                    </div>
                ))}

                {/* Password Field with Toggle */}
                <div className="mb-4 relative">
                    <input
                        id="password"
                        placeholder="Password"
                        type={showPassword ? 'text' : 'password'}
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Minimum 6 characters"
                            }
                        })}
                        className="w-full p-3 rounded-md bg-[#E9EDF1] focus:outline-none focus:ring-2 focus:ring-blue-300 pr-10"
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                        onClick={() => setShowPassword(prev => !prev)}
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
                    className="w-full bg-[#ADCBEA] hover:bg-[#89B4E0] text-black font-semibold py-2 rounded-lg transition duration-300"
                >
                    Register
                </button>

                {/* Already registered? Login */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Login here
                    </button>
                </p>

            </form>
        </div>
    );
};

export default Register;
