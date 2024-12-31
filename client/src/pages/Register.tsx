import React from "react";
import logo from "../assets/logo.jpeg";

type RegisterProps = {
  onRegister: (username: string, email: string, password: string) => void;
};

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [college, setCollege] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onRegister(username, email, password);
    } else {
      setError("Passwords do not match!");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleNavigation = () => {
    window.location.href = "/log-in";
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
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="college"
                className="block text-sm font-medium text-gray-700"
              >
                College
              </label>
              <select
                id="college"
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
          {error && (
            <p className="text-red-500 text-center mt-2">{error}</p> // Display error message
          )}
          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{" "}
            </span>
            <button
              className="text-[#9c241bbd] hover:underline focus:outline-none"
              onClick={handleNavigation}
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
