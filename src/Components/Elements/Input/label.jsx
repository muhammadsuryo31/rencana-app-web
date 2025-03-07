export default function Label({inputId="", children="", labelClass=""}){
  return(
    <>
    <label htmlFor={inputId} className={labelClass}>{children}</label>
    </>
  )
}