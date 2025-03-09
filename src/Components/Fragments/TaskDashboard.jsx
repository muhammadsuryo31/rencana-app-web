import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import Swal from "sweetalert2";

import { useSelector, useDispatch } from "react-redux"

import { getAllTasks } from "../../../connectors";
import { populateTasks } from "../../../stores/tasksSlice";

import Header from "../Elements/Header";
import TaskCard from "../Elements/Card";
import AddTask from "../Elements/AddTask";
import CreateTask from "../Elements/CreateTask";

import Modal from "./Modal";

export default function TaskDashboard() {
  const filterPriority = useSelector((state) => state.filters.priority);
  const filterCategory = useSelector((state) => state.filters.category);
  const filterTask = useSelector((state) => state.filters.task);
  const taskDues = useSelector((state) => state.filters.task);
  const tasks = useSelector((state) => state.tasks.tasks);

  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;

  const [isModal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("")
  const [dueDates, setDueDates] = useState(formattedDateTime);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [operationType, setOperationType] = useState('');

  const dispatch = useDispatch();

  const fetchData = async() => {
    try {
      const tasksData = await getAllTasks({filterTask, filterPriority, filterCategory})
      
      dispatch(populateTasks(tasksData.data.tasks));
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while getting tasks'

      Swal.fire({
        title: "Failed to get tasks data",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  };

  const handleEditTask = (taskData) => {
    try {
      const localTime = DateTime.fromISO(taskData.dueDate, { zone: "utc" }).setZone("Asia/Jakarta").toFormat("yyyy-MM-dd'T'HH:mm");
      const selectedCategories = taskData.categories.map(category => category._id)
      setModal(true);
      setOperationType('edit');
      setTaskId(taskData._id);
      setStatus(taskData.status);
      setTitle(taskData.title);
      setDescription(taskData.description);
      setPriority(taskData.priority);
      setDueDates(localTime);
      setCategories(selectedCategories);
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while editing task'

      Swal.fire({
        title: "Failed to edit task",
        text: `${errorReason}`,
        icon: "error"
      });

      
    }
    
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [filterPriority, filterCategory, filterTask])

  const handleCloseModal = () => {
    setModal(false);
    setTitle("");
    setDescription("");
    setPriority("");
    setDueDates(formattedDateTime);
    setCategories([]);
  };
  const handleOpenModal = () => {
    setModal(true);
    setOperationType('create');
  }

  const isTasksAvailable = () => tasks.length > 0 ? true : false;

  return (
    <>
    <Modal isOpen={isModal} onClose={handleCloseModal}>
      <CreateTask
        operationType={operationType}
        title={title}
        description={description}
        priority={priority}
        dueDates={dueDates}
        categories={categories}
        status={status}
        taskId={taskId}
        handlers={{
          setTitle,
          setDescription,
          setPriority,
          setDueDates,
          setCategories,
          setModal,
          fetchTask: fetchData,
          setOperationType,
          setTaskId,
          setStatus
        }}
      />
    </Modal>
    <div className="h-full grow-1 text-[1rem] p-[1em]">
      <Header taskDues={taskDues} taskLength={tasks.length} />
      <div className="h-[65%] mt-[1em] mb-[1em] flex flex-col">
        <AddTask handlers={{handleOpenModal}}/>
        <div className="h-full overflow-y-auto">
          {
            isTasksAvailable() && tasks.map((task) => {            
              return (
              <TaskCard task={task} key={task._id} handlers={{fetchTask: fetchData, handleEditTask}}/>
            )
            })
          }
        </div>
      </div>
    </div>
    </>
  )
};
