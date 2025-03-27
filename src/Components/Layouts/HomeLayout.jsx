import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import Swal from "sweetalert2";

import { populateTasks } from "../../../stores/tasksSlice";

import { getAllTasks } from "../../../connectors";

import FilterMenu from "../Fragments/FilterMenu";
import TaskDashboard from "../Fragments/TaskDashboard";

export default function HomeLayout(){
  const filterPriority = useSelector((state) => state.filters.priority);
  const filterCategory = useSelector((state) => state.filters.category);
  const filterTask = useSelector((state) => state.filters.task);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  
  const fetchData = async() => {
    try {
      const tasksData = await getAllTasks({filterTask, filterPriority, filterCategory});
      
      dispatch(populateTasks(tasksData.data.tasks));
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while getting tasks'

      Swal.fire({
        title: "Failed to get tasks data",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  }

  const handleMenuOpen = () => {
    setMenuOpen(true);
  }

  const handleMenuClose = () => { 
    setMenuOpen(false);
  }
  
  useEffect(() => {
    fetchData();
  }, [filterPriority, filterCategory, filterTask])

  return (
    <div className="homeContainer flex w-screen h-screen">
      <div className={`absolute right-[2em] top-[2em] ${isMenuOpen ? 'hidden' : ''} xl:hidden`} >
        <span
          className="material-symbols-outlined cursor-pointer p-2 rounded-md 
          hover:bg-gray-200 active:bg-gray-300 transition-all duration-200"
          onClick={handleMenuOpen}
          >
          menu
        </span>
      </div>

      <FilterMenu isMenuOpen={isMenuOpen} handlers={{handleMenuClose}}/>
      <TaskDashboard />
    </div>
  );
}