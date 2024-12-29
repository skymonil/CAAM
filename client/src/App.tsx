import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";
import FeeStatus from "./pages/Student/FeeStatus";
import WalletPage from "./pages/Student/WalletPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/student-detail" element={<Dashboard />} />
        <Route path="/fee-status" element={<FeeStatus />} />
        <Route path="/wallet" element={<WalletPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
