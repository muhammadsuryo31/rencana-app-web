import { useSelector } from "react-redux";
import Swal from "sweetalert2";

import { api } from "../../../utils";

import InputElement from "../Input"
import SelectInput from "../SelectInput";
import SubmitElement from "../Submit"

export default function CreateTask({operationType, title, taskId, description, priority, dueDates, categories, status, handlers}){
  const now = new Date();
  const yyyy = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");

  const formattedDateTime = `${yyyy}-${MM}-${dd}T${hh}:${mm}`;

  const categoryList = useSelector((state) => state.categories.categories);

  const { setTitle, setDescription, setPriority, setDueDates, setCategories, setModal, fetchTask, setOperationType, setTaskId, setStatus } = handlers;

  const handleNewTaskSubmit = async(e) => {
    e.preventDefault();
    try {
      const newTask = {
        title,
        description,
        priority,
        dueDate: dueDates,
        status,
        categories
      }
      
      if(operationType === 'create'){
        await api.post('tasks', newTask);
      } else if(operationType === 'edit'){
        await api.put(`tasks/${taskId}`, newTask);
      }
      setModal(false)

      setTitle("");
      setDescription("");
      setPriority("");
      setDueDates(formattedDateTime);
      setCategories([]);
      setOperationType("");
      setTaskId("");
      setStatus(false);

      await fetchTask();
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while adding data'

      Swal.fire({
        title: "Failed to add data",
        text: `${errorReason}`,
        icon: "error"
      });
    }
  }

  const handleTitle = (e) => {
    const value = e.target.value
    setTitle(value)
  }
  const handleDescription = (e) => {
    const value = e.target.value
    setDescription(value)
  }
  const handlePriority = (e) => {
    const value = e.target.value
    setPriority(value)
  }
  const handleDueDates = (e) => {
    const value = e.target.value
    setDueDates(value)
  }
  const handleCategories = (categoryObj) => {
    const addedCategories = [...categories];
    
    const existingIndex = addedCategories.indexOf(categoryObj._id);

    if (existingIndex !== -1) {
      addedCategories.splice(existingIndex, 1);
      setCategories(addedCategories);
    } else {
      addedCategories.push(categoryObj._id);
      setCategories(addedCategories);
    }
  }

  const inputClass = "w-full border h-[1.5em] rounded-sm pl-[0.2em]";
  const labelClass = "mt-[0.5em] capitalize";
  const submitClass = "text-[1.2rem] w-full h-[1em] border-solid border-1 border-[grey] rounded-md bg-[#fff] mt-[1em] hover:bg-[black] hover:text-[#fff]";

  return(
    <div>
      <h1 className="uppercase font-bold">Create New Task</h1>
      <form className="flex flex-col items-start w-full p-[1em]" onSubmit={handleNewTaskSubmit}>
        <InputElement
          inputId="title-input"
          labelTitle="title"
          type='text'
          name="title"
          value={title}
          placeHolder="personal"
          inputClass={inputClass}
          labelClass={labelClass}
          changeHandler={handleTitle}
        />
        <InputElement
          inputId="desciption-input"
          labelTitle="description"
          type='text'
          name="description"
          value={description}
          inputClass={inputClass}
          labelClass={labelClass}
          changeHandler={handleDescription}
        />
        <SelectInput
          inputId="priority-input"
          labelTitle="priority"
          priority={priority}
          inputClass={inputClass}
          labelClass={labelClass}
          handlers={{handlePriority}}
        />
        <InputElement
          inputId="due-dates-input"
          labelTitle="Due Dates"
          type='datetime-local'
          name="due-dates"
          value={dueDates}
          inputClass={inputClass}
          labelClass={labelClass}
          changeHandler={handleDueDates}
        />
          <label htmlFor="category-input" className={labelClass}>categories</label>
        <div className="w-full h-[8em] bg-gray-200 border-1 border-solid border-black">
          {
            categoryList.map((category) => (
              <button
                type="button"
                key={category._id}
                className={`min-w-[5rem] max-w-[10rem] overflow-x-auto mr-[0.5em] h-[1.5em] rounded-sm m-[0.2em] p-[0.2em]
                  ${categories.includes(category._id) ? 'bg-black text-white' : 'text-black'}`}
                style={{
                  backgroundColor: categories.includes(category._id) ? "black" : category.color,
                }}
                onClick={() => handleCategories(category)}
              >
                {category.title}
              </button>
            ))
          }
        </div>
        <SubmitElement buttonClass={submitClass}/>
      </form>
    </div>
  )
}