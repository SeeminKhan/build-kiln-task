import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Fab, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { DragDropContext } from "react-beautiful-dnd";
import TaskForm from "../components/TaskForm";
import TaskFilters from "../components/TaskFilters";
import TaskList from "../components/TaskList";
import { reorderTasks } from "../redux/taskSlice"; // Action for reordering tasks
import { deleteTask } from "../redux/taskSlice"; // Action for deleting tasks

const TaskDashboard = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const [activeFilter, setFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // state for search query

  // Filter tasks based on the search query and active filter
  const filteredTasks = tasks.filter((task) => {
    const isTitleMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
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

    dispatch(reorderTasks(reorderedTasks)); // Dispatch the reordered tasks to redux
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId)); // Delete task via redux
  };

  return (
    <Box className="relative bg-gradient-to-r from-lavender-700 to-lavender-500 min-h-screen p-8">
      {/* Search Bar */}
      <Box className="mb-6 w-full max-w-md mx-auto">
        <TextField
          label="Search Tasks"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4"
          InputProps={{
            style: {
              backgroundColor: "white",
              borderRadius: "8px",
              paddingLeft: "12px",
              fontSize: "16px",
            },
          }}
        />
      </Box>

      {/* Task Filters */}
      <Box className="mb-6">
        <TaskFilters activeFilter={activeFilter} setFilter={setFilter} />
      </Box>

      {/* Drag and Drop Area */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Box className="mt-8">
          <TaskList tasks={filteredTasks} title={`${activeFilter} Tasks`} onDelete={handleDelete} />
        </Box>
      </DragDropContext>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-110 transform transition-transform"
        onClick={() => setShowForm(true)}
      >
        <AddIcon />
      </Fab>

      {/* Add Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <Box className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <TaskForm onClose={() => setShowForm(false)} />
          </Box>
        </div>
      )}
    </Box>
  );
};

export default TaskDashboard;
