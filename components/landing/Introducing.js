import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Depth from "./Depth";
import DetailsIntroducing from "./DetailsIntroducing";
import ExpandList from "./ExpandList";
import Faq from "./Faq";
import FrameSize from "./FrameSize";
import Gallery from "./Gallery";
import HappyCustomer from "./happy-customer/HappyCustomer";
import Journey from "./Journey";
import Overview from "./Overview";
// import Press from "./Press";
import Production from "./production/Production";
import SliderIntroducing from "./SliderIntroducing";
import Specifications from "./Specifications";
import WhoAreWe from "./WhoAreWe";
import GirLBike from "../../public/images/landing/cover-04-nireeka-prime.jpg";
import { GetWindowSize } from "../Atoms/windowSize/GetWindowSize";
import VideoLanding from "./video-landing/VideoLanding";
import GrideGallery from "./gride-gallery/GrideGallery";
import MainPageHeader from "../Home/MainPageHeader";
import { useState } from "react";
import Review from "./Review";

function Introducing() {
  // const topRef = useRef();
  // const galleryRef = useRef();
  // const overviewRef = useRef();
  // const testimonialRef = useRef();
  // const socialRef = useRef();
  // const frameRef = useRef();
  // const aboutRef = useRef();
  // const productionRef = useRef();
  // const faqRef = useRef();

  // function handleBackClick(name) {
  //   if (name === "top") {
  //     topRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "gallery") {
  //     galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "overview") {
  //     overviewRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "testimonial") {
  //     testimonialRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "social") {
  //     socialRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "frame") {
  //     frameRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "about") {
  //     aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "production") {
  //     productionRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  //   if (name === "faq") {
  //     faqRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }

  const { height, width } = GetWindowSize();
  // dark theme header text
  const [darkHeader, setDarkHeader] = useState(false);
  //transparent color nav
  const [bgTransparent, setBgTransparent] = useState(true);

  return (
    <div>
      {/* sidebar */}
      {/* <div className=" z-[99] w-10 hidden md:flex items-center flex-col h-auto fixed right-2 top-1/3 border rounded-3xl border-gray-500 leading-6 px-2 py-4">
        <button className="py-1" onClick={() => handleBackClick("top")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M272.9 135.7C268.3 130.8 261.9 128 255.2 128C247.5 128.3 241.1 130.9 237.5 135.8l-87.25 96C143.8 238.9 142.2 249 146.1 257.7C149.9 266.4 158.5 272 167.1 272h56L224 360c0 13.25 10.75 24 24 24h16c13.25 0 23.1-10.75 23.1-24L287.1 272h56c9.531 0 18.16-5.656 22-14.38c3.811-8.75 2.092-18.91-4.377-25.91L272.9 135.7zM256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 464c-114.7 0-208-93.31-208-208S141.3 48 256 48s208 93.31 208 208S370.7 464 256 464z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("gallery")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M0 32c477.6 0 366.6 317.3 367.1 366.3L448 480h-26l-70.4-71.2c-39 4.2-124.4 34.5-214.4-37C47 300.3 52 214.7 0 32zm79.7 46c-49.7-23.5-5.2 9.2-5.2 9.2 45.2 31.2 66 73.7 90.2 119.9 31.5 60.2 79 139.7 144.2 167.7 65 28 34.2 12.5 6-8.5-28.2-21.2-68.2-87-91-130.2-31.7-60-61-118.6-144.2-158.1z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("overview")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("testimonial")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("social")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("frame")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M312 32c-13.3 0-24 10.7-24 24s10.7 24 24 24h25.7l34.6 64H222.9l-27.4-38C191 99.7 183.7 96 176 96H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h43.7l22.1 30.7-26.6 53.1c-10-2.5-20.5-3.8-31.2-3.8C57.3 224 0 281.3 0 352s57.3 128 128 128c65.3 0 119.1-48.9 127-112h49c8.5 0 16.3-4.5 20.7-11.8l84.8-143.5 21.7 40.1C402.4 276.3 384 312 384 352c0 70.7 57.3 128 128 128s128-57.3 128-128s-57.3-128-128-128c-13.5 0-26.5 2.1-38.7 6L375.4 48.8C369.8 38.4 359 32 347.2 32H312zM458.6 303.7l32.3 59.7c6.3 11.7 20.9 16 32.5 9.7s16-20.9 9.7-32.5l-32.3-59.7c3.6-.6 7.4-.9 11.2-.9c39.8 0 72 32.2 72 72s-32.2 72-72 72s-72-32.2-72-72c0-18.6 7-35.5 18.6-48.3zM133.2 368h65c-7.3 32.1-36 56-70.2 56c-39.8 0-72-32.2-72-72s32.2-72 72-72c1.7 0 3.4 .1 5.1 .2l-24.2 48.5c-9 18.1 4.1 39.4 24.3 39.4zm33.7-48l50.7-101.3 72.9 101.2-.1 .1H166.8zm90.6-128H365.9L317 274.8 257.4 192z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("about")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 496 512"
          >
            <path d="M314.9 194.4v101.4h-28.3v120.5h-77.1V295.9h-28.3V194.4c0-4.4 1.6-8.2 4.6-11.3 3.1-3.1 6.9-4.7 11.3-4.7H299c4.1 0 7.8 1.6 11.1 4.7 3.1 3.2 4.8 6.9 4.8 11.3zm-101.5-63.7c0-23.3 11.5-35 34.5-35s34.5 11.7 34.5 35c0 23-11.5 34.5-34.5 34.5s-34.5-11.5-34.5-34.5zM247.6 8C389.4 8 496 118.1 496 256c0 147.1-118.5 248-248.4 248C113.6 504 0 394.5 0 256 0 123.1 104.7 8 247.6 8zm.8 44.7C130.2 52.7 44.7 150.6 44.7 256c0 109.8 91.2 202.8 203.7 202.8 103.2 0 202.8-81.1 202.8-202.8.1-113.8-90.2-203.3-202.8-203.3z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("production")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            <path d="M32 32C14.3 32 0 46.3 0 64V304v48 80c0 26.5 21.5 48 48 48H464c26.5 0 48-21.5 48-48V304 152.2c0-18.2-19.4-29.7-35.4-21.1L320 215.4V152.2c0-18.2-19.4-29.7-35.4-21.1L128 215.4V64c0-17.7-14.3-32-32-32H32z" />
          </svg>
        </button>
        <button className="py-1" onClick={() => handleBackClick("faq")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-500 hover:text-orange-500"
            fill="currentColor"
            viewBox="0 0 320 512"
          >
            <path d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32C0 75 43 32 96 32h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5 0 18.1c0 17.7-14.3 32-32 32s-32-14.3-32-32V301.9c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z" />
          </svg>
        </button>
      </div> */}
      {/* <div>
        <div className="flex justify-center py-1 md:py-8 " ref={topRef}>
          <span className="sr-only">Nireeka</span>
          <Link href="/">
            <a>
              {" "}
              <div className="relative flex-col justify-center mx-auto"> */}
      {/* <div className="flex justify-center mx-auto"> */}
      {/* <Image
                  width={width > 768 ? 300 : 200}
                  height={width > 768 ? 100 : 75}
                  src={`https://api.nireeka.com/images/landing/logo-prime.svg`}
                  alt="prime"
                />
                </div>
               
                <div className="flex flex-col items-center justify-center pb-8 mx-auto text-center align-center">
                  <hr className="w-1/3 text-black " />
                  <hr className="w-1/3 text-black mt-[1px] " />
                </div>
                <h3 className="text-xl font-light text-gray-500">
                  Introducing the all new Nireeka Prime.
                </h3> */}
      {/* </div>
            </a>
          </Link>
        </div>
      </div> */}
      {/* <SliderIntroducing /> */}
      {/* <div ref={topRef}> */}
      <MainPageHeader
        darkHeader={darkHeader}
        className="absolute"
        bgTransparent={bgTransparent}
      />
      <div className="relative flex flex-col justify-center">
        <VideoLanding />
        <div className="absolute w-full bottom-4 md:bottom-10">
        <DetailsIntroducing />
        </div>
       
      </div>
      {/* <Press /> */}
      {/* right navigator */}
      {/* gallery */}
      {/* <div className="  w-full bg-[#181417] py-10 " ref={galleryRef}> */}
      {/* <div className="  w-full bg-[#181417] py-10 ">
        <Gallery />
      </div> */}
     
      {/* Overview */}
      {/* <div ref={overviewRef}> */}
      {/* <div>
        <Overview />
      </div> */}
      <Overview/>

      <Depth />
      {/* <Journey /> */}
      <Specifications />
      <ExpandList />

      {/* <div ref={testimonialRef}> */}
      <div>
        <HappyCustomer />
      </div>
      <div>
        <div>
          {/* <div className="sticky top-0 flex justify-center w-full h-auto">
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
          {/* <div ref={frameRef}> */}
          <div>
            <FrameSize />
          </div>
        </div>
      </div>

      {/* <div ref={aboutRef}> */}
      {/* <div>
        <WhoAreWe />
      </div> */}
       <div className="w-full ">
        <GrideGallery />
      </div>

      {/* <div ref={productionRef}> */}
      <div>
        <Production />
      </div>
      <div>
        <Review />
      </div>
      {/* <div ref={faqRef}> */}
      {/* <div>
        <Faq />
      </div> */}
    </div>
  );
}

export default Introducing;
