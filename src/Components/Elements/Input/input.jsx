export default function Input(
  {
    type='text',
    placeholder='',
    inputId='',
    name='',
    value='',
    inputClass,
    changeHandler=() => {}
  }){
  return(
    <>
    <input
      type={type}
      placeholder={placeholder}
      id={inputId}
      name={name}
      value={value}
      className={inputClass}
      onChange={changeHandler}
      />
    </>
  )
}