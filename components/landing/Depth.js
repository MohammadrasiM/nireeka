import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import GirLBike from "../../public/images/backgrounds/cover-01-nireeka-prime.webp";

function Depth() {
  const [show, setShow] = useState(null);
  const handleShow = (id) => {
    console.log(id);

    setShow(id);
    if (show === id) {
      setShow(null);
    }
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      {" "}
      {/* <div className="sticky top-0 flex justify-center w-full">
        <div>
          <Image
            src={GirLBike}
            width="2500"
            height="1500"
            objectFit="cover"
            className="w-full h-auto "
            alt="Nireeka Prime"
          />
        </div>
      </div> */}
      <div className="hidden w-full mx-auto bg-transparent md:block ">
        <div className="mx-auto bg-white relative z-[2] pt-12  overflow-hidden md:flex hidden  ">
          {/* //backdrop */}
          {show === 1 ||
          show === 2 ||
          show === 3 ||
          show === 4 ||
          show === 5 ||
          show === 6 ||
          show === 7 ? (
            <div
              className="bg-gray-100 top-0 right-0 opacity-20 z-10 fixed w-full h-[100vh]"
              onClick={handleClose}
            />
          ) : null}
          <div className="relative mx-auto flex justify-center w-[1200px] ">
            <div className="absolute -z-[1] flex justify-center w-full md:-mt-[50px] lg:-mt-[80px] py-2 bg-transparent">
              <div className="relative flex flex-col justify-center mx-auto text-center ">
                <p className=" font-medium  text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-100 text-gray-200 md:text-[6rem] lg:text-[8rem]">
                  PRIME IN DEPTH
                </p>
                {/* <div className="flex flex-col items-center justify-center pt-4 mx-auto text-center align-center">
              <hr className="w-full border-t border-gray-800 " />
              <hr className="w-full mt-[1px] border-t border-gray-800 " />
            </div> */}
              </div>
            </div>
            <img
              src="../../../images/prime/poi-nireeka-primee.png"
              alt="Nireeka Prime"
            />

            {/* Smart digital display */}
            <div className="absolute top-25 top-[4%] left-[37.5%] z-20">
              <button onClick={() => handleShow(1)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 1 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 1 && "bg-gray-400"
                      }`}
                    >
                      {show === 1 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 1 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  Smart digital display
                </div>
              )}
            </div>
            {/* id 2  Super light carbon fiber fork*/}
            <div className="absolute top-25 top-[22%] left-[34%] z-20">
              <button onClick={() => handleShow(2)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 2 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 2 && "bg-gray-400"
                      }`}
                    >
                      {show === 2 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 2 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  Super light carbon fiber fork
                </div>
              )}
            </div>
            {/* id 3  LG Li-ion battery cells*/}
            <div className="absolute top-25 top-[32%] left-[44.5%] z-20">
              <button onClick={() => handleShow(3)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 3 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 3 && "bg-gray-400"
                      }`}
                    >
                      {show === 3 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 3 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  {`LG Li-ion battery cells`}
                </div>
              )}
            </div>
            {/* id 4  Poweful mid-drive Bafang motor*/}
            <div className="absolute top-25 top-[49%] left-[51.5%] z-20">
              <button onClick={() => handleShow(4)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 4 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 4 && "bg-gray-400"
                      }`}
                    >
                      {show === 4 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 4 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  {`Powerful mid-drive Bafang motor`}
                </div>
              )}
            </div>
            {/* id 5  Shimano Deore cassette*/}
            <div className="absolute top-25 top-[47%] left-[69.5%] z-20">
              <button onClick={() => handleShow(5)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 5 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 5 && "bg-gray-400"
                      }`}
                    >
                      {show === 5 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 5 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  {`Shimano Deore cassette`}
                </div>
              )}
            </div>
            {/* id 6  All-terrain 26”x4” tires*/}
            <div className="absolute top-25 top-[28%] left-[73%] z-20">
              <button onClick={() => handleShow(6)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 6 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 6 && "bg-gray-400"
                      }`}
                    >
                      {show === 6 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 6 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  {`All-terrain 26”x4” tires`}
                </div>
              )}
            </div>
            {/* id 7  Smart Taillight*/}
            <div className="absolute top-25 top-[14%] left-[62%] z-20">
              <button onClick={() => handleShow(7)}>
                <>
                  <span className="absolute flex w-8 h-10">
                    <span
                      className={`absolute inline-flex w-6 h-6 bg-red-400 rounded-full opacity-75 animate-ping ${
                        show === 7 && "bg-gray-400"
                      }`}
                    ></span>

                    <span
                      className={`relative inline-flex w-6 h-6 text-lg text-white bg-red-500 rounded-full ${
                        show === 7 && "bg-gray-400"
                      }`}
                    >
                      {show === 7 ? (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all  rotate-45 `}
                        >
                          {`+`}
                        </div>
                      ) : (
                        <div
                          className={` absolute text-3xl font-light -top-[6.90px] left-[3px] ease-in transition-all `}
                        >
                          {`+`}
                        </div>
                      )}
                    </span>
                  </span>
                </>
              </button>
              {show === 7 && (
                <div className=" bg-white flex items-center justify-center mx-auto text-center rounded-lg shadow-md w-[200px] h-[100px] right-[3px] absolute font-light text-xl p-4 my-auto z-[40]">
                  {`Smart Taillight`}
                </div>
              )}
            </div>
            <p className="absolute text-black bottom-5">
              Options might vary depending on the model you select.
            </p>
            {/* <Link href={"/configurator/nireeka-prime"}>
              <a className="absolute flex justify-center w-40 p-2 mx-auto font-medium text-center text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black -bottom-10 ">
                BUY NOW
              </a>
            </Link> */}
          </div>
        </div>
        <div className="flex w-full mx-auto justify-center -mt-3 z-[2] pb-20">
          <div className="flex justify-center w-[90%] md:w-[340px]">
            <Link href={"/configurator"}>
              <a className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-red-500 rounded-full md:w-40 hover:bg-white hover:outline-gray-300  hover:text-black">
                BUY NOW
              </a>
            </Link>
            <Link href={"/configurator/nireeka-prime"}>
              <a className="flex mx-0.5 justify-center border border-gray-300 w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium transition-all ease-in  bg-transparent rounded-full md:w-40 hover:border-gray-900   text-gray-700">
                Build your own
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Depth;
