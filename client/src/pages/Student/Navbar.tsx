import { User, FileText, ClipboardList, List, BarChart, CalendarCheck } from "lucide-react";
import { IconContext } from "react-icons";
import { NavLink } from "react-router-dom"; // Import NavLink

const Navbar = () => {
  return (
    <IconContext.Provider value={{ className: "mr-2" }}>
      <div className="bg-gray-700 text-white p-4">

        {/* Navbar Menu Items */}
        <ul className="flex space-x-8">
          <li className="flex items-center">
            <NavLink
              to="/student-detail"
              className={({ isActive }) =>
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
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
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
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
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
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
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
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
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
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
                `flex items-center cursor-pointer ${isActive ? "text-red-500" : "text-white"}`
              }
            >
              <CalendarCheck size={20} />
              <span className="ml-2">Attendance</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </IconContext.Provider>
  );
};

export default Navbar;
