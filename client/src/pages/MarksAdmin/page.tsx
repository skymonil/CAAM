import React, { useState, useEffect } from "react";
import Navbar from "./Nabar";
import axios from "axios";

interface Marks {
  math: string;
  science: string;
  english: string;
}

interface Student {
  id: number;
  name: string;
}

interface ModalProps {
  student: Student;
  onClose: () => void;
  onDone: (studentId: number) => void;
}

const Modal: React.FC<ModalProps> = ({ student, onClose, onDone }) => {
  const [marks, setMarks] = useState<Marks>({
    math: "",
    science: "",
    english: "",
  });

  const handleMarksChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarks({
      ...marks,
      [e.target.name]: e.target.value,
    });
  };

  const validateMarks = (marks: Marks) => {
    const markValues = [marks.math, marks.science, marks.english];
    for (let mark of markValues) {
      const markNumber = Number(mark);
      if (markNumber < 0 || markNumber > 100) {
        return false; // Invalid mark found
      }
    }
    return true;
  };

  const handleSubmit = () => {
    // Check if all marks are within the valid range (0-100)
    if (!validateMarks(marks)) {
      alert("Marks must be between 0 and 100!");
      return; // Stop form submission
    }

    console.log("Marks for student:", student.name, marks);
    onDone(student.id);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Enter Marks for {student.name}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Math:
          </label>
          <input
            type="number"
            name="math"
            value={marks.math}
            onChange={handleMarksChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Science:
          </label>
          <input
            type="number"
            name="science"
            value={marks.science}
            onChange={handleMarksChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            English:
          </label>
          <input
            type="number"
            name="english"
            value={marks.english}
            onChange={handleMarksChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-semibold hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#9c231b] text-white py-2 px-6 rounded-lg text-sm font-semibold hover:bg-blue-600 transition duration-200"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};


const MarksAdmin: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/student/getStudents", {
        withCredentials: true,
      })
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  const handleDone = (studentId: number) => {
    // Only remove the student whose marks were submitted
    setStudents((prevStudents) =>
      prevStudents.filter((student) => student.id !== studentId)
    );
    handleCloseModal();
  };

  return (
    <div className="p-5 bg-gray-50 min-h-screen">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-[#9c231b] mb-6 mt-6">
        Marks Administration
      </h1>

      <div className="bg-white p-5 rounded-lg shadow-lg">
        <ul>
          {students.map((student) => (
            <li
              key={student.id}
              className="cursor-pointer flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg shadow hover:bg-gray-200 transition duration-300"
              onClick={() => handleStudentClick(student)}
            >
              <span className="font-semibold text-gray-800">{student.name}</span>
              <span className="text-sm text-gray-500">Click to Enter Marks</span>
            </li>
          ))}
        </ul>
      </div>

      {selectedStudent && (
        <Modal
          student={selectedStudent}
          onClose={handleCloseModal}
          onDone={handleDone}
        />
      )}
    </div>
  );
};


export default MarksAdmin;
