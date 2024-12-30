import { useState } from "react";

const CollegeDetails = () => {
  const [collegeName, setCollegeName] = useState("Sample College");
  const [collegeAddress, setCollegeAddress] = useState("123 College St, City");

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">College Details</h2>
      <div className="mt-4">
        <label className="block text-gray-700">College Name:</label>
        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">College Address:</label>
        <input
          type="text"
          value={collegeAddress}
          onChange={(e) => setCollegeAddress(e.target.value)}
          className="mt-2 p-2 border border-gray-300 rounded w-full"
        />
      </div>
    </div>
  );
};

export default CollegeDetails;
