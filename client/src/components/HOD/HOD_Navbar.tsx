import { CalendarX } from "lucide-react"
import { IconContext } from "react-icons"
import { BsExclamationCircle } from "react-icons/bs"
import { NavLink } from "react-router-dom"

function HOD_Navbar() {
  return (
    <IconContext.Provider value={{ className: "mr-2" }}>
      <nav className="bg-gray-300 text-gray-950 border-b border-slate-500/30">
      <ul className="flex gap-x-4">
    <li>
      <NavLink
        to="/admin-grievance"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <BsExclamationCircle size={20} />
        <span className="ml-2">Grievance Addressal</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/admin-leave"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <CalendarX size={20} />
        <span className="ml-2">Leave Approval</span>
      </NavLink>
    </li>
  </ul>

</nav>


    </IconContext.Provider>
  )
}

export default HOD_Navbar
