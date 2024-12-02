import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Fab,
  Grid,
  TextField,
  Avatar,
  Badge,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { reorderTasks, deleteTask } from "../redux/taskSlice"; // Redux actions

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [activeFilter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter tasks based on the search query and active filter
  const filteredTasks = tasks.filter((task) => {
    const isTitleMatch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    switch (activeFilter) {
      case "Completed":
        return task.completed && isTitleMatch;
      case "Pending":
        return !task.completed && isTitleMatch;
      case "Overdue":
        return new Date(task.dueDate) < new Date() && isTitleMatch;
      default:
        return isTitleMatch;
    }
  });

  // Handle drag-and-drop task reordering
  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    dispatch(reorderTasks(reorderedTasks));
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Box display="flex" minHeight="100vh" bgcolor="#f7f8fc">
      {/* Main Content */}
      <Box flex={1} p={4}>
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
        >
          <Box>
            <Typography variant="h4" gutterBottom color="primary">
              Hello😊
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              Let's organize your daily tasks
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <TextField
              label="Search Tasks"
              variant="outlined"
              color="secondary"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginRight: 2 }}
            />
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                color: "#fff",
                borderRadius: "8px",
                padding: "10px 20px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  transform: "scale(1.05)",
                  background: "linear-gradient(to right, #5a0fb9, #2061e0)",
                },
              }}
              onClick={() => setShowForm(true)}
            >
              Add New Task
            </Button>
          </Box>
        </Box>

        {/* Task Filters */}
        <TaskFilters activeFilter={activeFilter} setFilter={setFilter} />

        {/* Drag and Drop Area */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <TaskList
            tasks={filteredTasks}
            title={`${activeFilter} Tasks`}
            onDelete={handleDelete}
          />
        </DragDropContext>

        {/* Add Task Form Modal */}
        {showForm && (
          <Box className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
            <Box className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <TaskForm onClose={() => setShowForm(false)} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TaskDashboard;
