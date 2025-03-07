import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    category: "all",
    task: "today",
    priority: "medium"
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setTask: (state, action) => {
      state.task = action.payload;
    },
    setPriority: (state, action) => {
      state.priority = action.payload;
    }
  }
});

export const { setCategory, setTask, setPriority } = filtersSlice.actions;

export default filtersSlice.reducer;