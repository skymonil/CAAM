import { NavLink } from "react-router-dom";

const AdmissionTabs = () => {
  return (
    <div>
      <div className="mb-6 flex space-x-8 border-b pb-3 justify-center">
        <NavLink
          to="/admission/form"
          className={({ isActive }) =>
            `font-semibold border-b-2 text-gray-600 ${
              isActive
                ? "text-[#9c231b]  border-[#9c231b]"
                : "hover:text-black border-none"
            }`
          }
        >
          Admission Form
        </NavLink>
        <NavLink
          to="/admission/courses"
          className={({ isActive }) =>
            `font-semibold border-b-2 text-gray-600 ${
              isActive
                ? "text-[#9c231b]  border-[#9c231b]"
                : "hover:text-black border-none"
            }`
          }
        >
          Course Details
        </NavLink>
        <NavLink
          to="/admission/guidelines"
          className={({ isActive }) =>
            `font-semibold border-b-2 text-gray-600 ${
              isActive
                ? "text-[#9c231b]  border-[#9c231b]"
                : "hover:text-black border-none"
            }`
          }
        >
          Guidelines
        </NavLink>
        <NavLink
          to="/admission/help"
          className={({ isActive }) =>
            `font-semibold border-b-2 text-gray-600 ${
              isActive
                ? "text-[#9c231b]  border-[#9c231b]"
                : "hover:text-black border-none"
            }`
          }
        >
         Help & Support
        </NavLink>
      </div>
    </div>
  );
};

export default AdmissionTabs;
