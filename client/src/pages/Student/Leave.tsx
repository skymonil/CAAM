import Navbar from "./Navbar";

const Leave = () => {
  const leaveHistory = [
    {
      id: 1,
      startDate: "20-12-2024",
      endDate: "22-12-2024",
      reason: "Family event",
      status: "Accepted",
      comments: "",
    },
    {
      id: 2,
      startDate: "25-12-2024",
      endDate: "27-12-2024",
      reason: "Medical leave",
      status: "Rejected",
      comments: "Insufficient documentation",
    },
  ];

  const handleSubmit = (e:any) => {
    e.preventDefault();
    alert("Leave application submitted!");
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          {/* Page Header */}
          <div className="border-b pb-4 mb-4">
            <h1 className="text-2xl font-semibold">Leave Application Forum</h1>
          </div>

          {/* Leave Application Form */}
          <form className="mb-8" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Apply for Leave</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Start Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                End Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Reason for Leave
              </label>
              <textarea
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
                rows={4}
                placeholder="Enter the reason for your leave"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#9c231b] text-white px-4 py-2 rounded-lg hover:bg-[#502b28]"
            >
              Submit Application
            </button>
          </form>

          {/* Leave History */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Leave History</h2>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Date</th>
                  <th className="border px-4 py-2 text-left">Reason</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Comments</th>
                </tr>
              </thead>
              <tbody>
                {leaveHistory.map((leave) => (
                  <tr key={leave.id}>
                    <td className="border px-4 py-2">
                      {leave.startDate} - {leave.endDate}
                    </td>
                    <td className="border px-4 py-2">{leave.reason}</td>
                    <td
                      className={`border px-4 py-2 ${
                        leave.status === "Accepted"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      {leave.status}
                    </td>
                    <td className="border px-4 py-2">
                      {leave.comments || "N/A"}
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

export default Leave;
