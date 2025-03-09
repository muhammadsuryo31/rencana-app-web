import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import Swal from "sweetalert2";

import { login } from "../../../connectors";
import { login as loginReducer } from "../../../stores/loginSlice";

import InputElement from "../Elements/Input";
import SubmitElement from "../Elements/Submit";


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const loginData = { email, password };
      await login(loginData);

      localStorage.setItem('isAuthenticated', true);
      dispatch(loginReducer(email));
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      const errorReason = error?.response?.data?.error || 'error while logging in'

      Swal.fire({
        title: "Fail to login",
        text: `${errorReason}`,
        icon: "error"
      });

      setPassword('');
    }
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded mb-[0.5em]";

  return (
    <div className="w-full sm:w-4/5 md:w-3/4 pt-[1em]">
      <form onSubmit={loginHandler} className="flex flex-col">
        <InputElement
          inputId="email"
          labelTitle="Email Address"
          type="email"
          name="email"
          value={email}
          placeHolder="example@mail.com"
          inputClass={inputClass}
          changeHandler={(e) => setEmail(e.target.value)}
        />

        <InputElement
          inputId="password"
          labelTitle="Password"
          type="password"
          name="password"
          value={password}
          placeHolder="*****"
          inputClass={inputClass}
          changeHandler={(e) => setPassword(e.target.value)}
        />

        <SubmitElement buttonClass="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700" />
      </form>

      <div className="w-full pt-[0.5em]">
        <hr className="w-full" />
        <p className="pt-[0.5em]">
          Don&apos;t have an account? <Link to="/register" className="text-blue-500 font-bold">Register here!</Link>
        </p>
      </div>
    </div>
  );
}
