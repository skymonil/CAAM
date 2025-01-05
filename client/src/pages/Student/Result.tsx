import { useRef } from "react";
import Navbar from "./Navbar";

const Result = () => {
  const studentInfo = {
    studentId: "2023IT001",
    course: "B.Sc. Information Technology",
    totalMarks: 452,
    maxMarks: 500,
    percentage: 90.4,
    grade: "A+",
    status: "PASS",
    subjects: [
      {
        name: "Java Programming",
        maxMarks: 100,
        obtainedMarks: 95,
        grade: "A+",
      },
      {
        name: "Embedded Systems",
        maxMarks: 100,
        obtainedMarks: 88,
        grade: "A",
      },
      {
        name: "Computer Graphics",
        maxMarks: 100,
        obtainedMarks: 92,
        grade: "A+",
      },
      {
        name: "Software Engineering",
        maxMarks: 100,
        obtainedMarks: 87,
        grade: "A",
      },
      {
        name: "Quantitative Techniques",
        maxMarks: 100,
        obtainedMarks: 90,
        grade: "A+",
      },
    ],
  };

  const resultRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    if (resultRef.current) {
      const printContent = resultRef.current.innerHTML;
      const printWindow = window.open("", "_blank");

      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Result</title>
              <style>
                /* General Styles */
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 20px;
                  background-color: #f9fafb;
                }
                .container {
                  max-width: 800px;
                  margin: auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
  
                /* Heading Styles */
                h1, h2, h3 {
                  text-align: center;
                  margin: 0 0 20px 0;
                  color: #111827;
                }
  
                /* Header Section */
                .header {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 20px;
                }
                .header p {
                  margin: 0;
                  font-size: 0.9rem;
                  color: #6b7280;
                }
  
                /* Performance Summary in a Row */
                .summary {
                  display: flex;
                  justify-content: space-around;
                  align-items: center;
                  margin-bottom: 20px;
                  border: 1px solid #e5e7eb;
                  border-radius: 8px;
                  padding: 10px 0;
                }
                .summary div {
                  text-align: center;
                  flex: 1;
                }
                .summary h4 {
                  margin: 0;
                  font-size: 1.2rem;
                  font-weight: bold;
                  color: #111827;
                }
                .summary p {
                  margin: 5px 0 0 0;
                  font-size: 0.9rem;
                  color: #6b7280;
                }
                .status.pass {
                  color: #10b981; /* Green for pass */
                }
                .status.fail {
                  color: #ef4444; /* Red for fail */
                }
  
                /* Subject Table */
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                  font-size: 0.9rem;
                  color: #374151;
                }
                th, td {
                  padding: 10px;
                  border: 1px solid #d1d5db;
                  text-align: center;
                }
                th {
                  background-color: #f3f4f6;
                  font-weight: bold;
                }
  
                /* Notes Section */
                .notes {
                  background-color: #fef2f2;
                  padding: 15px;
                  border-radius: 8px;
                  color: #991b1b;
                  font-size: 0.85rem;
                  margin-top: 20px;
                }
                .notes ul {
                  margin: 10px 0 0 20px;
                }
  
                /* Utility Classes */
                .text-center {
                  text-align: center;
                }
              </style>
            </head>
            <body>
              <div class="container">
                ${printContent}
              </div>
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.print();
      } else {
        alert("Failed to open print window. Please try again.");
      }
    } else {
      alert("Result section is not available for printing.");
    }
  };


  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="" ref={resultRef}>
            <div className="flex w-full justify-between items-center mb-6">
              <p className="text-gray-600 font-medium">
                Student ID: {studentInfo.studentId}
              </p>
              <p className="text-gray-600">Course: {studentInfo.course}</p>
            </div>

            {/* Performance Summary */}
            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div>
                <p className="text-gray-600">Total Marks</p>
                <h4 className="text-xl font-bold">
                  {studentInfo.totalMarks}/{studentInfo.maxMarks}
                </h4>
              </div>
              <div>
                <p className="text-gray-600">Percentage & Grade</p>
                <h4 className="text-xl font-bold">
                  {studentInfo.percentage}% ({studentInfo.grade})
                </h4>
              </div>
              <div>
                <p className="text-gray-600">Status</p>
                <h4
                  className={`text-xl font-bold ${studentInfo.status === "PASS"
                      ? "text-green-500"
                      : "text-red-500"
                    }`}
                >
                  {studentInfo.status}
                </h4>
              </div>
            </div>

            {/* Subject-wise Performance */}

            <table className="w-full border-collapse mb-6 text-center">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2">Subject</th>
                  <th className="border p-2">Maximum Marks</th>
                  <th className="border p-2">Marks Obtained</th>
                  <th className="border p-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {studentInfo.subjects.map((subject, index) => (
                  <tr key={index} className="text-sm text-gray-600">
                    <td className="border p-2">{subject.name}</td>
                    <td className="border p-2 text-center">
                      {subject.maxMarks}
                    </td>
                    <td className="border p-2 text-center">
                      {subject.obtainedMarks}
                    </td>
                    <td className="border p-2 text-center">{subject.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Download & Print Buttons */}
          <div className="flex justify-end gap-4 mb-4">
            <button
              className="px-4 py-2 bg-[#9c231b] text-white rounded shadow hover:bg-[#502b28]"
              onClick={handlePrint}
            >
              Print Result
            </button>
          </div>

          {/* Important Notes */}
          <div className="bg-red-100 p-4 rounded text-sm text-gray-700">
            <p>
              <strong>Important Notes:</strong>
            </p>
            <ul className="list-disc list-inside">
              <li>
                For re-evaluation, apply within 15 days of result declaration.
              </li>
              <li>
                Visit the college office with a printed copy of the result.
              </li>
              <li>Carry your student ID card for verification.</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
