import Button from "./button";
export default function SubmitElement({buttonClass, isDisabled= false}){
  return(
    <>
      <Button isDisabled={isDisabled} buttonClass={buttonClass}>Submit</Button>
    </>
  )
}