import { useDispatch, useSelector } from 'react-redux';
import { setTask } from '../../../stores/filtersSlice';

export default function TaskFilter({ filterContents}) {
  const filterTask = useSelector((state) => state.filters.task);
  const dispatch = useDispatch();

    const handleFilter = (e) => {
      const clickedTask = e;
      if(clickedTask !== filterTask){
        dispatch(setTask(clickedTask))
      }
    }

  return(
    <>
      <div className="time-filter h-[20%] my-[1em]">
        <p className="text-[0.75em] font-normal">Tasks</p>
        <div className="flex flex-col justify-start pt-[0.2em]">
          {
            filterContents.map((filterContent, index) => {
              return(
                <div key={index} className="flex">
                  {
                    filterContent === 'overdue' ? (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      hourglass_bottom
                    </span>) : filterContent === 'today' ? (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      sunny
                    </span>) : (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      double_arrow
                    </span>)
                  }
                  <button
                  onClick={() => handleFilter(filterContent)}
                  className={`
                    pl-[0.2em] w-full h-[2em] border-b-1 border-b-solid border-b-[grey] text-left mr-[0.5em]
                    ${filterTask === filterContent ? 'bg-[black] text-[#fff] hover:bg-[black]' : 'hover:bg-[grey]'}`}
                  >{filterContent}</button>
                </div>
              )
            })
          }
        </div>
      </div>
    </>
  )
}