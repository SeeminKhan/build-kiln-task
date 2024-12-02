import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTask, toggleTaskCompletion } from "../redux/taskSlice";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button, Checkbox } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const TaskCard = ({ task, onDelete }) => {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleDelete = () => {
    setOpenDialog(false);
    onDelete(task.id); // Call delete from parent
  };

  return (
    <>
      <Card className="mb-4 shadow-md shadow-purple-100 border border-purple-500">
        <CardContent>
          <Box className="flex justify-between items-center">
            <Typography variant="h6">
              <Link to={`/tasks/${task.id}`} className="text-fuchsia-800">
                {task.title}
              </Link>
            </Typography>
            <Checkbox
              checked={task.completed}
              onChange={() => dispatch(toggleTaskCompletion(task.id))}
              color="success"
            />
          </Box>
          <Typography variant="body2" color="textSecondary">
            {task.description}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Due Date: {task.dueDate}
          </Typography>
          <div className="mt-2 flex justify-between ">
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this task?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TaskCard;