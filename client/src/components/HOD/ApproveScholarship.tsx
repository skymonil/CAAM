import axios from "axios";
import { useEffect, useState } from "react";

interface Student {
  _id: string;
  name: string;
}

interface Scholarship {
  _id: string;
  name: string;
}

function ApproveScholarship() {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set()); // Only store IDs
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [selectedScholarshipId, setSelectedScholarshipId] = useState<string | null>(null);

  const fetchScholarships = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/scholarship/fetch-all');
      if (response.data.success) {
        setScholarships(response.data.scholarships);
      }
    } catch (error) {
      console.log('Error fetching scholarships');
    }
  };
  useEffect(() => {

    fetchScholarships();
  }, []);

  // Handle checkbox selection
  const handleCheck = (studentId: string, isChecked: boolean) => {
    setSelectedStudents((prevSelected) => {
      const updatedSelection = new Set(prevSelected);
      if (isChecked) {
        updatedSelection.add(studentId); // Add ID to Set
      } else {
        updatedSelection.delete(studentId); // Remove ID from Set
      }
      return updatedSelection;
    });
  };

  // Handle scholarship selection
  const handleScholarshipSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const scholarshipId = event.target.value;
    setSelectedScholarshipId(scholarshipId);

    if (scholarshipId) {
      try {
        const response = await axios.get(`http://localhost:5000/api/scholarship/fetch-students/${scholarshipId}`);
        if (response.data) {
          setStudents(response.data.studentsParticipated); // Fetch and set students
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Handle the approve button click
  const handleApproveClick = async() => {
    // Convert Set of student IDs to an array and log it
    const selectedStudentIds = Array.from(selectedStudents);
    try{
        await axios.post('http://localhost:5000/api/scholarship/approve-students',{
            studentIds: selectedStudentIds,
            scholarshipId: selectedScholarshipId
        });
        fetchScholarships()
    }
    catch(error)
    {
        console.log('error')
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-semibold">Approve Scholarship</h1>

      {/* Scholarship selection dropdown */}
      <div>
        <label htmlFor="scholarship" className="text-xl">Select Scholarship</label>
        <select
          id="scholarship"
          className="border border-gray-300 p-2 rounded-lg text-lg block my-2"
          onChange={handleScholarshipSelect}
        >
          <option value="">-- Select a Scholarship --</option>
          {scholarships.map((scholarship) => (
            <option key={scholarship._id} value={scholarship._id}>
              {scholarship.name}
            </option>
          ))}
        </select>
      </div>

      {/* Student list and checkbox */}
      <div>
        {students.map((student) => (
          <div
            key={student._id}
            className="flex justify-between border border-gray-300 p-5 mb-3 rounded-lg shadow-lg text-xl text-gray-700"
          >
            <div>{student._id}</div>
            <div>{student.name}</div>
            <div>
              <input
                type="checkbox"
                onChange={(e) => handleCheck(student._id, e.target.checked)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Approve button */}
      <div>
        <button
          className="bg-green-500 px-4 py-2 rounded-lg text-white text-lg hover:bg-green-700"
          onClick={()=>handleApproveClick()}
        >
          Approve Selected Students
        </button>
      </div>
    </div>
  );
}

export default ApproveScholarship;
