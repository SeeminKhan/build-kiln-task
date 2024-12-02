import TaskCard from "./TaskCard";
import { Box, Typography } from "@mui/material";

const TaskList = ({ tasks, title, onDelete }) => {
  return (
    <Box className="p-4 bg-purple-50 shadow-md rounded-md shadow-purple-100">
      <Typography variant="h6" className="mb-4 text-gray-700 font-bold">
        {title}
      </Typography>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={onDelete} />
        ))
      ) : (
        <Typography className="text-blue-600">
          No tasks available for this filter.
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
