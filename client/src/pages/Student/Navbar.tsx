import { useState } from "react";
import {
  User,
  FileText,
  ClipboardList,
  List,
  BarChart,
  Menu,
  X,
  Wallet,
  CalendarX,
} from "lucide-react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom";
import { BsExclamationCircle } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <IconContext.Provider value={{ className: "mr-2" }}>
      <nav className="bg-gray-300 text-gray-950 border-b border-slate-500/30">
  {/* Navbar Header */}
  <div className="flex justify-between items-center p-4 md:hidden">
    <h1 className="text-lg font-bold">Dashboard</h1>
    <button
      onClick={toggleMenu}
      className="text-gray-950 focus:outline-none"
      aria-label="Toggle Menu"
    >
      {isOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  </div>

  {/* Navbar Menu */}
  <ul
    className={`${
      isOpen ? "block" : "hidden"
    } md:flex md:space-x-6 bg-gray-300 md:bg-transparent md:p-0 p-4 space-y-4 md:space-y-0 justify-center`}
  >
    <li>
      <NavLink
        to="/student-detail"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 w-full justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <User size={20} />
        <span className="ml-2">Student Profile</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/fee-status"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <FileText size={20} />
        <span className="ml-2">Fee Status</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/exam-registration"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <ClipboardList size={20} />
        <span className="ml-2">Exam Registration</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/admission-form"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <List size={20} />
        <span className="ml-2">Admission Form</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/result"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <BarChart size={20} />
        <span className="ml-2">Result</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/grievance"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-red-600" : "hover:bg-gray-400"
          }`
        }
      >
        <BsExclamationCircle size={20} />
        <span className="ml-2">Grievance Redressal</span>
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/leave"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
            isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
          }`
        }
      >
        <CalendarX size={20} />
        <span className="ml-2">Apply for Leave</span>
      </NavLink>
    </li>
          <li>
            <NavLink to="/wallet"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 transition-all duration-300 justify-center ${
                isActive ? "bg-gray-100 text-[#9c231b]" : "hover:bg-gray-400"
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
