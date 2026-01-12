import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const publicLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-books"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  const privateLinks = (
    <>
      {/* <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          Dashboard
        </NavLink>
      </li> */}
      <li>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `px-3 py-2 rounded-md font-medium transition-colors ${
              isActive ? "bg-primary text-secondary" : "hover:bg-primary/20"
            }`
          }
        >
          Wishlist
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full sticky top-0 z-50 bg-secondary/70 backdrop-blur-sm shadow-md">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              ☰
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow-lg bg-white/50 backdrop-blur-md rounded-box w-52"
            >
              {publicLinks}
              {user && privateLinks}
            </ul>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img
              src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png"
              className="w-10 hover:rotate-12 transition-transform"
              alt=""
            />
            <span className="text-xl font-bold text-primary">BookCourier</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {publicLinks}
            {user && privateLinks}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-4">
          {!user && (
            <Link
              to="/login"
              className="btn bg-primary text-secondary hover:bg-primary/90 transition-all"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user.photoURL}
                  className="w-10 h-10 rounded-full border-2 border-primary hover:scale-110 transition-transform"
                  alt=""
                />
              </label>
              <ul
                tabIndex={0}
                className="menu dropdown-content mt-3 p-3 shadow-lg bg-white/50 backdrop-blur-md rounded-box w-52"
              >
                <li className="font-semibold text-center">{user.displayName}</li>
                <li>
                  <NavLink className="hover:bg-primary/20 rounded-md px-2 py-1" to="/dashboard/profile">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="hover:bg-primary/20 rounded-md px-2 py-1" to="/dashboard">
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="text-red-500 hover:text-red-600 transition-colors px-2 py-1 rounded-md"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Navbar;
