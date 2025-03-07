import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

import { api } from "../../utils";

import InputElement from "../Elements/Input";
import SubmitElement from "../Elements/Submit";

export default function ReverificationForm(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isDisabled =
    loading || !email || password.length < 8 || confirmPassword === "" || (confirmPassword !== "" && password !== confirmPassword);

  const emailHandler = (e) => {
    setEmail(e.target.value)
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value)
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value)
  };

  const reverifyHandler = async(e) => {
    e.preventDefault();

    if (isDisabled) {
      Swal.fire({
        icon: "error",
        title: "Missing or Incorrect Information",
        text: "Please fill in all required fields correctly.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setLoading(true);

    try {
      const userData = {
        email,
        password
      }

      await api.post('users/reverify', userData)

      Swal.fire({
        title: "reverification Success",
        text: "please check your account to verify your account",
        icon: "success"
      });

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate('/login')
    } catch (error) {
      if(error.response.data.error === 'account already verified'){
        Swal.fire({
          title: "reverification Failed",
          text: `${error.response.data.error}`,
          icon: "info"
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate('/login')
      } else {
        Swal.fire({
          title: "reverification Failed",
          text: "error while generating reverification token",
          icon: "error"
        });
      }
    }
  }

  const inputClass ="w-full p-2 border border-gray-300 rounded mb-[0.5em]";
  const buttonClass = `w-full p-3
    ${isDisabled ? "bg-gray-400 cursor-not-allowed text-[black]" : "bg-blue-600 hover:bg-blue-700 text-[white]"}`;

  return(
  <div className="w-full sm:w-4/5 md:w-3/4">
    <form onSubmit={reverifyHandler} className="flex flex-col">
      <InputElement
      inputId='email'
      labelTitle='email address'
      type='email'
      name='email'
      inputClass={inputClass}
      value={email}
      changeHandler={emailHandler}
      placeHolder='example@mail.com' />

      <InputElement
      inputId='password'
      labelTitle='password'
      type='password'
      name='password'
      inputClass={inputClass}
      value={password}
      changeHandler={passwordHandler}
      placeHolder='*****' />

      <InputElement
      inputId='confirm-password'
      labelTitle='confirm password'
      type='password'
      name='confirm-password'
      inputClass={`${inputClass} ${password !== confirmPassword ? "border-red-500" : ""}`}
      labelClass={`${password !== confirmPassword ? "text-red-500" : ""}`}
      value={confirmPassword}
      changeHandler={confirmPasswordHandler}
      placeHolder='*****' />

        <SubmitElement isDisabled={isDisabled} buttonClass={buttonClass}>
          {loading ? "Submitting..." : "Submit"}
        </SubmitElement>
    </form>
  </div>
  )
}