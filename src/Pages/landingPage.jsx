import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"

import dashboardLaptopMode from "../assets/dashboardImage.png"
import dashboardPhoneMode from "../assets/dashboardPhoneMode.png"
import dashboardTabletMode from "../assets/dashboardTabletMode.png"

export default function LandingPage() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return(
    <>
    <div className="w-screen h-screen flex flex-col items-center">
      <div className="nav-bar w-screen mb-[64px] h-[10%] bg-[white] sticky top-0 z-10 flex p-[10px] px-[24px] items-center justify-between max-w-[1360px] border-b border-[#e5e5e5] md:border-b-[0px]">
        <div 
        onClick={() => navigate("/")}
        className="title cursor-pointer">
          <h1 className="text-2xl xl:text-3xl font-bold tracking-wide">Rencana<span className="text-red-600 text-3xl font-bold">.</span>Apps</h1>
        </div>
        <div className="action-button items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none text-2xl bg-[#e0e1dd] w-[2rem]"
          >
            {isOpen ? "✖" : "☰"}
          </button>

          <ul
            className={`absolute md:static bg-black md:bg-white md:flex md:space-x-6 text-white md:text-black text-lg xl:text-2xl left-0 w-full md:w-auto transition-all duration-300 ${
              isOpen ? "top-20 opacity-100" : "top-[-200px] opacity-0 md:opacity-100"
            }`}
          >
            <li className="p-4 md:p-0 md:font-bold active:bg-white active:text-black"><Link to="/login">login</Link></li>
            <li className="p-4 md:p-0 md:font-bold active:bg-white active:text-black"><Link to="/register">Try For Free</Link></li>
          </ul>
        </div>
      </div>
      <div className="body-section w-screen mb-[32px] max-w-[1360px]">
        <div className="hero-section px-[24px] mb-[32px] md:mx-[144px] lg:mx-[32px]">
          <div className="hero-monolog flex flex-col items-center lg:mx-[131px]">
            <h1 className="monolog-title text-4xl lg:text-5xl font-bold text-center lg:w-[500px] mb-[24px]">
              Plan, Do, and Achieve your goals.
            </h1>
            <p className="monolog-subtitle text-center text-[#778da9] text-lg lg:text-xl pb-[32px]">
            Simplify life for both you and your team with rencana apps
            </p>
            <button
            onClick={() => {navigate("/register")}}
            className="monolog-button border px-[3em] py-[1em] rounded-xl font-bold text-white text-lg bg-gradient-to-r from-red-600 to-black transition transform hover:scale-95 shadow-lg shadow-red-500/50"
            >try for free</button>
          </div>
          <div className="hero-picture mt-[32px] border h-full flex flex-col items-center">
            <img src={dashboardPhoneMode} alt="Mobile version" className="block md:hidden"/>
            <img src={dashboardTabletMode} alt="tablet version" className="hidden md:block lg:hidden"/>
            <img src={dashboardLaptopMode} alt="laptop version" className="hidden md:hidden lg:block"/>
          </div>
        </div>
        <div className="feature-section">

        </div>
      </div>
    </div>
    </>
  )
}