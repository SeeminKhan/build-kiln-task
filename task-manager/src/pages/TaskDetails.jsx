import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const TaskDetails = () => {
  const { id } = useParams(); // Get the task ID from the URL
  const navigate = useNavigate();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  if (!task)
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-center text-red-500 text-xl">Task not found!</div>
      </div>
    );

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-96 bg-purple-50 shadow-md shadow-purple-100">
        <CardContent>
          <Typography variant="h5" component="div" className="mb-4">
            {task.title}
          </Typography>
          <Typography variant="body1" className="mb-4">
            {task.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Due Date: {task.dueDate}
          </Typography>
        </CardContent>
        <div className="flex justify-between p-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate(`/tasks/${task.id}/edit`)} // Corrected the path
          >
            Edit
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TaskDetails;
