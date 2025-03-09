import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { getAllCategory, putCategory, deleteCategory } from "../../../connectors";

import { editCategories, deleteCategories, populateCategories } from "../../../stores/categoriesSlice";
import { setCategory } from "../../../stores/filtersSlice";

export default function CategoryFilter({handlers}) {
  const categories = useSelector((state) => state.categories.categories)
  const filterCategory = useSelector((state) => state.filters.category)

  const {
    setModal
  } = handlers;

  const [editingCategory, setEditingCategory] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editColor, setEditColor] = useState("#ffffff");

  const dispatch = useDispatch();

  const fetchData = async() => {
    try {
      const categoriesData = await getAllCategory();
      dispatch(populateCategories(categoriesData.data.categories));
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while retrieving category data'

      Swal.fire({
        title: "Failed to retrieve data",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  }

  const handleEditClick = (category) => {
    setEditingCategory(category._id);
    setEditTitle(category.title);
    setEditColor(category.color);
  };

  const handleDelete = async (categoryId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await deleteCategory(categoryId);
      dispatch(deleteCategories(categoryId));
      Swal.fire("Deleted!", "Your category has been deleted.", "success");
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while deleting category';

      Swal.fire({
        title: "Failed to delete category",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };

  const handleSave = async () => {
    try {
      const updatedCategory = { title: editTitle, color: editColor };
      await putCategory(editingCategory, updatedCategory);

      dispatch(editCategories({...updatedCategory, _id: editingCategory}));
      setEditTitle("")
      setEditColor("#ffffff");
      setEditingCategory(null);
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while updating category';

      Swal.fire({
        title: "Failed to update category",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };

  const handleCategoryFilter = (e) => {
    const categoryId = e._id;
    if(categoryId !== filterCategory){
      
      dispatch(setCategory(categoryId))
    }
  };

  const handleAddCategories = async() => {
    setModal(true)
  };

  const isDataReady = () => categories.length > 0;

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <>
      <div className="categories-filter h-[50%] my-[1em]">
        <div className="flex w-full justify-start items-center">
          <p className="text-[0.75em] font-normal">CATEGORIES</p>
          <button
            className="text-[0.75em] border-1 border-solid border-black mx-[0.5em] w-[5em] h-[1.5em] rounded-sm hover:bg-[black] hover:text-[white]"
            onClick={handleAddCategories}
          > + Add
          </button>
          <button
            className="text-[0.75em] border-1 border-solid border-black mx-[0.5em] w-[5em] h-[1.5em] rounded-sm hover:bg-[black] hover:text-[white]"
            onClick={() => handleCategoryFilter({ _id: 'all'})}
          > reset
          </button>
        </div>
        <div className="mt-[0.5em] flex flex-wrap h-[95%] overflow-y-auto content-start justify-start">
          {isDataReady() && categories.map((category) => (
            <div key={category._id} className="flex w-full relative">
              {editingCategory === category._id ? (
                // **Editing Mode**
                <div className="flex flex-col bg-gray-200 p-2 rounded">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border p-1 mb-1"
                  />
                  <input
                    type="color"
                    value={editColor}
                    onChange={(e) => setEditColor(e.target.value)}
                    className="border p-1"
                  />
                  <button onClick={handleSave} className="bg-blue-500 text-white p-1 mt-1 rounded">
                    Save
                  </button>
                </div>
              ) : (
                // **Normal Mode**
                <>
                  <button
                    style={{ backgroundColor: category._id === filterCategory ? 'black' : category.color, color:  category._id === filterCategory ? 'white' : 'black'}}
                    className="min-w-[5rem] max-w-[10rem] overflow-x-auto border-solid border-[black] mr-[0.5em] h-[1.5em] rounded-sm m-[0.2em] p-[0.2em]"
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category.title}
                  </button>
                  <div className="absolute right-0">
                    <button
                      onClick={() => handleEditClick(category)}
                      className="ml-2 text-sm text-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
                    >
                      <span className="material-symbols-outlined">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
                      className="ml-2 text-sm text-red-500 rounded-sm hover:bg-red-500 hover:text-white"
                    >
                      <span className="material-symbols-outlined">
                        delete
                      </span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}