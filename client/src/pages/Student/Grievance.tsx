import Navbar from "./Navbar";

const Grievance = () => {
  // Sample grievance history data
  const grievanceHistory = [
    { date: "29-12-2024", title: "Issue with Attendance", status: "Resolved" },
    { date: "20-12-2024", title: "Problem with Fee Payment", status: "Pending" },
  ];

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Page Header */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-center text-[#9c231b]">Grievance Redressal</h1>
          </div>

          {/* Grievance Form */}
          <h2 className="text-xl font-semibold mb-4">Grievance Redressal Form</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="grievanceTitle"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                id="grievanceTitle"
                type="text"
                placeholder="Enter the title of your grievance"
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
                rows={4}
                placeholder="Provide details about your grievance"
                className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                required
              ></textarea>
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-[#9c231b] text-white px-4 py-2 rounded-lg hover:bg-[#502b28]"
              >
                Submit Grievance
              </button>
            </div>
          </form>

          {/* Grievance History */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Grievance History</h2>
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
  );
};

export default Grievance;
