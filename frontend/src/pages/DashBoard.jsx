import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ApiClient from "../services/ApiClient";
import { setDashboardData } from "../features/dashboardSlice";

const DashBoard = () => {
  const [error, setError] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const dashboardData = useSelector((state) => state.dashboard?.data || []);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await ApiClient.get("get-dashboard");
      dispatch(setDashboardData(response.data.apps));
    } catch (err) {
      setError("Failed to load dashboard data.");
    }
  };

  const createDashboard = async (data) => {
    console.log(data)
    try {
      const response = await ApiClient.post("create-dashboard", data);
      reset();
      await fetchData(); // Refresh data after creation
    } catch (error) {
      setError("Failed to create dashboard.");
    }
  };

  const updateDashboardFields = async (id, fields) => {
    try {
      await ApiClient.patch("update-dashboard", {
        ...fields,
        data_id: id,
      });
      reset();
      await fetchData(); // Refresh data after update
    } catch (error) {
      setError("Failed to update dashboard.");
    }
  };

  const deleteDashboard = async (id) => {
    try {
      await ApiClient.delete("delete-dashboard", {
        data: { data_id: id },
      });
      await fetchData(); // Refresh data after deletion
    } catch (error) {
      setError("Failed to delete dashboard.");
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  return (
    <div className="min-h-screen py-10 px-4 ">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-black tracking-tight mb-8">
          Dashboard
        </h1>
        {error && <div className="mb-4 text-center text-red-600 font-semibold">{error}</div>}
        <form
          onSubmit={handleSubmit(createDashboard)}
          className="flex flex-col sm:flex-row gap-4 mb-8 items-center"
        >
          <input
            {...register("appName")}
            placeholder="App Name"
            className="border rounded-lg p-2 flex-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {["email", "password", "location", "phoneNumber"].map((field) => (
            <label key={field} className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register(field)}
                className="accent-blue-600"
              />
              <span className="text-gray-700 font-medium capitalize">{field}</span>
            </label>
          ))}
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-[#ADCBEA] hover:bg-[#89B4E0] text-black font-semibold  transition duration-300"
          >
            Create Dashboard
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dashboardData.length > 0 ? (
            dashboardData.map((app, index) => (
              <DashboardCard
                key={index}
                app={app}
                deleteDashboard={deleteDashboard}
                updateDashboardFields={updateDashboardFields}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 font-medium">
              No data available.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ app, deleteDashboard, updateDashboardFields }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: app.email,
      password: app.password,
      location: app.location,
      phoneNumber: app.phoneNumber,
    },
  });

  const onSubmit = (fields) => {

    updateDashboardFields(app._id, fields);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
    >
      <div className="bg-[#E9EDF1] px-5 py-3 flex justify-between items-center">
        <h2 className="font-bold text-lg text-black">{app.appName}</h2>
        <button
          type="button"
          onClick={() => deleteDashboard(app._id)}
          className="bg-[#E9EDF1] hover:bg-[#D1D8DE] text-black px-3 py-1 rounded-md font-semibold  transition"
        >
          Delete
        </button>
      </div>
      <div className="p-6 space-y-4">
        {[{ field: "email", label: "Email" }, { field: "password", label: "Password" }, { field: "location", label: "Location" }, { field: "phoneNumber", label: "Phone Number" }].map(({ field, label }) => (
          <label key={field} className="flex items-center justify-between">
            <span className="text-gray-700 font-medium">{label}</span>
            <input
              type="checkbox"
              {...register(field)}
              className="w-5 h-5 accent-[#ADCBEA] rounded focus:ring-blue-500"
            />
          </label>
        ))}
        <button
          type="submit"
          className="w-full bg-[#ADCBEA] hover:bg-[#89B4E0] text-black px-3 py-2 rounded-md font-semibold  transition duration-300"
        >
          Update Fields
        </button>
      </div>
    </form>
  );
};

export default DashBoard;
