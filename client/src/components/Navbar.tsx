import { User, LogOut } from "lucide-react";

const handleLogout = () => {
  window.location.href = "/log-in";
}

const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <div className="flex items-center">
        <User size={20} /> {/* User Icon next to name */}
        <div className="ml-2 text-lg font-semibold">Chirag Varu</div> {/* Name */}
      </div>
      <button className="flex items-center cursor-pointer hover:bg-gray-700 p-2 rounded" onClick={handleLogout}>
        <LogOut size={20} /> {/* Logout Icon */}
        <span className="ml-2">Logout</span>
      </button>
    </div>
  )
}

export default Navbar
