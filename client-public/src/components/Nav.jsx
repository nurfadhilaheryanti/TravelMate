import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt3, HiMenuAlt1 } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import ResponsiveMenu from "./ResponsiveMenu";
import { MdAccountCircle } from "react-icons/md"; // Icon for profile picture
import logo from "../components/assets/logo-no-background.svg";

export const NavbarLinks = [
  // {
  //   id: 1,
  //   name: "Home",
  //   link: "/",
  // },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // State for profile dropdown

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  // Example profile data, replace with actual logic to fetch user details
  const profile = {
    name: "John Doe",
    email: "john.doe@example.com",
    profilePicture: "", // Provide URL or use placeholder if available
  };

  return (
    <>
      <nav className=" top-0 right-0 left-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md" style={{ height: "80px" }}>
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container py-[2px] sm:block hidden">
            <div className="flex items-center justify-between"></div>
          </div>
        </div>
        <div className="container h-full flex items-center justify-between px-4 sm:px-0">
          <div className="flex items-center gap-4 font-bold text-2xl">
            <Link to={"/"} onClick={() => window.scrollTo(0, 0)}>
              <img
                src={logo}
                alt="Logo"
                className="h-8"
              />
            </Link>
            <div className="flex items-center gap-6">
              <NavLink to={"/"} className="font-bold text-gray-800 hover:text-gray-900">
                Home
              </NavLink>
              <NavLink to={"/my-trips"} className="font-bold text-gray-800 hover:text-gray-900">
                My Trip
              </NavLink>
            </div>
          </div>
          <div className="hidden md:flex flex-grow justify-end">
            <ul className="flex items-center gap-6">
              {NavbarLinks.map((link) => (
                <li key={link.id} className="py-4">
                  <NavLink
                    to={link.link}
                    className="font-bold text-gray-800 hover:text-gray-900"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-4 relative">
              {/* Profile Section */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleDropdown}
              >
                {profile.profilePicture ? (
                  <img
                    src={profile.profilePicture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <MdAccountCircle className="text-gray-400 w-10 h-10 rounded-full" />
                )}
                <div>
                  <p className="font-semibold text-gray-800">
                    {profile.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profile.email}
                  </p>
                </div>
              </div>
              {/* End of Profile Section */}
              {/* Logout Dropdown */}
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View Profile
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
              {/* End of Logout Dropdown */}
            </div>
          </div>
          <div className="md:hidden block">
            {showMenu ? (
              <HiMenuAlt1
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            ) : (
              <HiMenuAlt3
                onClick={toggleMenu}
                className="cursor-pointer transition-all"
                size={30}
              />
            )}
          </div>
        </div>
        <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
      </nav>
    </>
  );
};

export default Navbar;
