import { useState } from "react";

interface Student {
  id: string;
  name: string;
  status: string;
}

const ScholarshipApproval = () => {
  const [students, setStudents] = useState<Student[]>([
    { id: "stu001", name: "Chirag Varu", status: "Pending" },
    { id: "stu002", name: "Akshat Gohil", status: "Pending" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const approveStudent = () => {
    if (selectedStudent) {
      setStudents(
        students.filter((student) => student.id !== selectedStudent.id)
      );
      setShowModal(false);
      setSelectedStudent(null);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Scholarship Approval
      </h2>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Student Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Status
              </th>
              <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {student.name}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {student.status}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedStudent(student);
                      setShowModal(true);
                    }}
                    className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors duration-200"
                  >
                    Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Approving Scholarship */}
      {showModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/3 shadow-lg">
            <h3 className="text-xl font-semibold text-center">
              Approve Scholarship
            </h3>
            <p className="text-sm text-gray-700 mt-4 text-center">
              Are you sure you want to approve {selectedStudent.name}?
            </p>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={approveStudent}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipApproval;
