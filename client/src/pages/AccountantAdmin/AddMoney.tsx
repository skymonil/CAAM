import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../MarksAdmin/Navbar";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Student {
    studentId: string;
    fullName: string;
    course: string;
    walletBalance: number;
}

interface Course {
    courseId: string;
    courseName: string;
}

function AddMoney() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [students, setStudents] = useState<Student[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [funds, setFunds] = useState("");
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentsAndCourses = async () => {
            try {
                const studentsResponse = await axios.get("http://localhost:5000/api/student/get", {
                    withCredentials: true,
                });

                const StudentId = studentsResponse.data.id;
                const studentDetailsResponse = await axios.get(`http://localhost:5000/api/student/getStudentsDetailById/${StudentId}`);
                setStudents(studentDetailsResponse.data);

                const coursesResponse = await axios.get("http://localhost:5000/api/course/getAll");
                setCourses(coursesResponse.data);

                setLoading(false);
            } catch (err) {
                if (axios.isAxiosError(err) && err.response?.status === 401) {
                    navigate("/log-in");
                } else {
                    console.error("Error: ", err);
                }
            }
        };

        fetchStudentsAndCourses();
    }, [navigate]);

    const handleAddFundsClick = (student: Student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setFunds("");
    };

    const handleFundsSubmit = () => {
        if (!selectedStudent) return;
        const amount = parseFloat(funds);
        if (isNaN(amount) || amount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        console.log(`Funds added: ${amount} for student: ${selectedStudent.fullName}`);
        handleModalClose();
    };

    const handleCourseChange = (course: Course) => {
        setSelectedCourse(course);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <Loader2 />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 mt-6 shadow-lg shadow-gray-400 bg-white rounded-lg">
            <Navbar />
            <h1 className="text-3xl font-semibold text-center mt-6 text-gray-800 mb-6">
                Add Money to Wallet
            </h1>

            <form className="mb-6">
                <div className="text-xl font-medium text-gray-700 mb-4">Select Course</div>
                <div className="space-y-4">
                    {courses.map((course, index) => (
                        <div className="flex items-center space-x-3" key={course.courseId}>
                            <input
                                type="radio"
                                name="course"
                                id={`course-${index}`}
                                onChange={() => handleCourseChange(course)}
                                className="h-5 w-5"
                            />
                            <label htmlFor={`course-${index}`} className="text-lg text-gray-700">
                                {course.courseName}
                            </label>
                        </div>
                    ))}
                </div>
            </form>

            {selectedCourse && (
                <div className="mb-6 text-lg text-gray-700">
                    <strong>Selected Course:</strong> {selectedCourse.courseName}
                </div>
            )}

            <div className="space-y-4">
                {students
                    .filter((student) => student.course === selectedCourse?.courseName)
                    .map((student) => (
                        <div
                            key={student.studentId}
                            className="border border-gray-300 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center">
                                <div className="space-y-2">
                                    <div className="font-medium text-gray-800">Name: {student.fullName}</div>
                                    <div className="text-gray-600">Course: {student.course}</div>
                                </div>
                                <button
                                    onClick={() => handleAddFundsClick(student)}
                                    className="bg-green-500 px-6 py-2 text-white rounded-lg hover:bg-green-600 transition"
                                >
                                    Add Funds
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h2 className="text-2xl font-semibold mb-4">Add Funds</h2>
                        <p className="text-gray-600 mb-4">
                            Adding funds for <strong>{selectedStudent?.fullName}</strong>
                        </p>
                        <p className="text-gray-600 mb-4">
                            Available Balance: {selectedStudent?.walletBalance}
                        </p>
                        <input
                            type="number"
                            value={funds}
                            onChange={(e) => setFunds(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                        />
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleModalClose}
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleFundsSubmit}
                                className="bg-green-500 px-4 py-2 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                Add Funds
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddMoney;
