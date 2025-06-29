import React from 'react';
import { useForm } from 'react-hook-form';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitted = (data) => {
        console.log(data);
    };

    return (
        <div className="h-screen flex items-center justify-center px-[1rem]">
            <form
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300 "
                onSubmit={handleSubmit(submitted)}
            >
                <h2 className="text-2xl font-bold mb-4">Register</h2>

                {/* First Name */}
                <div className="mb-4">
                    {/* <label htmlFor="firstName" className="block font-medium">First Name:</label> */}
                    <input
                    placeholder='First Name'
                        id="firstName"
                        type="text"
                        {...register("firstName", { required: "First name is required" })}
                        className=" w-full p-2 rounded mt-1 bg-[#E9EDF1]"
                    />
                    {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                </div>

                {/* Last Name */}
                <div className="mb-4">
                    {/* <label htmlFor="lastName" className="block font-medium">Last Name:</label> */}
                    <input
                    placeholder='Last Name'
                        id="lastName"
                        type="text"
                        {...register("lastName", { required: "Last name is required" })}
                        className=" w-full p-2 rounded mt-1 bg-[#E9EDF1]"
                    />
                    {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    {/* <label htmlFor="phone" className="block font-medium">Phone Number:</label> */}
                    <input
                    placeholder='Phone Number'
                        id="phone"
                        type="tel"
                        {...register("phone", {
                            required: "Phone number is required",
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Invalid phone number (must be 10 digits)"
                            },
                        })}
                        className=" w-full p-2 rounded mt-1 bg-[#E9EDF1]"
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>

                {/* Email */}
                <div className="mb-4">
                    {/* <label htmlFor="email" className="block font-medium">Email:</label> */}
                    <input
                    placeholder='Email'
                        id="email"
                        type="email"
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                message: "Invalid email address",
                            },
                        })}
                        className=" w-full p-2 rounded mt-1 bg-[#E9EDF1]"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Password */}
                <div className="mb-4">
                    {/* <label htmlFor="password" className="block font-medium">Password:</label> */}
                    <input
                    placeholder='Password'
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
                        })}
                        className=" w-full p-2 rounded mt-1 bg-[#E9EDF1]"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#ADCBEA] text-black font-bold py-2 px-4 rounded hover:bg-[#89B4E0]"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Register;
