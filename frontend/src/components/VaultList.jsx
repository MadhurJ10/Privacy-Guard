import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../services/ApiClient";
import { setVaultData, addVaultEntry } from "../features/vaultSlice";

const VaultList = () => {
    const [ loading, setLoading ] = useState(true); // Loading state
    const [ error, setError ] = useState(null); // Error state
    const [ editingIndex, setEditingIndex ] = useState(null);
    const [ newPassword, setNewPassword ] = useState("");
    const vaultEntries = useSelector((state) => state.vault.entries || []); // Ensure vaultEntries is an array
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ApiClient.get("/vault/get-vaultData");
                const newEntry = Array.isArray(response.data.vaultInfo[ 0 ]?.entries)
                    ? response.data.vaultInfo[ 0 ].entries
                    : []; // Ensure newEntry is an array
                dispatch(setVaultData(newEntry));
                setError(null); // Clear any previous error
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load entries. Please try again.");
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchData();
    }, [ dispatch ]);

    const handleDelete = async (index) => {
        try {
            // console.log( vaultEntries[index]._id)
            // Make API call to delete the entry
            const response = await ApiClient.delete(`/vault/vault-delete/`, {
                data: { data_id: vaultEntries[index]._id }
            });
            // console.log(response)
            const updatedEntries = vaultEntries.filter((_, i) => i !== index);
            dispatch(setVaultData(updatedEntries));
        } catch (err) {
            console.error("Error deleting entry:", err);
            setError("Failed to delete entry. Please try again.");
        }
    };

    const handleUpdateClick = (index) => {
        setEditingIndex(index);
        setNewPassword(vaultEntries[index].encryptedPassword);
    };

    const handleUpdateSave = async (index) => {
        try {
            const updatedEntry = { ...vaultEntries[index], encryptedPassword: newPassword };
            await ApiClient.patch(`/vault/vault-update/`, {
                data_id: vaultEntries[index]._id,
                encryptedPassword: newPassword
            });
            const updatedEntries = [...vaultEntries];
            updatedEntries[index] = updatedEntry;
            dispatch(setVaultData(updatedEntries));
            setEditingIndex(null);
            setNewPassword("");
        } catch (err) {
            console.error("Error updating entry:", err);
            setError("Failed to update entry. Please try again.");
        }
    };

    const handleUpdateCancel = () => {
        setEditingIndex(null);
        setNewPassword("");
    };

    if (loading) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold text-center mb-4">Saved Entries</h1>
                <p className="text-center text-gray-500">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-2xl font-bold text-center mb-4">Saved Entries</h1>
                <p className="text-center text-red-500">{error}</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-4">Saved Entries</h1>
            {vaultEntries.length === 0 ? (
                <p className="text-center text-gray-500">No entries available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vaultEntries.map((entry, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-start"
                        >
                            <h2 className="text-lg font-bold">{entry.appName}</h2>
                            {editingIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        className="mb-2 border rounded px-2 py-1 w-full"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateSave(index)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleUpdateCancel}
                                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <p className="text-gray-600 mb-4">{entry.encryptedPassword}</p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleUpdateClick(index)}
                                            className="bg-[#ADCBEA] hover:bg-[#89B4E0]  transition duration-300 text-black px-4 py-2 rounded-lg "
                                        >
                                            Update
                                        </button>
                                        <button
                                            onClick={() => handleDelete(index)}
                                            className="bg-[#E9EDF1] hover:bg-[#D1D8DE] text-black px-4 py-2 rounded-lg   transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VaultList;
