import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Image from "next/image";
import { GetWindowSize } from "../Atoms/windowSize/GetWindowSize";
const dataImages = [
  {
    id: 1,
    image:
      "https://api.nireeka.com/images/landing/intro-nireeka-prime-cover-01.jpg",
    image_mobile:
      "../../../images/landing/intro-nireeka-prime-cover-01.jpg",
    title: "intro",
  },
  {
    id: 2,
    image:
      "https://api.nireeka.com/images/landing/intro-nireeka-prime-cover-02.jpg",
    image_mobile:
      "../../../images/landing/intro-nireeka-prime-cover-02.jpg",
    title: "intro-2",
  },
  {
    id: 3,
    image:
      "https://api.nireeka.com/images/landing/intro-nireeka-prime-cover-03.jpg",
    image_mobile:
      "../../../images/landing/intro-nireeka-prime-cover-03.jpg",
    title: "intro-3",
  },
  {
    id: 4,
    image:
      "https://api.nireeka.com/images/landing/intro-nireeka-prime-cover-04.jpg",
    image_mobile:
      "../../../images/landing/intro-nireeka-prime-cover-04.jpg",
    title: "intro-4",
  },
];

export default function SliderIntroducing() {
  const { height, width } = GetWindowSize();
  return (
    <>
      <Swiper
        id="landingIntroduction-swiper"
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {dataImages.map((item) => {
          return (
            <>
              {width > 768 ? (
                <SwiperSlide>
                  <div
                    className="relative flex justify-center w-full h-full"
                    key={item.id}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-ful"
                      // objectFit="cover"
                    />
                  </div>
                </SwiperSlide>
              ) : (
                <SwiperSlide>
                  <div
                    className="relative flex justify-center w-full h-full"
                    key={item.id}
                  >
                    <img
                      src={item.image_mobile}
                      alt={item.title}
                      className="w-full h-full"
                      // objectFit="contain"
                    />
                  </div>
                </SwiperSlide>
              )}
            </>
          );
        })}
      </Swiper>
    </>
  );
}
