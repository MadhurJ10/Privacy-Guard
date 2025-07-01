import React, { useState } from 'react';
import ApiClient from '../services/ApiClient';
import { useForm } from 'react-hook-form';

const PasswordCheck = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [response, setResponse] = useState(null); // Store the full response object
  const [isLoading, setIsLoading] = useState(false);

  const submit = async (data) => {
    setIsLoading(true);
    try {
      const result = await ApiClient.post('/checkk/password-check', {
        password: data.password,
      });
      setResponse(result.data); // Set the full response object
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        message: 'Failed to check password. Please try again.',
        found: false,
        occurrence: 0,
      });
    }
    setIsLoading(false);
    reset(); // Optionally reset the form after submission
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center px-[1rem]">
      <h1 className="text-3xl mb-3.5">Password Breach Checker</h1>
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-2 border-gray-300"
        onSubmit={handleSubmit(submit)}
      >
        <div className="mb-4">
          <input
            placeholder="Enter your password"
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
          className={`w-full ${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#ADCBEA] hover:bg-[#89B4E0]'
          } transition duration-300 text-black font-bold py-2 px-4 rounded`}
          disabled={isLoading}
        >
          {isLoading ? 'Checking...' : 'Submit'}
        </button>
      </form>

      {/* Display the response */}
      {response && (
        <div
          className={`mt-6 p-6 rounded shadow-lg w-full max-w-md ${
            response.found ? 'bg-red-100 border-red-500 text-red-700' : 'bg-green-100 border-green-500 text-green-700'
          }`}
        >
          <h2 className="text-lg font-bold mb-3">{response.message}</h2>
          {response.found && (
            <p>
              <strong>Occurrences:</strong> Found in <strong>{response.occurrences}</strong> breaches.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PasswordCheck;
