export default function Button({children, buttonClass, isDisabled}){

  return(
    <>
      <button disabled={isDisabled} type='submit' className={buttonClass}>{children}</button>
    </>
  )
}