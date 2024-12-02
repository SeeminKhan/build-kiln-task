import { Button, Box, Typography } from "@mui/material";

const TaskFilters = ({ activeFilter, setFilter }) => {
  const filters = ["All", "Completed", "Pending", "Overdue"];

  return (
    <Box className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-md shadow-md shadow-gray-100">
      <Typography variant="h6" className="w-full mb-2 text-fuchsia-700">
        Filter Tasks
      </Typography>
      {filters.map((filter) => (
        <Button
          key={filter}
          variant={activeFilter === filter ? "contained" : "outlined"}
          color="secondary"
          className={`capitalize ${
            activeFilter === filter ? "bg-fuchsia-500 text-white" : ""
          }`}
          onClick={() => setFilter(filter)}
        >
          {filter}
        </Button>
      ))}
    </Box>
  );
};

export default TaskFilters;
