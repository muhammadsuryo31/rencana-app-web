import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import './AuthLayout.css'

export default function AuthLayout({ title, children }) {
  const texts = ["Plan it", "Do it", "Achieve it"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let typingSpeed = isDeleting ? 50 : Math.random() * 150 + 50;

    const timeout = setTimeout(() => {
      setText(currentText.substring(0, charIndex + (isDeleting ? -1 : 1)));
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index]);

  return (
    <div className="w-screen h-screen flex flex-col justify-start md:flex-row">
      {/* form */}
      <div className="flex flex-col order-2 md:order-1 items-center justify-start md:justify-center h-[75%] sm:h-[65%] md:h-full w-full md:w-1/3 min-w-[300px] px-[1em] md:px-0 mt-[1em]">
        <h1 className="text-2xl lg:text-3xl font-medium text-black">{title}</h1>
        {children}
      </div>

      {/* Greeting */}
      <div className="greeting-section flex flex-col order-1 md:order-2 h-[25%] sm:h-[35%] md:h-full self-center justify-start sm:justify-center w-full sm:w-4/5 md:w-2/3 bg-cover md:bg-contain xl:bg-cover md:bg-no-repeat bg-right pt-4 px-4 relative scale-x-[-1]">
        <h1 className="uppercase font-extrabold text-3xl lg:text-5xl md:text-4xl sm:text-3xl scale-x-[-1]">
          Rencana
        </h1>
        <h2 className="uppercase font-normal text-1xl lg:text-3xl md:text-2xl sm:text-xl h-[2rem] scale-x-[-1]">
          {text}
        </h2>
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element
};
