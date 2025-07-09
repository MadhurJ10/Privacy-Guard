import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useContext } from "react";
import { UserContext } from "../context/UserProvider";
import { logoutUser } from '../services/authService'


const SlidingBar = ({ toggleSlideBar }) => {
      const {isUserValid , setIsUserValid} = useContext(UserContext);
  const sidebarRef = useRef(null); // Reference to the sidebar div

  const handleCloseSidebar = () => {
    // Slide-out animation
    gsap.to(sidebarRef.current, {
      x: "100%", // Move it off-screen to the right
      duration: 0.5,
      ease: "power2.in",
      onComplete: () => {
        toggleSlideBar(); // Call the toggle function after animation
      },
    });
  };

  useEffect(() => {
    // Slide-in animation
    gsap.fromTo(
      sidebarRef.current,
      { x: "100%" }, // Start completely off-screen (to the right)
      { x: "0%", duration: 0.5, ease: "power2.out" } // Animate to its final position
    );

    return () => {
      // Optional: Cleanup animation properties
      gsap.set(sidebarRef.current, { clearProps: "all" });
    };
  }, []);

  return (
    <div
      ref={sidebarRef}
      className="Slidebar fixed top-0 right-0 h-full w-[18rem] bg-white z-50 flex flex-col gap-4 p-4 shadow-lg border-l border-gray-200"
    >
      {/* Close Button */}
      {/* <button
        onClick={handleCloseSidebar}
        className="self-end px-2 py-3 text-gray-500 hover:text-gray-700 transition duration-200 f"
      >
        ✕
      </button> */}

      <div
        onClick={handleCloseSidebar}
        className="self-end px-2 py-3 h-[2rem] rounded-4xl bg-[#E7EDF3] cursor-pointer text-gray-500 hover:text-gray-700 transition duration-200 flex justify-center items-center"
      >
        ✕
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col" onClick={handleCloseSidebar}>
  {!isUserValid &&  <Link
    to="/register"
    className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
  >
    <i className="ri-user-line text-2xl relative top-[1px]"></i>
    <span>Register</span>
  </Link>}
        {!isUserValid &&  <Link
          to="/login"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-shield-line text-2xl relative top-[1px]"></i>
          <span>Login</span>
        </Link>}
        <Link
          to="/data-Manager"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-database-line text-2xl relative top-[1px]"></i>
          <span>Data Manager</span>
        </Link>
        <Link
          to="/DataBreach"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-alert-line text-2xl relative top-[1px]"></i>
          <span>Breach Detection</span>
        </Link>
        <Link
          to="/fake-data"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-file-copy-line text-2xl relative top-[1px]"></i>
          <span>Fake Info Generator</span>
        </Link>
        <Link
          to="/news"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-article-line text-2xl relative top-[1px]"></i>
          <span>Security News</span>
        </Link>
        <Link
          to="/password-checker"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-lock-line text-2xl relative top-[1px]"></i>
          <span>Password Strength Checker</span>
        </Link>
        <Link
          to="/disposable-email"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-mail-line text-2xl relative top-[1px]"></i>
          <span>Disposable Email</span>
        </Link>
        <Link
          to="/data-vault"
          className="px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2"
        >
          <i className="ri-key-line text-2xl relative top-[1px] font-bold"></i>
          <span>Data Vault</span>
        </Link>
        {/* {isUserValid && <button onClick={logoutUser} >logout</button>} */}
        {isUserValid && <div onClick={logoutUser} className="px-4 py-2.5 cursor-pointer text-sm text-gray-600 hover:text-gray-900 transition duration-200 rounded-3xl hover:bg-[#E7EDF3] flex items-center gap-2">
          <i class="ri-logout-box-line text-2xl relative top-[1px] font-bold"></i>
          Logout
        </div>}
      </nav>
    </div>
  );
};

export default SlidingBar;
