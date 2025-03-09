import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { getOneTask, putTask, deleteTask } from "../../../../connectors";
import { editTask, deleteTasks } from "../../../../stores/tasksSlice";

export default function Card({ task, handlers }) {  
  const { handleEditTask } = handlers;
  const dispatch = useDispatch();

  const handleCheck = async () => {
    try {
      const editedData = {
        title: task.title,
        priority: task.priority,
        status: !task.status,
      };

      const response = await putTask(task._id, editedData); 

      if (response.status === 200) {
        dispatch(editTask({ ...editedData, _id: task._id }));
      }
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while editing task status';
      Swal.fire({
        title: "Failed to edit task",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };

  const handleEditClick = async(taskId) => {
    try {
      const editedTask = await getOneTask(taskId);
      handleEditTask(editedTask.data.task);
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while getting data for editing';

      Swal.fire({
        title: "Failed to get task data",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };

  const handleDelete = async (taskId) => {
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
      await deleteTask(taskId);
      dispatch(deleteTasks(taskId));
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while deleting task'

      Swal.fire({
        title: "Failed to delete task",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };
  

  return (
    <div className="flex border-b-1 py-[1em] justify-between">
      <div className="flex ">
        <input
          className="w-[1em] h-[1em] self-center"
          type="checkbox"
          onChange={handleCheck}
          checked={task.status}
        />
        <p className={`ml-[0.5em] text-[1.5em] ${task.status ? "line-through" : ""}`}>
          {task.title}
        </p>
      </div>
      <div className="min-w-[64px]">
        <button
          onClick={() => handleEditClick(task._id)}
          className="ml-2 text-sm text-blue-500 rounded-sm hover:bg-blue-500 hover:text-white"
        >
          <span className="material-symbols-outlined">
            edit
          </span>
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="ml-2 text-sm text-red-500 rounded-sm hover:bg-red-500 hover:text-white"
        >
          <span className="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
  );
}
