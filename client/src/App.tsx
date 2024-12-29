import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";

function App() {
  const handleLogin = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Add login logic (e.g., API calls) here
  };

  const handleRegister = () => {
    console.log("Navigating to the registration page");
    // Add navigation logic (e.g., using `useNavigate` from `react-router-dom`) here
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/log-in"
          element={<LogIn onLogin={handleLogin} onRegister={handleRegister} />}
        />
        <Route path="/student-detail" element={<Dashboard />} />
        <Route path="/fee-status" element={<FeeStatus />} />
      </Routes>
    </Router>
  );
}

export default App;
