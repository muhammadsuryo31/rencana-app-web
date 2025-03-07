import { useDispatch, useSelector } from 'react-redux';
import { setPriority } from '../../../stores/filtersSlice';

export default function PriorityFilter({filterContents}) {
  const filterPriority = useSelector((state) => state.filters.priority)
  const dispatch = useDispatch();

  const handleFilter = (e) => {
    const clickedPriority = e;
    if(clickedPriority !== filterPriority){
      dispatch(setPriority(clickedPriority))
    }
  }

  return(
    <>
       <div className="priority-filter h-[20%] my-[1em]">
        <p className="text-[0.75em] font-normal">PRIORITY</p>
        <div className="flex flex-col justify-start pt-[0.2em]">
          {
            filterContents.map((filterContent, index) => {
              return(
                <div key={index} className="flex">
                  {
                    filterContent === 'low' ? (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      stat_minus_2
                    </span>) : filterContent === 'medium' ? (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      horizontal_rule
                    </span>) : (<span className="material-symbols-outlined font-thin pt-[0.2em]">
                      keyboard_double_arrow_up
                    </span>)
                  }
                  <button
                  onClick={() => handleFilter(filterContent)}
                  className={`
                    pl-[0.2em] w-full h-[2em] border-b-1 border-b-solid border-b-[grey] text-left mr-[0.5em]
                    ${filterPriority === filterContent ? 'bg-[black] text-[#fff] hover:bg-[black]' : 'hover:bg-[grey]'}`}
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