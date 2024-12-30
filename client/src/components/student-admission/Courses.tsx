import React from "react";
import { Clock, CheckCircle, IndianRupee } from "lucide-react"; // Importing icons from Lucide

const Courses = () => {
  // Sample data for courses
  const courses = [
    {
      id: 1,
      name: "Bachelor of Science in Information Technology",
      duration: "3 Years",
      eligibility: "Minimum 60% in HSC & 75 Marks in Mathematics",
      fees: "₹25,000/year",
    },
    {
      id: 2,
      name: "Bachelor of Management Studies",
      duration: "3 Years",
      eligibility: "Minimum 55% in HSC (Commerce stream)",
      fees: "₹50,000/year",
    },
    {
      id: 3,
      name: "Bachelor of Arts in Mass Media",
      duration: "3 Years",
      eligibility: "Minimum 50% in HSC (Arts stream)s",
      fees: "₹1,00,000/year",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#9c231b]">Courses Offered</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-4">{course.name}</h3>

            {/* Duration */}
            <div className="flex items-center text-gray-600 mb-2">
              <Clock className="h-5 w-5 mr-2" />
              <span>{course.duration}</span>
            </div>

            {/* Eligibility */}
            <div className="flex items-center text-gray-600 mb-4">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>{course.eligibility}</span>
            </div>

            {/* Fees */}
            <div className="flex items-center text-gray-600">
              <IndianRupee className="h-5 w-5 mr-2" />
              <span>{course.fees}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
