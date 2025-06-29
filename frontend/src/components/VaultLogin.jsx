import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import ApiClient from "../services/ApiClient";

const VaultLogin = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { setIsVaultLogged } = useContext(UserContext);
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (data) => {
        setServerError("");
        setLoading(true);
        try {
            const response = await ApiClient.post("vault/check-vault", {
                vaultPassword: data.vaultPassword,
            });

            if (response.data.msg === "wrong password") {
                setIsVaultLogged(false);
                setServerError("Wrong password. Please try again.");
            } else {
                setIsVaultLogged(true);
                reset();
            }
        } catch (err) {
            setServerError("Server error. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-center mb-4">Vault Login</h2>
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
                        className="w-full p-2 border rounded-md"
                    />
                    {errors.vaultPassword && (
                        <span className="text-red-500 text-sm">{errors.vaultPassword.message}</span>
                    )}
                </div>
                {serverError && (
                    <div className="text-red-500 mb-3 text-sm">{serverError}</div>
                )}
                <button
                    type="submit"
                    className="w-full p-2 bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black rounded-md  disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default VaultLogin;
