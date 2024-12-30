import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";
import WalletPage from "./pages/Student/WalletPage";
import Leave from "./pages/Student/Leave";
import Grievance from "./pages/Student/Grievance";
import Admission from "./pages/Student/Admission";
import GrievanceList from "./pages/HOD/GrievanceList";
import HOD_Navbar from "./pages/HOD/HOD_Navbar";
import NotFound from "./pages/NotFound";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/leave",
    "/fee-status",
    "/admin-register",
    "/student-detail",
    "/wallet",
    "/grievance",
  ]; // List of paths where the navbar should appear

  const shouldHaveNavbar = hideNavbarPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );

  const handleLogin = (username: string, password: string) => {
    console.log("Logging in with:", { username, password });
    // Add login logic (e.g., API calls) here
  };

  const handleRegister = (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("Registration with:", { username, email, password });
    // Add navigation logic (e.g., using `useNavigate` from `react-router-dom`) here
  };

  const handleAdminRegister = (
    CollegeName: string,
    email: string,
    password: string
  ) => {
    console.log("Registration with:", { CollegeName, email, password });
    // Add navigation logic (e.g., using `useNavigate` from `react-router-dom`) here
  };

  return (
    <>
      {shouldHaveNavbar && <Navbar />}
      <Routes>
        <Route path="/log-in" element={<LogIn onLogin={handleLogin} />} />
        <Route
          path="/register"
          element={<Register onRegister={handleRegister} />}
        />
        <Route
          path="/admin-register"
          element={<AdminRegister onAdminRegister={handleAdminRegister} />}
        />
        <Route path="/student-detail" element={<Dashboard />} />
        <Route path="/fee-status" element={<FeeStatus />} />
        <Route path="/admission/*" element={<Admission />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/grievance" element={<Grievance />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/*" element={<NotFound />} />

        <Route
          path="/admin-grievance"
          element={
            <>
              <HOD_Navbar />
              <GrievanceList />
            </>
          }
        />
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
