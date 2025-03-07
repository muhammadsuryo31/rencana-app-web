import Label from './label';
import Input from './input';

export default function InputElement({
  inputId,
  labelTitle,
  type,
  placeHolder,
  value,
  changeHandler,
  inputClass,
  labelClass=''
}){

  return(
    <>
    <Label inputId={inputId} labelClass={labelClass}>{labelTitle}</Label>
    <Input 
      type={type} 
      placeholder={placeHolder} 
      inputId={inputId} 
      value={value}
      changeHandler={changeHandler}
      inputClass={inputClass}
      />
    </>
  )
}