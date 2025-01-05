import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  matchPath,
} from "react-router-dom";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import LogIn from "./pages/LogIn";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";
import WalletPage from "./pages/Student/WalletPage";
import Leave from "./pages/Student/Leave";
import Grievance from "./pages/Student/Grievance";
import Admission from "./pages/Student/Admission";
import GrievanceList from "./pages/HOD/GrievanceList";
import NotFound from "./pages/NotFound";
import LeaveApproval from "./pages/HOD/LeaveApproval";
import DocumentVerificationAdmin from "./pages/DocAdmin/DocumentVerificationAdmin";
import SuperAdmin from "./pages/SuperAdmin/page";
import MarksAdmin from "./pages/MarksAdmin/page";
import Scholarship from "./pages/Student/Scholarship";
import ReExam from "./pages/Student/ReExam";
import HODScholarship from "./pages/HOD/HODScholarship";
import AddMoney from "./pages/AccountantAdmin/AddMoney";
import Result from "./pages/Student/Result";
import { StudentProvider } from "./context/StudentContext";

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/leave",
    "/fee-status",
    "/student-detail",
    "/wallet",
    "/grievance",
    "admin-grievance",
    "admin-leave",
    "admin-scholarship/*",
    "doc-admin",
    "/admission/*",
    "/reexam",
    "scholarship",
    "accountant-admin",
    "/result"
  ]; // List of paths where the navbar should appear

  const shouldHaveNavbar = hideNavbarPaths.some((path) =>
    matchPath({ path, end: true }, location.pathname)
  );


  return (
    <>
      <StudentProvider>
        {shouldHaveNavbar && <Navbar />}
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/log-in" element={<LogIn />} />

          <Route path="/admin-register" element={<AdminRegister />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/student-detail" element={<Dashboard />} />
          <Route path="/admission/*" element={<Admission />} />
          <Route path="/fee-status" element={<FeeStatus />} />
          <Route path="/reexam" element={<ReExam />} />
          <Route path="/result" element={<Result />} />
          <Route path="/scholarship" element={<Scholarship />} />
          <Route path="/grievance" element={<Grievance />} />
          <Route path="/leave" element={<Leave />} />
          <Route path="/wallet" element={<WalletPage />} />

          <Route path="/superAdmin" element={<SuperAdmin />} />
          <Route path="/doc-admin" element={<DocumentVerificationAdmin />} />
          <Route path="/marks-admin" element={<MarksAdmin />} />

          <Route path="/admin-grievance" element={<GrievanceList />} />
          <Route path="/admin-leave" element={<LeaveApproval />} />
          <Route path="/admin-scholarship/*" element={<HODScholarship />} />

          <Route path="/accountant-admin" element={<AddMoney />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </StudentProvider>
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

