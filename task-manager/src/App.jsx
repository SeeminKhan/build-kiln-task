import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDashboard from "./pages/TaskDashboard";
import TaskDetails from "./pages/TaskDetails";
import EditTask from "./pages/EditTask";
import './index.css'; // This should be at the top of your entry file


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskDashboard />} />
        <Route path="/tasks" element={<TaskDashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} />
        <Route path="/tasks/:id/edit" element={<EditTask />} />
      </Routes>
    </Router>
  );
}

export default App;
