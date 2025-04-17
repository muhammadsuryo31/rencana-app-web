import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { logout } from "../../../connectors";

import TaskFilter from "./TaskFilter";
import PriorityFilter from "./PriorityFilter";
import CategoryFilter from "./CategoryFilter";
import Modal from "./Modal";
import CreateCategory from "./CreateCategory";

export default function FilterMenu({isMenuOpen, handlers}) {
    const [isModal, setModal] = useState(false);
    const [title, setTitle] = useState("");
    const [color, setColor] = useState("#000000");

    const { handleMenuClose } = handlers;

    const navigate = useNavigate();

  const priorities = ['high', 'medium', 'low'];
  const tasksDues = ['upcoming', 'today', 'overdue'];

  const handleCloseModal = () => {
    setTitle("")
    setColor("#ffffff");
    setModal(false);
  };

  const handleLogout = async() => {
    const result = await Swal.fire({
      title: "log out",
      text: "are you sure you want to logged out?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    });

    if (!result.isConfirmed) {
      return;
    }
    try {
      await logout()
      localStorage.setItem('isAuthenticated', false);
      navigate('/login')
    } catch (error) {
      const errorResponse = error?.response?.data?.error || 'error while trying to log out'
      Swal.fire("Error!", errorResponse, "error");
    }
  };

  return(
    <div
      className={`absolute inset-0 flex lg:relative lg:p-[1em] lg:min-w-2xs lg:w-[15%]
      transition-all duration-300 ease-in-out
      ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0 pointer-events-none"} 
      lg:translate-x-0 lg:opacity-100 lg:pointer-events-auto`}
    >
      <Modal isOpen={isModal} onClose={handleCloseModal}>
        <CreateCategory title={title} color={color} handlers={{setColor, setTitle, setModal}} />
      </Modal>
      <div
        className="absolute inset-0 bg-black opacity-50 p-[1em] lg:hidden"
        onClick={handleMenuClose}
      ></div>
      <div className="min-w-3xs w-3xs lg:w-full lg:h-full max-h-screen bg-[#edf2f4] rounded-r-3xl lg:rounded-3xl p-[1em] relative">
        <h1 className="text-[1.5rem] font-bold pb-[0.2em]">Filter By:</h1>
        <hr className="outline-[grey]" />
        <div className="filter-container h-[80%]">
          <TaskFilter filterContents={tasksDues}/>
          <PriorityFilter filterContents={priorities}/>
          <CategoryFilter handlers={{setModal}} />
        </div>
        <div className="absolute bottom-0 my-[1em] flex w-[70%] h-[2em] border-b-1 border-b-solid border-b-[grey] hover:bg-[black] hover:text-[white]">
          <span className="material-symbols-outlined self-center">
            logout
          </span>
          <button className="w-full h-[2em] text-left self-center" onClick={handleLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}