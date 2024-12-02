import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { updateTask } from "../redux/taskSlice";
import { TextField, Button, Box, Typography } from "@mui/material";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateTask({
        id: parseInt(id),
        updatedTask: { title, description, dueDate },
      })
    );
    navigate(-1); // Go back to the previous page
  };

  if (!task) return <Typography color="error">Task not found!</Typography>;

  return (
    <Box className="flex flex-col items-center mt-10">
      <Typography variant="h4" gutterBottom color="primary">
        Edit Task
      </Typography>
      <form onSubmit={handleSubmit} className="w-96">
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          type="date"
          label="Due Date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
        />
        <Box className="flex justify-between mt-4">
          <Button variant="contained" color="error" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button variant="contained" color="success" type="submit" onClick={() => navigate(-1)}>
            Save Changes
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditTask;
