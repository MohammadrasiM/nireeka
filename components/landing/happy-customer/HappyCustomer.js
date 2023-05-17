import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Styles from "./style.module.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import ReactPlayer from "react-player";
import { Waypoint } from "react-waypoint";
import { useState } from "react";
const dataImages = [
  {
    image: "https://api.nireeka.com/images/landing/testo-dave.jpg",
    title: "intro",
    description: ` I ride it to work most everyday. Often on busy roads. It’s so much fun to ride and I get compliments on it all the time.`,
    name: "Dave Williams",
    country: "United States",
  },
  {
    image: "https://api.nireeka.com/images/landing/testo-nicholas.jpg",
    title: "intro",
    description: ` Another fun afternoon. This bike is a very capable
    MTB. I managed to get my bike dirty and wet. No problems what so ever riding through
    puddles.`,
    name: "Nicholas Raftopolous",
    country: "Australia",
  },
  {
    image: "https://api.nireeka.com/images/landing/testo-rob.jpg",
    title: "intro",
    description: ` Love it! Love it! Did I say I love it? Strong,
    reliable and very reassuring. I'm just living my Nireeka.`,
    name: "Rob Wintulich",
    country: "Australia",
  },
];
function HappyCustomer() {
  //play ViewPort
  let [shouldPlay, updatePlayState] = useState(false);

  let handleEnterViewport = function () {
    updatePlayState(true);
  };
  let handleExitViewport = function () {
    updatePlayState(false);
  };
  // console.log(shouldPlay)
  return (
    <div className="md:py-20">
      {/* <div className="w-full">
        <img
          src="https://api.nireeka.com/images/landing/cover-03-nireeka-prime.jpg"
          alt="bike"
        />
        <div className="absolute z-10 flex justify-center w-full pt-12 pb-4 bg-black">
          <div className="relative flex-col justify-center ">
            <p className="text-xl font-medium text-gray-400">HAPPY CUSTOMERS</p>
            <div className="flex flex-col items-center justify-center pt-2 mx-auto text-center align-center">
              <hr className="w-1/2 border-t border-gray-400 " />
              <hr className="w-1/2 mt-[1px] border-t border-gray-400 " />
            </div>
          </div>
        </div>
      </div>
      <Swiper
        id="landingIntroduction-swiper"
        style={{ backgroundColor: "black" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {dataImages.map((item) => {
          return (
            <div key={item.id}>
              <SwiperSlide>
                <>
                  {" "}
                  <div className="relative flex justify-center w-full h-full bg-black">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-ful mt-[120px] rounded-full"
                      // objectFit="cover"
                    />
                  </div>
                  <div className="px-4 py-6 text-center bg-black">
                    <div className="flex justify-center">
                      <div>
                        <p className="inline text-3xl text-white">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                            className="inline w-5 h-5 text-white"
                            fill="currentColor"
                          >
                            <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V320 288 216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V320 288 216z" />
                          </svg>
                        </p>
                        <h3 className="inline text-sm font-light text-white">
                          {item.description}
                        </h3>
                        <p className="inline text-3xl text-white ">
                          <svg
                            className="inline w-5 h-5 pl-1 text-white"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 512"
                          >
                            <path d="M448 296c0 66.3-53.7 120-120 120h-8c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H320c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72zm-256 0c0 66.3-53.7 120-120 120H64c-17.7 0-32-14.3-32-32s14.3-32 32-32h8c30.9 0 56-25.1 56-56v-8H64c-35.3 0-64-28.7-64-64V160c0-35.3 28.7-64 64-64h64c35.3 0 64 28.7 64 64v32 32 72z" />
                          </svg>
                        </p>
                      </div>
                    </div>
                    <h3 className="py-2 text-lg font-medium text-yellow-600 ">
                      {item.name}
                    </h3>
                    <h3 className="font-medium text-white">{item.country}</h3>
                  </div>
                </>
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper> */}
      <div className="bg-white ">
        {/* <div className="absolute z-10 flex justify-center w-full pt-12 pb-4 bg-white">
          <div className="relative flex-col justify-center ">
            <p className="text-xl font-medium text-black md:text-2xl">
              WATERPROOF COMPONENTS
            </p>
            {/* <div className="flex flex-col items-center justify-center pt-2 mx-auto text-center align-center">
              <hr className="w-1/2 border-t border-black " />
              <hr className="w-1/2 mt-[1px] border-t border-black " />
            </div> */}
        {/* </div> */}
        <div className=" flex max-w-[85%] justify-center w-full mx-auto pt-6 md:pt-8 bg-transparent">
          <div className="relative flex flex-col justify-center mx-auto text-center ">
            <p className="md:py-0 py-4 font-semibold  md:font-medium  text-transparent bg-clip-text bg-gradient-to-br whitespace-nowrap	 from-gray-200 to-gray-300 text-gray-500 text-[1.4rem] md:text-[2.5rem] lg:text-[3.5rem] xl:text-[6rem]">
              WATERPROOF COMPONENTS
            </p>
            {/* <div className="flex flex-col items-center justify-center pt-4 mx-auto text-center align-center">
              <hr className="w-full border-t border-gray-800 " />
              <hr className="w-full mt-[1px] border-t border-gray-800 " />
            </div> */}
          </div>
        </div>

        {/* </div> */}
      </div>
      <div className=" max-w-[85%] h-full mx-auto ">
        <div className="pb-6 leading-7 md:pb-8">
          <h6 className="p-2 text-lg font-light">
            {`All the components have an `}
            <span className="text-2xl font-medium text-transparent text-gray-500 md:text-6xl bg-clip-text bg-gradient-to-b from-gray-200 to-gray-500">
              IP65
            </span>
            {` rating:`}
          </h6>
          <p className="pl-6 font-light">{`- Complete protection from dust, oil, and other non-corrosive material`}</p>
          <p className="pl-6 font-light">
            {`- Protection from water, up to water projected by a nozzle against enclosure from any direction`}
          </p>
        </div>
        <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
          <div className="flex pb-10 md:pb-20 " style={{ height: "inherit" }}>
            <ReactPlayer
              className={Styles.parentVideo}
              height="inherit"
              width={"100%"}
              url="https://api.nireeka.com/videos/waterproof-nireeka-prime.mp4"
              playing={shouldPlay}
              loop={true}
            />
          </div>
        </Waypoint>
      </div>
    </div>
  );
}

export default HappyCustomer;
