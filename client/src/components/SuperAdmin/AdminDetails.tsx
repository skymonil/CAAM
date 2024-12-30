import { useState } from "react";

interface Admin {
  id: string;
  name: string;
  password: string;
}

const AdminDetails = () => {
  const [admins, setAdmins] = useState<Admin[]>([
    { id: "doc123", name: "Doc Admin", password: "docpassword" },
    { id: "marks123", name: "Marks Admin", password: "marksadmin" },
    { id: "hod123", name: "HOD", password: "hodpassword" },
  ]);

  const [newPassword, setNewPassword] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const handlePasswordChange = (adminId: string) => {
    if (newPassword && selectedAdmin) {
      const updatedAdmins = admins.map((admin) =>
        admin.id === adminId ? { ...admin, password: newPassword } : admin
      );
      setAdmins(updatedAdmins);
      setNewPassword("");
      setSelectedAdmin(null);
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
                Admin Name
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-600">
                Admin ID
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
              <tr key={admin.id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4 text-sm text-gray-700">
                  {admin.name}
                </td>
                <td className="py-2 px-4 text-sm text-gray-600">{admin.id}</td>
                <td className="py-2 px-4 text-sm text-gray-600">
                  {admin.password}
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => setSelectedAdmin(admin)}
                    className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
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
            Change Password for {selectedAdmin.name}
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
              onClick={() => handlePasswordChange(selectedAdmin.id)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
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
