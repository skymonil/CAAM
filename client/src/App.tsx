import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Student/Dashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/student-detail" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
