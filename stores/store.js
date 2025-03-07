import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./loginSlice";
import tasksReducer from "./tasksSlice";
import categoriesReducer from "./categoriesSlice";
import filtersReducer from "./filtersSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    tasks: tasksReducer,
    categories: categoriesReducer,
    filters: filtersReducer
  },
});

export default store;
