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
    <Box className="p-6 border rounded-md bg-white shadow-md">
      <Typography variant="h6" className="mb-4">
        {existingTask ? "Edit Task" : "Add Task"}
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4"
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        rows={4}
        className="mb-4"
      />
      <TextField
        fullWidth
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="mb-4"
        InputLabelProps={{ shrink: true }}
      />
      <Box className="flex justify-between">
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default TaskForm;
