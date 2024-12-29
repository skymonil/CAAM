import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Register from "./pages/Register";
import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/log-in", "/register"]; // List of paths where the navbar should not appear

  const handleLogin = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Add login logic (e.g., API calls) here
  };

  const handleRegister = () => {
    console.log("registration page");
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
        <Route path="/student-detail" element={<Dashboard />} />
        <Route path="/fee-status" element={<FeeStatus />} />
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
