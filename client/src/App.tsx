import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";
import Leave from "./pages/Student/Leave";
import Grievance from "./pages/Student/Grievance";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/log-in", "/register", "/admin-register"]; // List of paths where the navbar should not appear

  const handleLogin = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Add login logic (e.g., API calls) here
  };

  const handleRegister = (username: string, email: string, password: string) => {
    console.log("Registration with:", { username, email, password });
    // Add navigation logic (e.g., using `useNavigate` from `react-router-dom`) here
  };

  const handleAdminRegister = (CollegeName: string, email: string, password: string) => {
    console.log("Registration with:", { CollegeName, email, password });
    // Add navigation logic (e.g., using `useNavigate` from `react-router-dom`) here
  };

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route
          path="/log-in"
          element={<LogIn onLogin={handleLogin}/>}
        />
        <Route path="/register" element={<Register onRegister={handleRegister}/>} />
        <Route path="/admin-register" element={<AdminRegister onAdminRegister={handleAdminRegister}/>} />
        <Route path="/student-detail" element={<Dashboard />} />
        <Route path="/fee-status" element={<FeeStatus />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/grievance" element={<Grievance />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
