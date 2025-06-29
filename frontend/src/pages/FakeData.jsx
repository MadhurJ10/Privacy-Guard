import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiClient from "../services/ApiClient";
import { setData, addData, deleteData } from "../features/fakeDataSlice"; // <-- import setData

const FakeData = () => {
    const dispatch = useDispatch();
    const fakeData = useSelector((state) => state.fakeData?.data || []); // Safeguard state

    const generateFakeData = async () => {
        try {
            const response = await ApiClient.post("/checkkk/Create-fakeData");
            if (response.data?.fakeData) {
                dispatch(addData(response.data.fakeData));
            } else {
                console.error("Unexpected response:", response.data);
            }
        } catch (error) {
            console.error("Error generating fake data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await ApiClient.delete("/checkkk/delete-fakeData", {
                data: { _id: id },
            });
            if (response.status === 200) {
                dispatch(deleteData(id));
            } else {
                console.error("Failed to delete:", response.status);
            }
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        const getFakeData = async () => {
            try {
                const response = await ApiClient.get("/checkkk/get-fakeData");
                if (response.data?.info) {
                    dispatch(setData(response.data.info)); // <-- Use setData here
                } else {
                    console.error("Unexpected response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching fake data:", error);
            }
        };
        getFakeData();
    }, [ dispatch ]);

    return (
        <div className="flex flex-col items-center p-6 min-h-screen bg-gray-100">
            {/* Generate Button */}
            <button
                onClick={generateFakeData}
                className="bg-[#ADCBEA] text-black font-semibold py-2 px-6 rounded-lg hover:bg-[#89B4E0] transition duration-300"
            >
                Generate Fake Data
            </button>

            {/* Data List */}
            {fakeData.length > 0 ? (
                <div className="mt-8 w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {fakeData.map((data) => (
                        <div
                            key={data._id}
                            className="p-4 rounded-lg shadow-md   transition-shadow flex flex-col justify-between bg-[#E9EDF1]"
                        >
                            {/* Card Content */}
                            <div>
                                <p className="text-sm text-gray-700">
                                    <strong>Name:</strong> {data.name}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Username:</strong> {data.userName}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Email:</strong> {data.email}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>Phone Number:</strong> {data.phoneNumber}
                                </p>
                                <p className="text-sm text-gray-700">
                                    <strong>IP Address:</strong> {data.ipAddress}
                                </p>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={() => handleDelete(data._id)}
                                className="mt-4 bg-[#E9EDF1]  text-black font-semibold py-1 px-3 rounded-2xl hover:bg-[#D1D8DE] transition duration-300"
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mt-6 text-gray-600">
                    No data available. Click the button to generate fake data.
                </p>
            )}
        </div>
    );
};

export default FakeData;
