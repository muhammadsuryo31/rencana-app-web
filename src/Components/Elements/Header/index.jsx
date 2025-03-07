import HeaderTitle from "./title"
import TaskCount from "./taskCount"

export default function Header({taskDues, taskLength}){

  return(
    <div className="flex">
      <HeaderTitle taskDues={taskDues} />
      <TaskCount taskLength={taskLength} />
    </div>
  )
};
