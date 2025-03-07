import { createSlice } from "@reduxjs/toolkit";

const tasksSlice = createSlice({
  name: "tasks",
  initialState: { tasks: [] },
  reducers: {
    populateTasks: (state, action) => {
      state.tasks = action.payload;
    },
    deleteTasks: (state, action) => {
      state.tasks = state.tasks.filter(task => task._id !== action.payload);
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    editTask: (state, action) => {
      const updatedTask = action.payload;
      state.tasks = state.tasks.map(task =>
        task._id === updatedTask._id ? updatedTask : task
      );
    }
  }
});

export const { populateTasks, deleteTasks, addTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
