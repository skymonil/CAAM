import React, { useState, useEffect } from "react";
// import "font-awesome/css/font-awesome.min.css";
// import { Description } from "@mui/icons-material";

type Student = {
  id: string;
  profilePhoto: string;
  fullName: string;
  admissionForm: {
    gender: string;
    parentName: string;
    address: string;
    contactNumber: string;
    parentNumber: string;
    dob: string;
    lastInstitution: string;
    percentage: string;
    documents: {
      photo: string;
      marksheet: string;
      leaveCertificate: string;
      adharCard: string;
    };
  };
};

const DocumentVerificationAdmin: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Fetch students data from an API (mocked here for demonstration)
  useEffect(() => {
    const fetchData = async () => {
      const data: Student[] = [
        {
          id: "1",
          profilePhoto: "https://via.placeholder.com/150",
          fullName: "Chirag Varu",
          admissionForm: {
            gender: "Male",
            parentName: "Parent Name",
            address: "123 Main St, City, Country",
            contactNumber: "1234567890",
            parentNumber: "0987654321",
            dob: "2005-12-09",
            lastInstitution: "ABC High School",
            percentage: "85%",
            documents: {
              photo: "https://via.placeholder.com/150",
              marksheet: "https://via.placeholder.com/150",
              leaveCertificate: "https://via.placeholder.com/150",
              adharCard: "https://via.placeholder.com/150",
            },
          },
        },
        {
          id: "2",
          profilePhoto: "https://via.placeholder.com/150",
          fullName: "Aditya Pai",
          admissionForm: {
            gender: "Male",
            parentName: "parentName",
            address: "123 Main St, City, Country",
            contactNumber: "1234567890",
            parentNumber: "0987654321",
            dob: "2005-12-09",
            lastInstitution: "ABC High School",
            percentage: "85%",
            documents: {
              photo: "https://via.placeholder.com/150",
              marksheet: "https://via.placeholder.com/150",
              leaveCertificate: "https://via.placeholder.com/150",
              adharCard: "https://via.placeholder.com/150",
            },
          },
        },
        {
          id: "3",
          profilePhoto: "https://via.placeholder.com/150",
          fullName: "Akshat Gohil",
          admissionForm: {
            gender: "Male",
            parentName: "parentName",
            address: "123 Main St, City, Country",
            contactNumber: "1234567890",
            parentNumber: "0987654321",
            dob: "2005-12-09",
            lastInstitution: "ABC High School",
            percentage: "85%",
            documents: {
              photo: "https://via.placeholder.com/150",
              marksheet: "https://via.placeholder.com/150",
              leaveCertificate: "https://via.placeholder.com/150",
              adharCard: "https://via.placeholder.com/150",
            },
          },
        },
        {
          id: "4",
          profilePhoto: "https://via.placeholder.com/150",
          fullName: "Monil Parikh",
          admissionForm: {
            gender: "Male",
            parentName: "parentName",
            address: "123 Main St, City, Country",
            contactNumber: "1234567890",
            parentNumber: "0987654321",
            dob: "2005-12-09",
            lastInstitution: "ABC High School",
            percentage: "85%",
            documents: {
              photo: "https://via.placeholder.com/150",
              marksheet: "https://via.placeholder.com/150",
              leaveCertificate: "https://via.placeholder.com/150",
              adharCard: "https://via.placeholder.com/150",
            },
          },
        },
      ];
      setStudents(data);
    };

    fetchData();
  }, []);

  const handleApprove = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setSelectedStudent(null);
  };

  const handleReject = (id: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
    setSelectedStudent(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Document Verification</h1>

      {/* Student List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {students.map((student) => (
          <div
            key={student.id}
            className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedStudent(student)}
          >
            <img
              src={student.profilePhoto}
              alt={student.fullName}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="text-lg font-semibold">{student.fullName}</h2>
            <div className="mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={(e) => {
                  e.stopPropagation();
                  handleApprove(student.id);
                }}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  handleReject(student.id);
                }}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Student Details Modal */}
      {selectedStudent && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
          onClick={() => setSelectedStudent(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Admission Form</h2>
            <p>
              <strong>Full Name:</strong> {selectedStudent.fullName}
            </p>
            <p>
              <strong>Gender:</strong> {selectedStudent.admissionForm.gender}
            </p>
            <p>
              <strong>Parent Name:</strong>{" "}
              {selectedStudent.admissionForm.parentName}
            </p>
            <p>
              <strong>Address:</strong> {selectedStudent.admissionForm.address}
            </p>
            <p>
              <strong>Contact Number:</strong>{" "}
              {selectedStudent.admissionForm.contactNumber}
            </p>
            <p>
              <strong>Parent Number:</strong>{" "}
              {selectedStudent.admissionForm.parentNumber}
            </p>
            <p>
              <strong>Date of Birth:</strong>{" "}
              {selectedStudent.admissionForm.dob}
            </p>
            <p>
              <strong>Last Institution:</strong>{" "}
              {selectedStudent.admissionForm.lastInstitution}
            </p>
            <p>
              <strong>Percentage:</strong>{" "}
              {selectedStudent.admissionForm.percentage}
            </p>

            <h3 className="text-lg font-semibold mt-4">Documents</h3>
            <ul className="list-disc pl-4">
              <li>
                <a
                  href={selectedStudent.admissionForm.documents.photo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Passport Size Photo{" "}
                  {/* <span className="ml-2 text-red-500">
                    <i className="fas fa-file-pdf">s</i>
                  </span>
                  <i className="fa fa-file-pdf">h</i> */}
                </a>
              </li>
              <li>
                <a
                  href={selectedStudent.admissionForm.documents.marksheet}
                  target="_blank"
                  rel="noreferrer"
                >
                  Marksheet
                </a>
              </li>
              <li>
                <a
                  href={
                    selectedStudent.admissionForm.documents.leaveCertificate
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Leave Certificate
                  {/* <Description /> */}
                </a>
              </li>
              <li>
                <a
                  href={selectedStudent.admissionForm.documents.adharCard}
                  target="_blank"
                  rel="noreferrer"
                >
                  Adhar Card
                </a>
              </li>
            </ul>

            <div className="mt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => handleApprove(selectedStudent.id)}
              >
                Approve
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleReject(selectedStudent.id)}
              >
                Reject
              </button>
            </div>

            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setSelectedStudent(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentVerificationAdmin;
