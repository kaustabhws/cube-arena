"use client";

import { useState } from "react";
import { MainNav } from "./main-nav";

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div>
        <button className="relative group" onClick={handleToggle}>
          <div className="relative flex items-center justify-center rounded-full border w-[50px] h-[50px] transform transition-all ring-0 ring-gray-400 hover:ring-8 ring-opacity-30 duration-200 shadow-md max-[340px]:w-[40px] max-[340px]:h-[40px]">
            <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300">
              <div
                className={`bg-white h-[2px] w-1/2 rounded transform transition-all duration-300`}
              ></div>
              <div className={`bg-white h-[1px] rounded`}></div>
              <div
                className={`bg-white h-[2px] w-1/2 rounded self-end transform transition-all duration-300`}
              ></div>
            </div>
          </div>
        </button>
      </div>
      <div>
        <div
          className={`fixed top-0 left-0 w-full h-full bg-opacity-50 z-50 ${
            open ? "block" : "hidden"
          }`}
        ></div>
        <div
          className={`fixed top-0 left-0 right-0 h-full bg-[#09090b] bg-opacity-90 z-50 transform transition-transform duration-500 ${
            open ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-6 left-4"
          >
            <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all border ring-0 ring-gray-400 hover:ring-8 ring-opacity-30 duration-200 shadow-md max-[340px]:w-[40px] max-[340px]:h-[40px]">
              <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left rotate-[42deg]"></div>
                <div className="bg-white h-[2px] w-7 transform transition-all duration-300 origin-left -rotate-[42deg]"></div>
              </div>
            </div>
          </button>
          <div className="flex flex-col items-center justify-center h-full w-full space-y-10">
            <MainNav className="flex flex-col gap-3 space-x-0 text-xl font-bold" isOpen={open} setIsOpen={setOpen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HamburgerMenu;
