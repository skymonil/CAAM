import { useState, FormEvent, ChangeEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo.jpeg";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("User registered: ", response.data);
      window.location.href = "/log-in"; 
    } catch (error: any) {
      if (error.response?.data) {
        const backendErrors =
          error.response.data.errors || error.response.data.error;
        setError(
          Array.isArray(backendErrors)
            ? backendErrors.map((err) => err.msg).join(", ")
            : backendErrors
        );
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match!");
      setTimeout(() => setError(null), 3000);
      return;
    }
    handleRegister(e);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left side with logo */}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 p-4">
          <img src={logo} alt="Logo" className="object-contain" />
        </div>

        {/* Right side with form */}
        <div className="w-full lg:w-1/2 p-6 space-y-5">
          <h2 className="text-2xl font-semibold text-center text-gray-800 underline">
            Create Account
          </h2>
          <p className="text-center text-gray-600 text-sm">
            Join us today to get started
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <FontAwesomeIcon
                  icon={passwordVisible ? faEye :faEyeSlash }
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirm-password"
                  className="w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <FontAwesomeIcon
                  icon={confirmPasswordVisible ? faEye :faEyeSlash }
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="college" className="block text-sm font-medium text-gray-700">
                College
              </label>
              <select
                id="college"
                name="college"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                required
              >
                <option value="">Select your college</option>
                <option value="College A">College A</option>
                <option value="College B">College B</option>
                <option value="College C">College C</option>
                <option value="College D">College D</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full px-6 py-2 text-white bg-[#9c231b] rounded-lg hover:bg-[#502b28] focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Register
              </button>
            </div>
          </form>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <button
              className="text-[#9c231b] hover:underline focus:outline-none"
              onClick={() => (window.location.href = "/log-in")}
            >
              Login here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
