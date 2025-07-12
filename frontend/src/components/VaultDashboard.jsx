import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setVaultData, addVaultEntry } from "../features/vaultSlice";
import ApiClient from "../services/ApiClient";

const VaultDashboard = () => {
    const [showForm, setShowForm] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        try {
            // console.log("Form Data:", data);
            const response = await ApiClient.post('/vault/create-vaultData', {
                appName: data.appName,
                username: "madhur", // Replace with dynamic user data if available
                encryptedPassword: data.password,
                url: "dummy-url" // Replace with actual URL if needed
            });

            // console.log("API Response:", response.data.newEntry);

            // Append the new entry to Redux instead of replacing all
            dispatch(addVaultEntry(response.data.newEntry));

            reset(); // Reset form
            setShowForm(false); // Hide form after submission
        } catch (error) {
            console.error("Error saving entry:", error);
        }
    };

    return (
        <div className="mb-6"> {/* Removed p-6 bg-gray-100 min-h-screen, added margin-bottom */}
            <h1 className="text-2xl font-bold text-center mb-4">Password Vault</h1>

            {/* Toggle Form Button */}
            <div className="text-center mb-4">
                <button
                    onClick={() => setShowForm((prev) => !prev)}
                    className="bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black py-2 px-4 rounded-lg"
                >
                    {showForm ? "Close Form" : "Add New Entry"}
                </button>
            </div>

            {/* Form Section */}
            {showForm && (
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto"
                >
                    <div className="mb-4">
                        {/* <label className="block text-gray-700">App Name</label> */}
                        <input
                            type="text"
                            placeholder="Enter app name"
                            {...register("appName", { required: "App name is required" })}
                            className="w-full p-2 bg-[#E9EDF1] rounded-lg mt-2"
                        />
                        {errors.appName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.appName.message}
                            </p>
                        )}
                    </div>
                    <div className="mb-4">
                        {/* <label className="block text-gray-700">Password</label> */}
                        <input
                            type="password"
                            placeholder="Enter password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full p-2 bg-[#E9EDF1] rounded-lg mt-2"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black py-2 rounded-lg"
                    >
                        Save Entry
                    </button>
                </form>
            )}
        </div>
    );
};

export default VaultDashboard;
