import { useState } from "react";
import {
  User,
  FileText,
  ClipboardList,
  List,
  BarChart,
  CalendarCheck,
  Menu,
  X,
  Wallet,
} from "lucide-react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <IconContext.Provider value={{ className: "mr-2" }}>
      <nav className="bg-gray-700 text-white">
        {/* Navbar Header */}
        <div className="flex justify-between items-center p-4 md:p-0">
          <h1 className="text-lg font-bold inline md:hidden">Dashboard</h1>

          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none md:hidden"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Navbar Menu */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:space-x-6 bg-gray-800 md:bg-transparent md:p-0 p-4 space-y-4 md:space-y-0`}
        >
          <li className="flex items-center">
            <NavLink
              to="/student-detail"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <User size={20} />
              <span className="ml-2">Student Detail</span>
            </NavLink>
          </li>

          <li className="flex items-center">
            <NavLink
              to="/fee-status"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <FileText size={20} />
              <span className="ml-2">Fee Status</span>
            </NavLink>
          </li>

          <li className="flex items-center">
            <NavLink
              to="/exam-registration"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <ClipboardList size={20} />
              <span className="ml-2">Exam Registration</span>
            </NavLink>
          </li>

          <li className="flex items-center">
            <NavLink
              to="/admission-form"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <List size={20} />
              <span className="ml-2">Admission Form</span>
            </NavLink>
          </li>

          <li className="flex items-center">
            <NavLink
              to="/result"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <BarChart size={20} />
              <span className="ml-2">Result</span>
            </NavLink>
          </li>

          <li className="flex items-center">
            <NavLink
              to="/attendance"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? "bg-gray-700 text-red-400"
                    : "hover:bg-gray-700 hover:text-gray-300"
                }`
              }
            >
              <CalendarCheck size={20} />
              <span className="ml-2">Attendance</span>
            </NavLink>
          </li>
          <li className="flex items-center">
            <NavLink to="/wallet"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gray-700 text-red-400"
                  : "hover:bg-gray-700 hover:text-gray-300"
              }`
            }>
              <Wallet size={20}/>
              <span>Wallet</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </IconContext.Provider>
  );
};

export default Navbar;
