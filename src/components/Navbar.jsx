import React, { useState } from "react";
import logo from "../assets/wincedeck-logo.png";
import { FiUser } from "react-icons/fi";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

function Navbar() {
  let location = useLocation();
  const { user, logout, loading } = useAuthContext();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  function handleLogoClick() {
    if (user) {
      navigate("dashboard");
    } else {
      navigate("/");
    }
  }

  return (
    <>
      <div className={`border-b border-gray-200 backdrop-blur-lg sticky top-0`}>
        <div
          className={`w-full h-13 mx-auto flex justify-between items-center px-5.5 max-w-7xl`}
        >
          <img
            src={logo}
            alt="logo"
            className={`w-fit h-6.75`}
            onClick={handleLogoClick}
          />

          {user && (
            <div className={`flex gap-x-5`}>
              <div className={`gap-x-1 items-center hidden sm:flex`}>
                <FiUser className={`text-lg`} />
                <span className={`text-xs font-medium`}>{user.email}</span>
              </div>

              <button
                className={`flex items-center gap-x-1 border border-gray-300 rounded-sm px-2 py-1 hover:bg-gray-100 active:bg-gray-100`}
                onClick={() => setIsLogoutModalOpen(true)}
              >
                <FiLogOut className={`text-sm`} />
                <span
                  className={`text-[11px] font-semibold hidden sm:inline-block`}
                >
                  Logout
                </span>
              </button>
            </div>
          )}

          {location.pathname == "/" && (
            <div className={`flex gap-x-5 items-center font-semibold`}>
              <Link
                to={"login"}
                className={`text-[11.8px] text-gray-500 hover:text-black active:text-black`}
              >
                Login
              </Link>
              <Link
                to={"signup"}
                className={`text-[11.8px] text-white bg-black px-3 py-[4.5px] rounded-[0.4rem] active:scale-95 transition-transform duration-100 ease-in-out text-center`}
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>

      {isLogoutModalOpen && (
        <LogoutModal
          isModalOpen={isLogoutModalOpen}
          setIsModalOpen={setIsLogoutModalOpen}
          logout={logout}
          loading={loading}
        />
      )}
    </>
  );
}

export default Navbar;
