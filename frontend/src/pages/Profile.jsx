import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'

const Profile = () => {
  const { userDetails } = useContext(UserContext)
  console.log(userDetails)

  const handleLogout = () => {
    localStorage.removeItem('jwt')
    window.location.href = '/login'
  }

  if (!userDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-gray-700 text-lg">Loading profile...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="flex flex-col sm:flex-row gap-10 items-start max-w-5xl mx-auto">
        {/* Profile Image */}
        <div className="relative">
          <img
            src="https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg"
            alt="Profile"
            className="w-64 h-64 rounded-full object-cover border-4 border-blue-500 shadow-lg"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {userDetails.firstName}!</h1>
          <div className="space-y-3 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Full Name:</span> {userDetails.firstName} {userDetails.lastName}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span> {userDetails.email}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Phone:</span> {userDetails.phoneNumber}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="mt-8 inline-block bg-[#E7EDF3] hover:bg-[#D1D8DE] text-black font-semibold py-2 px-6 rounded-full shadow transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile