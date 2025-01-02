import { useState, FormEvent, ChangeEvent } from "react";
import logo from "../assets/logo.jpeg";
import axios from "axios";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const [_username, setUsername] = useState("");
  const [_email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [college, setCollege] = useState("");
  const [error, setError] = useState<string | null>(null);
  // const [otp, setOtp] = useState<string | "614362">("614362"); // for OTP 
  // const [message, setMessage] = useState(''); // for otp
  const [_accountId, setAccountId] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  // const generateOTP = () => {
  //   let otp = '';
  //   for (let i = 0; i < 6; i++) {
  //     otp += Math.floor(Math.random() * 10);
  //   }
  //   return otp;
  // };

  // Function to send OTP to user's email
  // const sendOTP = () => {
  //   const otpCode = generateOTP();
  //   setOtp(otpCode);

  //   const templateParams = {
  //     to_email: email,
  //     otp: otpCode,
  //   };

  //   emailjs
  //     .send(
  //       'Template ID', 
  //       'Template ID', 
  //       templateParams,
  //       'User ID' 
  //     )
  //     .then(
  //       (response) => {
  //         console.log('OTP sent successfully:', response);
  //         setMessage('OTP sent to your email!');
  //       },
  //       (error) => {
  //         console.log('Error sending OTP:', error);
  //         setMessage('Failed to send OTP, try again.');
  //       }
  //     );
  // };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );
      console.log("User registered: ", response.data);
      setAccountId(response.data._id);
      // setIsOtpModalOpen(true);
    } catch (error: any) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors || error.response.data.error;

        if (Array.isArray(backendErrors)) {
          const formattedErrors = backendErrors.map(err => err.msg).join(", ");
          setError(formattedErrors);
        } else {
          setError(backendErrors);
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      handleRegister(e);
    } else {
      setError("Passwords do not match!");
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
                name="username"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.username}
                onChange={handleChange}
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
                name="email"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#9c231b]"
                value={formData.password}
                onChange={handleChange}
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
              // onClick={sendOTP}
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

      {/* {isOtpModalOpen && (
        <OtpModal
          accountId={accountId}
          email={formData.email}
          OTP={otp}
          onClose={() => setIsOtpModalOpen(false)}
        />
      )} */}
    </div>
  );
};

export default Register;
