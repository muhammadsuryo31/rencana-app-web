import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

import { addCategories } from "../../../stores/categoriesSlice";

import { api } from "../../utils";

import InputElement from "../Elements/Input";
import SubmitElement from "../Elements/Submit";


export default function CreateCategory({title, color, handlers}) {
  const { setTitle, setColor, setModal } = handlers;
  const dispatch = useDispatch();

  const inputClass = "mt-[0.2em] w-full border h-[1.5em] rounded-sm pl-[0.2em]";
  const submitClass = "text-[1.2rem] w-full h-[1em] border-solid border-1 border-[grey] rounded-md bg-[#fff] mt-[1em] hover:bg-[black] hover:text-[#fff]";

  const handleTitle = (e) => {
    setTitle(e.target.value)
  };

  const handleColor = (e) => {
    setColor(e.target.value)
  };

  const handleNewCategoriesSubmit = async(e) => {
    e.preventDefault();
    const newCategory = {
      title,
      color
    }
    
    try {
      const result = await api.post('categories', newCategory);

      const createdCategory = {
        _id: result.data.newCategory._id,
        color: result.data.newCategory.color,
        title: result.data.newCategory.title      
      };
      
      dispatch(addCategories(createdCategory))
      setTitle("")
      setColor("#ffffff");
      setModal(false);
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while adding new category'

      Swal.fire({
        title: "Failed to add new category",
        text: `${errorReason}`,
        icon: "error"
      });
      
    }
  };

  return(
    <div>
      <h1 className="uppercase font-bold">Create New Categories</h1>
      <form className="flex flex-col items-start w-full p-[1em]" onSubmit={handleNewCategoriesSubmit}>
        <InputElement
          inputId="title-input"
          labelTitle="title"
          type='text'
          name="title"
          value={title}
          placeHolder="personal"
          inputClass={inputClass}
          changeHandler={handleTitle}
        />
        <InputElement
          inputId="color-input"
          labelTitle="color"
          type='color'
          name="color"
          value={color}
          inputClass={inputClass}
          changeHandler={handleColor}
        />
        <SubmitElement buttonClass={submitClass}/>
      </form>
    </div>
  )
};