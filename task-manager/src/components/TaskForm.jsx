import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, editTask } from "../redux/taskSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

const TaskForm = ({ existingTask = null, onClose }) => {
  const [title, setTitle] = useState(existingTask ? existingTask.title : "");
  const [description, setDescription] = useState(existingTask ? existingTask.description : "");
  const [dueDate, setDueDate] = useState(existingTask ? existingTask.dueDate : "");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const task = { id: existingTask?.id || Date.now(), title, description, dueDate, completed: false };
    existingTask ? dispatch(editTask(task)) : dispatch(addTask(task));
    onClose();
  };

  return (
    <Box 
      className="p-6 border rounded-md bg-purple-50 shadow-md shadow-purple-100"
      sx={{
        padding: "24px",
        borderRadius: "8px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
      <Typography variant="h6" className="mb-6" sx={{ marginBottom: "20px", textAlign: "center" }}>
        {existingTask ? "Edit Task" : "Add Task"}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-6"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        className="mb-6"
        sx={{ marginBottom: "20px" }}
      />
      <TextField
        fullWidth
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mb-6"
        sx={{ marginBottom: "20px" }}
        InputLabelProps={{ shrink: true }}
      />
      <Box className="flex justify-between" sx={{ display: "flex", justifyContent: "space-between", gap: "16px" }}>
        <Button variant="contained" color="secondary" onClick={onClose} sx={{ padding: "12px 24px" }}>
          Cancel
        </Button>
        <Button variant="contained" color="success" onClick={handleSubmit} sx={{ padding: "12px 24px" }}>
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
