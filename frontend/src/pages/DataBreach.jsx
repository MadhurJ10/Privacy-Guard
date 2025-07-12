import React, { useState } from 'react';
import ApiClient from '../services/ApiClient';
import { useForm } from 'react-hook-form';

const DataBreach = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [ breaches, setBreaches ] = useState([]); // State to hold breach details
    const [ message, setMessage ] = useState(''); // State to hold status message

    const submit = async (data) => {
        try {
            const response = await ApiClient.post('/check/breach-check', {
                email: data.email,
            });
            // console.log(response.data);
            if (response.data.msg === 'no breach found all acount is clear') {
                setMessage(response.data.msg);
                setBreaches([]);
            } else {
                setMessage('');
                setBreaches(response.data.data.ExposedBreaches.breaches_details || []); // Update state with breach details
            }
        } catch (error) {
            console.error("Error fetching breach data:", error);
        }
    };

    return (
        <div className='flex flex-col items-center font-sans bg-[#F7FAFC] min-h-screen'>
            <h1 className='text-4xl font-extrabold mb-4 mt-[2.5rem] tracking-tight'>Email Breach Monitor</h1>
            <div className='flex justify-center px-[1rem] w-full'>
                <form
                    className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200"
                    onSubmit={handleSubmit(submit)}
                >
                    <div className="mb-6">
                        <input
                            placeholder='Enter your email address'
                            id="email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                    message: "Invalid email address",
                                },
                            })}
                            className="border w-full p-3 rounded-lg mt-1 bg-[#E9EDF1] text-lg focus:outline-none focus:ring-2 focus:ring-[#ADCBEA] transition"
                            style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-2 font-medium">{errors.email.message}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black font-bold py-2.5 px-4 rounded-lg text-lg "
                        style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}
                    >
                        Submit
                    </button>
                </form>
            </div>
            {/* Render breach details or message */}
            <div className="mt-8 w-full max-w-3xl px-3">
                {message && (
                    <div className="p-5 bg-green-100 text-green-800 rounded-xl shadow-lg text-center">
                        <h1 className="text-2xl font-bold tracking-wide">{message}</h1>
                    </div>
                )}
                {breaches.length > 0 && (
                    <div className="p-6 bg-white shadow-xl rounded-2xl">
                        <h1 className="text-3xl font-extrabold mb-6 tracking-tight">Breach Details</h1>
                        {breaches.map((breach, index) => (
                            <div key={index} className="border-b border-gray-200 py-6 last:border-b-0">
                                <div className="flex items-center mb-3">
                                    <img src={breach.logo} alt={`${breach.breach} logo`} className="w-12 h-12 rounded-full mr-4 border border-gray-300 shadow" />
                                    <h2 className="text-2xl font-semibold">{breach.breach}</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-lg" style={{ fontFamily: 'Inter, Segoe UI, Arial, sans-serif' }}>
                                    <p className="text-gray-700"><strong>Domain:</strong> {breach.domain}</p>
                                    <p className="text-gray-700"><strong>Industry:</strong> {breach.industry}</p>
                                    <p className="text-gray-700"><strong>Records Exposed:</strong> {breach.xposed_records}</p>
                                    <p className="text-gray-700"><strong>Date of Breach:</strong> {breach.xposed_date}</p>
                                    <p className="text-gray-700 col-span-2"><strong>Details:</strong> {breach.details}</p>
                                    <p className="text-gray-700"><strong>Exposed Data:</strong> {breach.xposed_data}</p>
                                    <p className="text-gray-700"><strong>Password Risk:</strong> {breach.password_risk}</p>
                                    <p className="text-gray-700"><strong>Verified:</strong> {breach.verified}</p>
                                    <p className="text-gray-700 col-span-2">
                                        <strong>References:</strong>{' '}
                                        <a href={breach.references} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline break-all">
                                            {breach.references}
                                        </a>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DataBreach;
