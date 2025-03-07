import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import InputElement from "../Elements/Input";
import SubmitElement from "../Elements/Submit";

import { register } from "../../../connectors";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const emailHandler = (e) => setEmail(e.target.value);
  const firstNameHandler = (e) => setFirstName(e.target.value);
  const lastNameHandler = (e) => setLastName(e.target.value);
  const passwordHandler = (e) => setPassword(e.target.value);
  const confirmPasswordHandler = (e) => setConfirmPassword(e.target.value);

  const isDisabled =
    loading || !email || !firstName || password.length < 8 || confirmPassword === "" || (confirmPassword !== "" && password !== confirmPassword);

  const registerHandler = async (e) => {
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
      const newUser = { email, firstName, lastName, password };

      await register(newUser);

      Swal.fire({
        title: "Register Success",
        text: "Please check your email to verify your account.",
        icon: "success",
      });

      navigate("/login");
    } catch (error) {
      console.error("Error while registering user", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setLoading(false);
    }
  };

  const inputClass ="w-full p-2 border border-gray-300 rounded mb-[0.5em]";
  const buttonClass = `w-full p-3
    ${isDisabled ? "bg-gray-400 cursor-not-allowed text-[black]" : "bg-blue-600 hover:bg-blue-700 text-[white]"}`;

  return (
    <div className="w-full sm:w-4/5 md:w-3/4">
      <form onSubmit={registerHandler} className="flex flex-col">
        <InputElement
          inputId="email"
          labelTitle="Email Address"
          type="email"
          name="email"
          inputClass={inputClass}
          value={email}
          changeHandler={emailHandler}
          placeHolder="example@mail.com"
        />

        <InputElement
          inputId="firstName"
          labelTitle="First Name"
          type="text"
          name="firstName"
          inputClass={inputClass}
          value={firstName}
          changeHandler={firstNameHandler}
          placeHolder="John"
        />

        <InputElement
          inputId="lastName"
          labelTitle="Last Name"
          type="text"
          name="lastName"
          inputClass={inputClass}
          value={lastName}
          changeHandler={lastNameHandler}
          placeHolder="Doe"
        />

        <InputElement
          inputId="password"
          labelTitle="Password"
          type="password"
          name="password"
          inputClass={inputClass}
          value={password}
          changeHandler={passwordHandler}
          placeHolder="********"
        />

        <InputElement
          inputId="confirm-password"
          labelTitle="Confirm Password"
          type="password"
          name="confirm-password"
          inputClass={`${inputClass} ${password !== confirmPassword ? "border-red-500" : ""}`}
          labelClass={`${password !== confirmPassword ? "text-red-500" : ""}`}
          value={confirmPassword}
          changeHandler={confirmPasswordHandler}
          placeHolder="********"
        />

        <SubmitElement isDisabled={isDisabled} buttonClass={buttonClass}>
          {loading ? "Registering..." : "Register"}
        </SubmitElement>
      </form>

      <div className="w-full pt-[0.5em]">
        <hr className="w-full" />
        <p className="pt-[0.5em]">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 font-bold">
            Log in here!
          </Link>
        </p>
      </div>
    </div>
  );
}
