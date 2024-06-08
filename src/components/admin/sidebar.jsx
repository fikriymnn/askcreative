import React from "react";
import { useState } from "react";

function Sidebar() {
  const [bar, setBar] = useState(1);
  const toggleBar = () => {
    setBar((prevBar) => (prevBar === 1 ? 0 : 1));
  };

  return (
    <div
      className={`${
        bar == 1
          ? " w-[200px] duration-100 ease-in-out"
          : " w-[80px] duration-100 ease-in-out"
      } h-screen shadow-md flex-col  bg-[#007aff]`}
    >
      <div className="w-full h-[80px] mt-10 shadow-md  bg-[#224daa] ">
        <button className="w-full h-full" onClick={toggleBar}>
          CO
        </button>
      </div>
      <button
        onClick={() => setComp(0)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>H</p> : <p className="">Homepage</p>}
      </button>
      <button
        onClick={() => setComp(1)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>A</p> : <p>About</p>}
      </button>
      <button
        onClick={() => setComp(2)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? (
          <p>S</p>
        ) : (
          <>
            <p>Services</p>
            {}
          </>
        )}
      </button>
      <button
        onClick={() => setComp(3)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>A</p> : <p>Articles</p>}
      </button>
      <button
        onClick={() => setComp(4)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>E</p> : <p>Event</p>}
      </button>
      <button
        onClick={() => setComp(5)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>PR</p> : <p>Pol and Reg</p>}
      </button>
      <button
        onClick={() => setComp(6)}
        className={`${
          bar == 1
            ? "ms-5 justify-start items-center"
            : " justify-center items-center"
        } w-full h-10 flex `}
      >
        {bar === 0 ? <p>C</p> : <p>Clients</p>}
      </button>
    </div>
  );
}

export default Sidebar;
