export default function SelectInput({priority, inputId, labelClass="", inputClass, labelTitle, handlers}) {
  const { handlePriority } = handlers;

  return(
    <>
    <label htmlFor={inputId} className={labelClass}>{labelTitle}</label>
      <select value={priority} onChange={handlePriority} className={inputClass} id={inputId}>
        <option value="" disabled>Select a priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </>
  )
};
