import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

interface AdminFormData {
  username: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [formData, setFormData] = useState<AdminFormData>({
    username: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/admin-login",
        formData,
        { withCredentials: true }
      );
      console.log("Admin Login Successful:", response.data);
      const {role} = response.data;
      switch (role) {
        case "superAdmin":
          navigate("/super-admin");
          break;
        case "docAdmin":
          navigate("/doc-admin");
          break;
        case "marksAdmin":
          navigate("/marks-admin");
          break;
        case "accountantAdmin":
          navigate("/accountant-admin");
          break;
        case "hod":
          navigate("/admin-grievance");
          break;
        default:
          setError("Invalid role or unauthorized access.");
          break;
      }
    } catch (error: any) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors || error.response.data.error;

        if (Array.isArray(backendErrors)) {
          const formattedErrors = backendErrors.map((err) => err.msg).join(", ");
          setError(formattedErrors);
        } else {
          setError(backendErrors);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
        {/* Left side with logo */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-6">
          <img src={logo} alt="Logo" className="max-h-80" />
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-2xl font-semibold text-center text-gray-700 sm:text-3xl">
            ADMIN LOGIN
          </h2>
          <form onSubmit={handleLogin} className="mt-6">
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:ring focus:ring-[#9c231b] sm:text-base"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border rounded-lg focus:outline-none focus:ring focus:ring-[#9c231b] sm:text-base"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {passwordVisible ? (
                  <i
                    className="fa-solid fa-eye absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  ></i>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#9c231b] rounded-lg hover:bg-[#502b28] focus:outline-none focus:ring focus:ring-blue-300 sm:text-base"
            >
              Log In
            </button>
            {error && (
              <p className="text-[#ff2f2f] text-sm mt-4 text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
