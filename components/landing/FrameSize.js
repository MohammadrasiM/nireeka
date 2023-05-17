import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import GirLBike from "../../public/images/landing/cover-04-nireeka-prime.jpg";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";

function FrameSize() {
  const [backdrop, setBackDrop] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const handleBackdrop = (id) => {
    setBackDrop(true);
    setSelectId(id);
  };

  const selectComponent = () => {
    const handleClose = () => {
      setBackDrop(false);
      document.getElementsByTagName("body")[0].style.overflow = "auto";
    };
    return (
      <BlurBackdrop
        isVisible={backdrop}
        onClose={() => setBackDrop(false)}
        backdropColorClass="bg-black/40"
        noXButton
        className="relative w-full mx-auto h-inherit top-7 md:max-w-6xl"
        // backdropColorClass
        customStyle={{
          width: "calc(100% - 1rem)",
          overflowY: "hidden",
        }}
      >
        {selectId === 1 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="text-xl text-left md:text-2xl ">All Specs</h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              <div className="flex justify-center h-auto pt-8">
                <div className="w-full ">
                  <div
                    className="flex justify-between"
                    style={{ height: "inherit" }}
                  >
                    <img
                      src="https://api.nireeka.com/images/landing/male&female-nireeka-prime.svg"
                      alt="Nireeka Lightweight Frame"
                      className="mx-auto "
                    />
                  </div>
                </div>
              </div>
              <p className="text-lg leading-7 text-center">{`If your height is between 5'3" (160 cm) and 6'1" (210 cm) and your leg length is between 28" (71 cm) to 32½"
            (83 cm) the bike is perfect for you.`}</p>
            </div>
          </WhiteShadowCard>
        )}
      </BlurBackdrop>
    );
  };
  return (
    <div>
      <>
        <div className="w-full py-20 mx-auto bg-black md:py-40 ">
          <div className="absolute z-10 flex justify-center w-full pb-16 bg-black">
            <div className="relative flex-col justify-center ">
              {/* <p className="text-2xl font-medium text-gray-400">
                FRAME SIZE SELECTION
              </p> */}
              <p className="font-medium px-4 text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-100 text-[2rem] lg:text-[6rem] text-gray-500 lg:whitespace-nowrap ">
                FRAME SIZE SELECTION
              </p>

              {/* <div className="flex flex-col items-center justify-center pt-4 mx-auto text-center align-center">
                <hr className="w-1/2 border-t border-gray-600 " />
                <hr className="w-1/2 mt-[1px] border-t border-gray-600  " />
              </div> */}
            </div>
          </div>
          <div className="mx-auto w-full bg-white relative z-[2] pt-28 overflow-hidden md:flex-row flex-col flex   ">
            <div className="w-full py-4 bg-black md:py-10 ">
              <div className="flex flex-col w-full px-6 md:flex-row md:justify-center md:px-2 mt-0 lg:mt-[116px]">
                <div className="flex justify-center w-full md:justify-end h-fit">
                  <img
                    src="https://api.nireeka.com/images/landing/geometry-nireeka-prime.jpg"
                    alt="prime"
                    className="w-full md:w-[85%]"
                  />
                </div>
                <div className="flex flex-col items-center justify-center w-full px-4 mx-auto ">
                  <div>
                    <p className="w-full px-4 mt-6 text-lg font-light text-white md:pt-2 md:w-2/3">
                      {`Prime is only available in one size 17". Please check the below information to see if it's suitable for you.`}
                    </p>
                    <div>
                      <p className="w-full px-4 pt-4 font-light leading-6 text-white md:w-2/3">{`Q: Is Prime suitable for you?`}</p>
                      <p className="w-full px-4 pt-1 font-light leading-8 text-white md:w-2/3">
                        {`A: If your height is between 5'3" (160 cm) and 6'9" (206 cm) and your leg length is between 28" (71 cm) to 32½" (83 cm) the bike is perfect for you.`}
                      </p>
                    </div>
                    <div>
                      <p className="w-full px-4 pt-4 font-light leading-6 text-white md:w-2/3">{`Q: Is Prime suitable for you?`}</p>
                      <p className="w-full px-4 pt-1 font-light leading-8 text-white md:w-2/3">
                        {`A: If your height is between 5'3" (160 cm) and 6'9" (206 cm) and your leg length is between 28" (71 cm) to 32½" (83 cm) the bike is perfect for you.`}
                      </p>
                    </div>
                    <div className="flex flex-row flex-wrap justify-center mt-4 transition-all ease-in md:justify-start">
                      <button
                        onClick={() => handleBackdrop(1)}
                        className="py-1 px-1 mx-2 mt-2 md:py-2 bg-transparent rounded-full w-[160px] text-white hover:text-black hover:bg-white border border-gray-50"
                      >
                        MORE DETAILS
                      </button>
                      <Link href={"/configurator"}>
                        <a className="flex justify-center w-[160px] md:py-2 py-1 px-1 mx-2 mt-2 font-medium text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black">
                          BUY NOW
                        </a>
                      </Link>
                      <button className="py-1 px-1  md:py-2 mx-2 mt-2 bg-gray-200 rounded-full w-[160px] text-gray-800 hover:text-gray-600 hover:bg-white border border-gray-50">
                        <Link href={"/configurator/nireeka-prime"}>
                          Build your own
                        </Link>
                      </button>
                      {/* <Link href={"/configurator/nireeka-prime"}>
                        <a className="py-1 px-1 text-center mx-2 mt-2 bg-red-600 rounded-full w-[160px] text-white hover:text-black hover:bg-white">
                          BUY NOW
                        </a>
                      </Link> */}
                      {/* <div className="flex flex-row flex-wrap justify-center transition-all ease-in">
                        <Link href={"/configurator"}>
                          <a className="flex justify-center w-[160px] py-1 px-1 mx-4 mt-2 font-medium text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black">
                            BUY NOW
                          </a>
                        </Link>
                        <button className="py-1 px-1 mx-2 mt-2 bg-transparent rounded-full w-[160px] text-white hover:text-black hover:bg-white border border-gray-50">
                          <Link href={"/configurator/nireeka-prime"}>
                            Build your own
                          </Link>
                        </button>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[90%] flex justify-center mx-auto">
                <p className="px-4 mt-12 font-light leading-8 text-white ">
                  What is standover height? <br />
                  {`Standover height is the distance from the ground to the top of
                  the top tube. In male Mtb bikes, it usually is higher than the
                  female versions. Prime gives you a combination of both at the
                  same time so it's also very easy for females to ride without
                  sacrificing the design.`}
                </p>
              </div>
            </div>
          </div>
          <div className="flex relative z-[2] justify-center w-full bg-black">
            <img
              src="https://api.nireeka.com/images/landing/standover-nireeka-prime.jpg"
              alt="bike"
              className="md:w-[50%] w-[75%] pt-20"
            />
          </div>
        </div>
        {selectComponent()}
      </>
    </div>
  );
}

export default FrameSize;
