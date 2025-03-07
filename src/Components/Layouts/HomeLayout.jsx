import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux';

import { populateTasks } from "../../../stores/tasksSlice";

import { api } from "../../utils"

import FilterMenu from "../Fragments/FilterMenu";
import TaskDashboard from "../Fragments/taskDashboard";

export default function HomeLayout(){
  const filterPriority = useSelector((state) => state.filters.priority);
  const filterCategory = useSelector((state) => state.filters.category);
  const filterTask = useSelector((state) => state.filters.task);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  
  const fetchData = async() => {
    try {
      const query = `tasks?task=${filterTask}&priority=${filterPriority}&category=${filterCategory}`;
      const tasksData = await api.get(query);
      
      dispatch(populateTasks(tasksData.data.tasks));
    } catch (error) {
      console.log('error when get data', error);
    }
  }

  const handleMenuOpen = () => {
    setMenuOpen(true)
  }

  const handleMenuClose = () => {
    console.log('masuk sini');
    
    setMenuOpen(false)
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