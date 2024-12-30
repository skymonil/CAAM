import { useState } from "react";

// Define the type for the subject marks
interface SubjectMarks {
  [key: string]: { min: number; max: number }; // This is a general type for subject marks
}

interface FeeStructure {
  Undergraduate: number;
  Postgraduate: number;
}

const CollegeDetails = () => {
  const [collegeID, setCollegeID] = useState("C123");
  const [collegeName, setCollegeName] = useState("Sample College");
  const [collegeAddress, setCollegeAddress] = useState("123 College St, City");
  const [subjectList, setSubjectList] = useState(["Mathematics"]);
  const [newSubject, setNewSubject] = useState(""); // State for the new subject input
  const [subjectMarks, setSubjectMarks] = useState<SubjectMarks>({
    Mathematics: { min: 35, max: 100 },
    Physics: { min: 30, max: 100 },
    Chemistry: { min: 40, max: 100 },
  });
  const [feeStructure, setFeeStructure] = useState<FeeStructure>({
    Undergraduate: 50000,
    Postgraduate: 80000,
  });

  // Handle changes in the subject marks
  const handleSubjectMarksChange = (
    subject: string,
    type: "min" | "max",
    value: number
  ) => {
    const updatedMarks = { ...subjectMarks };
    updatedMarks[subject] = updatedMarks[subject] || { min: 0, max: 0 }; // Ensure subject exists
    updatedMarks[subject][type] = value;
    setSubjectMarks(updatedMarks);
  };

  // Handle changes in the fee structure
  const handleFeeStructureChange = (
    course: "Undergraduate" | "Postgraduate",
    value: number
  ) => {
    const updatedFees = { ...feeStructure };
    updatedFees[course] = value;
    setFeeStructure(updatedFees);
  };

  // Handle adding a new subject
  const handleAddSubject = () => {
    if (newSubject && !subjectMarks[newSubject]) {
      setSubjectMarks({
        ...subjectMarks,
        [newSubject]: { min: 0, max: 100 }, // Set default marks for new subject
      });
      setSubjectList([...subjectList, newSubject]);
      setNewSubject(""); // Clear the new subject input
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">College Details</h2>

      {/* College ID */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College ID:
        </label>
        <input
          type="text"
          value={collegeID}
          onChange={(e) => setCollegeID(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* College Name */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Name:
        </label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* College Address */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          College Address:
        </label>
        <input
          type="text"
          value={collegeAddress}
          onChange={(e) => setCollegeAddress(e.target.value)}
          className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
      </div>

      {/* Add New Subject */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Add New Subject:
        </label>
        <div className="flex space-x-4">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            placeholder="Enter new subject"
          />
          <button
            onClick={handleAddSubject}
            className="mt-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
      </div>

      {/* Subject Marks (Min and Max) */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Subject Marks (Min/Max):
        </label>
        {subjectList.map((subject) => (
          <div key={subject} className="mt-4">
            <label className="block text-gray-700">{subject} Min Marks:</label>
            <input
              type="number"
              value={subjectMarks[subject].min}
              onChange={(e) =>
                handleSubjectMarksChange(
                  subject,
                  "min",
                  parseInt(e.target.value)
                )
              }
              className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
            <label className="block text-gray-700 mt-4">
              {subject} Max Marks:
            </label>
            <input
              type="number"
              value={subjectMarks[subject].max}
              onChange={(e) =>
                handleSubjectMarksChange(
                  subject,
                  "max",
                  parseInt(e.target.value)
                )
              }
              className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        ))}
      </div>

      {/* Fee Structure */}
      <div className="mt-6">
        <label className="block text-gray-700 font-medium mb-2">
          Fee Structure (According to Courses):
        </label>
        {Object.keys(feeStructure).map((course) => (
          <div key={course} className="mt-4">
            <label className="block text-gray-700">{course} Fee:</label>
            <input
              type="number"
              value={feeStructure[course as keyof FeeStructure]}
              onChange={(e) =>
                handleFeeStructureChange(
                  course as "Undergraduate" | "Postgraduate",
                  parseInt(e.target.value)
                )
              }
              className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollegeDetails;
