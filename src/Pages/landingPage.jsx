import { useState } from "react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  const [isOpen, setIsOpen] = useState(false);

  return(
    <>
    <div className="w-screen h-screen">
      <div className="nav-bar w-screen h-[12%] sticky top-0 flex p-[10px] px-[20px] items-center justify-between border-b border-[#e0e1dd]">
        <div className="title">
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
      <div className="body-section w-screen h-[88%]">
        <div className="hero-section w-full h-[30%] bg-[red]">

        </div>
        <div className="feature-section">

        </div>
      </div>
    </div>
    </>
  )
}