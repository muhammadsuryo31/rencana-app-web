export default function AddTask({handlers}) {
  const { handleOpenModal } = handlers
  const style = {
    container: {
      normal: "flex text-[grey] w-[15%] min-w-[150px] border border-[grey] border-solid p-[0.2em] rounded-sm justify-center items-center cursor-pointer",
      hover: "hover:bg-[black] hover:text-[white]"
    }
  };

  const handleAddTask = () => {
    handleOpenModal();
  };

  return (
    <div
      className={`${style.container.normal} ${style.container.hover}`}
      onClick={handleAddTask}
    >
      <span className="material-symbols-outlined text-inherit">
        add
      </span>
      <p className="text-[1rem] text-inherit">Add New Task</p>
    </div>
  );
}
