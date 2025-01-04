import axios from "axios";
import { useEffect, useState } from "react";

interface Admin {
  username: string;
  password: string;
}

const AdminDetails = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newPassword, setNewPassword] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/admin/credentials");
        console.log("Admin Data:", response.data);
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admin data", error);
      }
    };

    fetchAdmins();
  }, []);

  const handlePasswordChange = async () => {
    if (newPassword && selectedAdmin) {
      try {
        await axios.put(`/api/admin/change-password/${selectedAdmin.username}`, {
          newPassword,
        });

        setAdmins((prevAdmins) =>
          prevAdmins.map((admin) =>
            admin.username === selectedAdmin.username
              ? { ...admin, password: newPassword }
              : admin
          )
        );

        setNewPassword("");
        setSelectedAdmin(null);
        console.log("Password updated successfully!");
      } catch (error) {
        console.error("Error updating password: ", error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-center">Admin Details</h2>

      {/* Admin Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-white shadow-md rounded-lg">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Admin Username
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Password
              </th>
              <th className="py-2 px-4 text-center text-sm font-semibold text-gray-600">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.username} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {admin.username}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {admin.password}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => setSelectedAdmin(admin)}
                    className="bg-[#9c231b] text-white px-4 py-1 rounded-md hover:bg-[#502b28] transition-colors duration-200"
                  >
                    Change Password
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Change Password Section */}
      {selectedAdmin && (
        <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">
            Change Password for {selectedAdmin.username}
          </h3>
          <input
            type="password"
            placeholder="New Password"
            className="mt-2 p-2 border border-gray-300 rounded w-full"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <div className="mt-4 flex justify-end">
            <button
              onClick={handlePasswordChange}
              className="px-4 py-2 bg-[#9c231b] text-white rounded-md hover:bg-[#502b28] transition-colors duration-200"
            >
              Save Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
