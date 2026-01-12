import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";
import { BsGraphUp } from "react-icons/bs";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import CustomerMenu from "./Menu/CustomerMenu";
import useRole from "../../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <p className="p-10 text-center animate-pulse">Loading...</p>;

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-gradient-to-r from-secondary to-primary shadow-xl">
        <Link to="/">
          <img
            src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png"
            className="w-10 drop-shadow-xl"
            alt=""
          />
        </Link>
        <button onClick={() => setActive(!isActive)}>
          <AiOutlineBars className="text-white w-7 h-7" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed bg-[#FBF9D1] top-0 left-0 h-full w-64 z-50 transform transition-all duration-500 ease-in-out
        ${isActive ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0`}
      >
        <div className="h-full bg-white/80 backdrop-blur-xl shadow-2xl border-r border-gray-200 flex flex-col">

          {/* Logo */}
          <div className="h-20 flex items-center justify-center bg-gradient-to-r from-primary/55 to-secondary/50 shadow-md">
            <Link to="/">
              <img
                src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png"
                className="w-14 hover:scale-110 transition duration-300 drop-shadow-xl"
                alt=""
              />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex-1 px-3 bg-[#FBF9D1] py-6 space-y-3 overflow-y-auto">

            <div className="transition hover:translate-x-1 hover:scale-[1.02] duration-300">
              <MenuItem icon={BsGraphUp} label="Statistics" address="/dashboard" />
            </div>

            {role === "customer" && (
              <div className="space-y-2 animate-fade-in">
                <CustomerMenu />
              </div>
            )}

            {role === "seller" && (
              <div className="space-y-2 animate-fade-in">
                <SellerMenu />
              </div>
            )}

            {role === "admin" && (
              <div className="space-y-2 animate-fade-in">
                <AdminMenu />
              </div>
            )}
          </div>

          {/* Bottom */}
          <div className="px-3  border-t bg-[#FBF9D1] backdrop-blur-xl">

            <div className="hover:translate-x-1 transition duration-300">
              <MenuItem icon={FcSettings} label="Profile" address="/dashboard/profile" />
            </div>

            <button
              onClick={logOut}
              className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl
              bg-gradient-to-r from-red-50 to-red-100
              hover:from-red-100 hover:to-red-200
              text-red-400 shadow hover:shadow-lg
              transition-all duration-300 hover:scale-[1.03]"
            >
              <GrLogout className="w-5 h-5" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
