import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserProvider";
import ApiClient from "../services/ApiClient";

const VaultReg = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { setIsVault } = useContext(UserContext);
    const [serverMsg, setServerMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (data) => {
        setServerMsg("");
        setLoading(true);
        try {
            const response = await ApiClient.post("vault/create-vault", {
                vaultPassword: data.vaultPassword,
            });

            if (response.data.msg === "created vault password") {
                setIsVault(true);
                setServerMsg("Vault password created successfully!");
                reset();
            } else {
                setIsVault(false);
                setServerMsg("Failed to create vault password.");
            }
        } catch (err) {
            setServerMsg("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold text-center mb-4">Vault Registration</h2>
            <form onSubmit={handleSubmit(submit)}>
                <div className="mb-4">
                    {/* <label htmlFor="vaultPassword" className="block mb-1 font-medium">
                        Password
                    </label> */}
                    <input
                        id="vaultPassword"
                        type="password"
                        placeholder="Password"
                        aria-label="Vault Password"
                        {...register("vaultPassword", { required: "Password is required" })}
                        className="w-full p-2 border rounded-md focus:ring focus:ring-blue-200"
                    />
                    {errors.vaultPassword && (
                        <span className="text-red-500 text-sm">{errors.vaultPassword.message}</span>
                    )}
                </div>
                {serverMsg && (
                    <div
                        className={`text-sm mb-3 ${
                            serverMsg.includes("success") ? "text-green-500" : "text-red-500"
                        }`}
                    >
                        {serverMsg}
                    </div>
                )}
                <button
                    type="submit"
                    className="w-full p-2 bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default VaultReg;
