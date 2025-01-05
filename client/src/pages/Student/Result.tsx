import { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStudent } from "../../context/StudentContext";

interface Subject {
    name: string;
    maxMarks: number;
    obtainedMarks: number;
    grade?: string;
}

interface StudentData {
    id: string;
    name: string;
    email: string;
}

const Result = () => {
    const { setStudentId } = useStudent();
    const [studentData, setStudentData] = useState<StudentData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<Subject[]>([
        {
            name: "Java Programming",
            maxMarks: 100,
            obtainedMarks: 76,
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
            obtainedMarks: 95,
            grade: "A+",
        },
    ]);
    const [totalMarks, setTotalMarks] = useState<number>(0);
    const [percentage, setPercentage] = useState<number>(0);
    const [grade, setGrade] = useState<string>("A+");
    const [status, setStatus] = useState<string>("PASS"); // Added status state
    const navigate = useNavigate();
    const resultRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Fetch the student data once when the component mounts
        axios
            .get("http://localhost:5000/api/student/get", { withCredentials: true })
            .then((response) => {
                setStudentData(response.data);
                setStudentId(response.data.id);
                setLoading(false);
            })
            .catch((err) => {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    navigate("/log-in");
                } else {
                    console.error("Error: ", err);
                }
            });
    }, [navigate, setStudentId]); // Only run this on mount (empty dependency array)

    useEffect(() => {
        if (studentData) {
            calculateSummary(); // Only run when studentData is fetched
        }
    }, [studentData]); // Only run when studentData changes

    const calculateSummary = () => {
        let total = 0;
        let max = 0;
        let isFail = false;

        const updatedSubjects = subjects.map((subject) => {
            const grade = calculateGrade(subject.obtainedMarks, subject.maxMarks);
            total += subject.obtainedMarks;
            max += subject.maxMarks;

            // Check if any subject is F (fail)
            if (grade === "F") isFail = true;

            return { ...subject, grade };
        });

        setSubjects(updatedSubjects);
        setTotalMarks(total);

        const perc = (total / max) * 100;
        setPercentage(perc);

        const overallGrade = getOverallGrade(perc);
        setGrade(overallGrade);
        setStatus(isFail ? "FAIL" : "PASS");
    };

    const calculateGrade = (obtainedMarks: number, maxMarks: number): string => {
        const percentage = (obtainedMarks / maxMarks) * 100;
        if (percentage >= 90) return "A+";
        if (percentage >= 80) return "A";
        if (percentage >= 70) return "B";
        if (percentage >= 60) return "C";
        if (percentage >= 40) return "D"; // Fail below 40%
        return "F"; // Explicit failure if below 40%
    };

    const getOverallGrade = (perc: number): string => {
        if (perc >= 90) return "A+";
        if (perc >= 80) return "A";
        if (perc >= 70) return "B";
        if (perc >= 60) return "C";
        return "D";
    };

    const handlePrint = () => {
        if (resultRef.current) {
            const printContent = resultRef.current.innerHTML;
            const printWindow = window.open('', '_blank');

            if (printWindow) {
                printWindow.document.write(`
          <html>
            <head>
              <title>Result</title>
              <style>
                body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  background-color: #f7fafc;
                }
                .container {
                  max-width: 800px;
                  margin: auto;
                  background-color: #ffffff;
                  border-radius: 10px;
                  padding: 30px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .summary {
                  display: flex;
                  justify-content: space-between;
                  margin-bottom: 30px;
                  padding: 15px;
                  background-color: #edf2f7;
                  border-radius: 8px;
                  border: 1px solid #e2e8f0;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                  margin-top: 20px;
                }
                th, td {
                  padding: 12px;
                  border: 1px solid #e2e8f0;
                  text-align: center;
                }
                th {
                  background-color: #f7fafc;
                }
                .notes {
                  background-color: #fff7f0;
                  padding: 20px;
                  border-radius: 8px;
                  color: #dd6b20;
                  font-size: 14px;
                  margin-top: 30px;
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
                alert('Failed to open print window. Please try again.');
            }
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <div ref={resultRef}>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-gray-600 font-medium">
                                Student Name: {studentData?.name}
                                <br />
                                Student ID: {studentData?.id}
                            </p>
                            <p className="text-gray-600">Course: B.Sc. Information Technology</p>
                        </div>
                        <div className="flex justify-around gap-4 text-center mb-6">
                            <div>
                                <p className="text-gray-600">Total Marks</p>
                                <h4 className="text-xl font-bold">
                                    {totalMarks}/{subjects.reduce((acc, subject) => acc + subject.maxMarks, 0)}
                                </h4>
                            </div>
                            <div>
                                <p className="text-gray-600">Percentage & Grade</p>
                                <h4 className="text-xl font-bold">
                                    {percentage.toFixed(2)}% ({grade})
                                </h4>
                            </div>
                            <div>
                                <p className="text-gray-600">Status</p>
                                <h4 className={`text-xl font-bold ${status === "PASS" ? "text-green-500" : "text-red-500"}`}>
                                    {status}
                                </h4>
                            </div>
                        </div>
                        <div className="overflow-x-auto mb-6">
                            <table className="w-full border-collapse text-center">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border p-2">Subject</th>
                                        <th className="border p-2">Maximum Marks</th>
                                        <th className="border p-2">Marks Obtained</th>
                                        <th className="border p-2">Grade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {subjects.map((subject, index) => (
                                        <tr key={index} className="text-sm text-gray-600">
                                            <td className="border p-2">{subject.name}</td>
                                            <td className="border p-2">{subject.maxMarks}</td>
                                            <td className="border p-2">{subject.obtainedMarks}</td>
                                            <td className="border p-2">{subject.grade}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mb-4">
                        <button
                            onClick={handlePrint}
                            className="px-4 py-2 bg-red-600 text-white rounded shadow hover:bg-red-700"
                        >
                            Print Result
                        </button>
                    </div>
                    <div className="bg-red-100 p-4 rounded text-sm text-gray-700">
                        <p>
                            <strong>Important Notes:</strong>
                        </p>
                        <ul className="list-disc list-inside">
                            <li>For re-evaluation, apply within 15 days of the result date.</li>
                            <li>Original mark sheet will be provided in 30 working days.</li>
                            <li>For any queries, contact the examination department.</li>
                        </ul>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Result;
