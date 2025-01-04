import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { useStudent } from "../../context/StudentContext";

const Grievance = () => {
  const { studentId } = useStudent();
  const [grievanceHistory, setGrievanceHistory] = useState<{
    date: string;
    title: string;
    status: string;
  }[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    details: "",
  });

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/grievance/fetch-grievance-student/${studentId}`);
        if (response.data.success) {
          setGrievanceHistory(response.data.data);
        }
      } catch (error) {
        console.log('Error Occurred While Fetching');
      }
    };

    fetchGrievances();
  }, [studentId]); // Added studentId as dependency to refetch if it changes

  const [showMessage, setShowMessage] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
     await axios.post('http://localhost:5000/api/grievance/add', {
        studentId,
        title: formData.title,
        details: formData.details
      });

      const newGrievance = {
        date: new Date().toISOString().split('T')[0],
        title: formData.title,
        status: "Pending",
      };

      setGrievanceHistory((prev) => [...prev, newGrievance]);
      setFormData({ title: "", details: "" });
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 3000);
    } catch (error) {
      console.log('Error: ' + error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-center text-[#9c231b]">
              Grievance Redressal
            </h1>
          </div>

          <h2 className="text-xl font-semibold mb-4">
            Grievance Redressal Form
          </h2>
          <form onSubmit={handleSubmit}>
            {showMessage && (
              <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
                Grievance submitted successfully!
              </div>
            )}
            <div className="mb-4">
              <label
                htmlFor="grievanceTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="grievanceTitle"
                name="title"
                type="text"
                placeholder="Enter the title of your grievance"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="grievanceDetails"
                className="block text-sm font-medium text-gray-700"
              >
                Details
              </label>
              <textarea
                id="grievanceDetails"
                name="details"
                rows={4}
                placeholder="Provide details about your grievance"
                value={formData.details}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#9c231b] text-white px-4 py-2 rounded-lg hover:bg-[#502b28] w-full sm:w-auto"
              >
                Submit Grievance
              </button>
            </div>
          </form>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Grievance History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 bg-white rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="py-2 px-4 text-left border-b">Date</th>
                    <th className="py-2 px-4 text-left border-b">Title</th>
                    <th className="py-2 px-4 text-left border-b">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {grievanceHistory.map((grievance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-2 px-4 border-b">{grievance.date}</td>
                      <td className="py-2 px-4 border-b">{grievance.title}</td>
                      <td
                        className={`py-2 px-4 border-b ${
                          grievance.status === "Resolved"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {grievance.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grievance;
