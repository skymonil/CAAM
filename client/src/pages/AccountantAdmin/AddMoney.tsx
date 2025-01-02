import { useState } from "react";

interface Course {
    courseId: string;
    courseName: string;
}

interface Student {
    studentCourse: string;
    studentName: string;
    studentId: string;
}

function AddMoney() {
    const [courses] = useState<Course[]>([
        { courseId: "C001", courseName: "BSCIT" },
        { courseId: "C002", courseName: "BMS" },
        { courseId: "C003", courseName: "BMM" },
    ]);

    const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();

    const [students] = useState<Student[]>([
        { studentId: "S001", studentName: "Akshat", studentCourse: "BSCIT" },
    ]);

    const handleChange = (course: Course) => {
        setSelectedCourse(course);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 shadow-xl bg-white rounded-lg min-h-screen">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
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
                                onChange={() => handleChange(course)}
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
                    .filter((student) => student.studentCourse === selectedCourse?.courseName)
                    .map((student) => (
                        <div
                            key={student.studentId}
                            className="border border-gray-300 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <div className="font-medium text-gray-800">Name: {student.studentName}</div>
                                    <div className="text-gray-600">Course: {student.studentCourse}</div>
                                </div>
                                <button className="bg-green-500 px-6 py-2 text-white rounded-lg hover:bg-green-600 transition">
                                    Add Funds
                                </button>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default AddMoney;
