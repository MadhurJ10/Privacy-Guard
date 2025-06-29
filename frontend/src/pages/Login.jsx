import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider'


const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {

    //
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const submitted = async (data) => {
        console.log(data);
        const response = await axios.post(`${baseUrl}h/login`, {
            email: data.email,
            password: data.password
        });
        console.log(response)
        localStorage.setItem("jwt", response.data.token)
        reset()
    }
    return (
        <div className='h-screen flex items-center justify-center px-[1rem]'>
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300 "
                onSubmit={handleSubmit(submitted)}>
                <h2 className="text-2xl font-bold mb-4">Login</h2>

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
                        className="w-full p-2 rounded mt-1 bg-[#E9EDF1]"
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
    )
}

export default Login
