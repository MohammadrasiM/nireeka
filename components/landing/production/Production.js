import React from "react";
import ReactPlayer from "react-player";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import { useState } from "react";
import Styles from "./style.module.css";

import Link from "next/link";
import { Waypoint } from "react-waypoint";

function Production() {
  const [backdrop, setBackDrop] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const handleBackdrop = (id) => {
    setBackDrop(true);
    setSelectId(id);
  };
  const handleClose = () => {
    setBackDrop(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  };
  const selectComponent = () => {
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
                <h1 className="text-xl text-left md:text-2xl ">
                  CARBON FIBER TECHNOLOGY
                </h1>
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
                    className="flex flex-col justify-between md:flex-row"
                    style={{ height: "inherit" }}
                  >
                    <img
                      src="https://api.nireeka.com/images/landing/production-nireeka-prime-01.jpg"
                      alt="production"
                      className="w-full mx-auto md:w-1/2"
                    />
                    <div className="w-full px-1 md:w-1/2 md:px-8">
                      <h4 className="pt-6 text-3xl font-semibold leading-7 md:pt-1">{`Our manufacturing technology`}</h4>
                      <p className="pt-2 pb-4 text-lg leading-7">{`High tech frame to lighten the bike`}</p>
                      <h5 className="text-xl font-semibold leading-7">
                        {`How Fiber carbon utilized to make an innovative E-Bike`}
                      </h5>
                      <p className="py-8 text-lg font-light leading-8 ">
                        {` Carbon fiber is a substantial material for making
                        products first invented in 1860 to be utilized in light
                        bulbs. It made by woven filaments for aerospace purposes
                        in early 1960 and then all industries initiate using as
                        a fundamental material in high-tech products. Reason is
                        clear, along with unique and distinct appearance that's
                        nearly impossible to replicate, the strongest carbon
                        fiber is 10x stronger and 5x lighter than steel. These
                        are, altogether, reasons fiber carbon opted out by
                        Nireeka founder and designer as basic material.`}
                      </p>
                      <p className="py-4 text-lg font-light leading-8 ">
                        {`Nowadays, various types of carbon fibers are in market
                        specified for every diverse application, a complete
                        range from light usage to heavy duty. Basically, they
                        are known by number of filaments in each tow, some are
                        1k, 2k, 3k, 6k, 9k, 12k, etc. 3k means there are 3,000
                        filaments per "tow", the type is common for high-tech
                        bikes which so chosen for Nireeka as the best choice.
                        Carbon fiber needs to be combined with specified and
                        accurately calculated epoxy resin as hardener.`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
      </BlurBackdrop>
    );
  };
  //play ViewPort
  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };

  return (
    <div className="pt-8 my-12 bg-white md:my-16 ">
      <div className="flex flex-col w-full px-6 mx-auto md:flex-row md:justify-center md:w-800 md:px-2">
        <div className="flex flex-col items-center justify-center w-full mx-auto md:w-1/2">
          <div>
            {/* <h3 className="px-4 text-xl md:text-5xl"></h3> */}
            <div className=" flex max-w-[85%] justify-start w-full bg-transparent">
              <div className="relative flex flex-col justify-start text-left ">
                <p className="py-0 md:py-4 font-medium  text-transparent bg-clip-text bg-gradient-to-br whitespace-nowrap	 from-gray-200 to-gray-300 text-gray-500 text-[3rem] md:text-[4.5rem] lg:text-[6rem]">
                  PRODUCTION
                </p>
                {/* <div className="flex flex-col items-center justify-center pt-4 mx-auto text-center align-center">
              <hr className="w-full border-t border-gray-800 " />
              <hr className="w-full mt-[1px] border-t border-gray-800 " />
            </div> */}
              </div>
            </div>
            <h4 className="px-4 pt-1 text-2xl font-medium md:text-5xl md:pt-8">
              EPS molding carbon fiber in house
            </h4>
            <p className="w-full px-4 pt-4 font-light leading-7 md:pt-8 md:w-2/3">
              {`Along with unique and distinct appearance that's nearly impossible to replicate, the strongest carbon fiber is 10x stronger and 5x lighter than steel.`}
            </p>
            <div className="flex flex-row flex-wrap justify-center pt-8 transition-all ease-in md:justify-start">
              <button
                onClick={() => handleBackdrop(1)}
                className="py-1 px-1 mx-2 mt-2 bg-black rounded-full w-[160px] text-white  hover:text-black hover:border-black hover:border hover:bg-white border border-gray-50"
              >
                MORE DETAILS
              </button>
              <Link href={"/configurator/nireeka-prime"}>
                <a className="py-1 px-1 mx-2 text-center md:py-2 mt-2 bg-red-500 rounded-full w-[160px] text-white hover:border-black hover:border  hover:text-black hover:bg-white border border-gray-50">
                  BUY NOW
                </a>
              </Link>
              <Link href={"/configurator/nireeka-prime"}>
                <a className="py-1 hover:border-gray-800 hover:text-gray-800 text-center px-1 md:py-2 mx-2 mt-2 bg-transparent rounded-full w-[160px] text-gray-800 border border-gray-400">
                  Build your own
                </a>
              </Link>
            </div>
          </div>
          {selectComponent()}
        </div>
        <div className="max-w-full  md:max-w-[50%] md:py-2 h-full mx-auto mt-[50px] md:mt-[80px]">
          <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
            <div className="flex z-[9]" style={{ height: "inherit" }}>
              <ReactPlayer
                className={Styles.parentVideo}
                height="inherit"
                width={"100%"}
                url="https://api.nireeka.com/videos/lab-test-nireeka-prime.mp4"
                // controls={true}
                playing={shouldPlay}
                loop={true}
                // autoPlay={shouldPlay}
                // config={{
                //   file: {
                //     attributes: {
                //       autoPlay: shouldPlay,
                //       // muted: true,
                //       controls: true,
                //       loop: true,
                //     },
                //   },
                // }}
              />
            </div>
          </Waypoint>
        </div>
      </div>
    </div>
  );
}

export default Production;
