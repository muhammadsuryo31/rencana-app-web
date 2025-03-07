import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categories: [] },
  reducers: {
    populateCategories: (state, action) => {
      state.categories = action.payload;
    },
    deleteCategories: (state, action) => {
      state.categories = state.categories.filter(category => category._id !== action.payload);
    },
    addCategories: (state, action) => {
      state.categories.push(action.payload);
    },
    editCategories: (state, action) => {
      const editedCategory = action.payload;
      state.categories = state.categories.map(category =>
        category._id === editedCategory._id ? { ...category, ...editedCategory } : category
      );
    }
  }
});


export const { populateCategories, deleteCategories, addCategories, editCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
