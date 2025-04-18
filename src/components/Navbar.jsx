import { NavLink } from "react-router-dom"
import { FaLaptopCode } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi2";
import { IoHomeOutline, IoInformationCircleOutline, IoLayersOutline, IoLogOutOutline } from "react-icons/io5";
import { LuUser2 } from "react-icons/lu";
import { useAuth } from "../context/auth";

export const Navbar = () => {
  const getActivePage = ({ isActive }) => {
    return {
      color: isActive ? "var(--special_green)" : "var(--special_blue)"
    }
  }

  const { user, isLoggedIn } = useAuth();

  return (
    <>
      <NavLink to="/" style={getActivePage} className="flex gap-2 items-center"><IoHomeOutline />Home</NavLink>
      {
        isLoggedIn ? <NavLink to="/courses/dashboard" style={getActivePage} className="flex gap-2 items-center "><FaLaptopCode />Courses</NavLink> : null
      }
      <NavLink to="/contest" style={getActivePage} className="flex gap-2 items-center "><IoLayersOutline />Contest</NavLink>
      <NavLink to="/about" style={getActivePage} className="flex gap-2 items-center"><IoInformationCircleOutline />About</NavLink>
      {user.isAdmin ? <NavLink to="/admin/users" style={getActivePage} className="flex gap-2 items-center"><HiOutlineUser />Admin</NavLink> : null}
      {isLoggedIn ? (
        <NavLink to="/logout" style={getActivePage} className="flex gap-2 items-center"><IoLogOutOutline /><span className="text-red-500">Logout</span></NavLink>
      ) : (
        <NavLink to="/login" style={getActivePage} className="flex gap-2 items-center"><LuUser2 />Sign Up</NavLink>
      )}
    </>
  );
};