import React, { useState } from 'react'
import ApiClient from '../services/ApiClient'
import { useForm } from 'react-hook-form'


const PasswordCheck = () => {

  const {register , handleSubmit , reset , formState: { errors } } = useForm();
   const [check, setCheck] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  

    const submit = async (data) => {
        const response = await ApiClient.post('/checkk/password-check' , {
            password: data.password
        })
        setResponseMessage(response.data.message || 'Password checked successfully.');
        setCheck(true);
        console.log(response.data)

    }
  return (
    
        <div className='h-screen flex flex-col items-center justify-center px-[1rem]'>
          <h1 className='text-3xl mb-3.5'>Password Breach Checker</h1>
            <form className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300 mb-[10rem] "
                onSubmit={handleSubmit(submit)}>
          {/* <label htmlFor="password" className=" font-medium">Password:</label> */}
                {/* Password */}
                <div className="mb-4">
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
                {check && <h1 className="">{responseMessage}</h1>}
                <button
                    type="submit"
                    className="w-full bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black font-bold py-2 px-4 rounded "
                >
                    Submit
                </button>
            </form>
        </div>
    // <div>
    //     <h1>PasswordCheck route</h1>  
    //     <button onClick={submit}>click</button>
    //     {check && <h1 className="bg-amber-500">{responseMessage}</h1>}
    // </div>
  )
}

export default PasswordCheck
