import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface Course {
  id: string;
  name: string;
  duration: string;
  fees: string;
  subjects: string;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/course/get-courses", {
        withCredentials: true,
      })
      .then((response) => {
        setCollegeName(response.data.collegeName);
        setCourses(response.data.courses);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Loader2 />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center text-[#9c231b]">
        {collegeName} - Courses Offered
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-4 text-center">
              {course.name}
            </h3>

            <div className="text-gray-600 mb-2">
              <i className="fas fa-clock mr-2"></i>
              <strong>Duration:</strong> <br />
              {course.duration}
            </div>

            <div className="text-gray-600 mb-2">
              <i className="fas fa-indian-rupee-sign mr-2"></i>
              <strong>Fees:</strong> <br />
              {course.fees}
            </div>

            <div className="text-gray-600">
              <i className="fas fa-book mr-2"></i>
              <strong>Subjects:</strong> <br />
              {course.subjects}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
