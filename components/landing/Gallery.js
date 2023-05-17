import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";
import ReactPlayer from "react-player";
import { GetWindowSize } from "../Atoms/windowSize/GetWindowSize";
const gallery = [
  {
    type: "video",
    id: 1,
    name: "nireeka-prime",
    video: "https://youtu.be/ohKhrea5bbo",
    href: "https://api.nireeka.com/images/landing/video-cover-nireeka-prime.jpg",
  },
  {
    id: 2,
    name: "nireeka-prime",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-03-nireeka-prime.jpg",
  },
  {
    id: 4,
    name: "prime-2",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-02-nireeka-prime.jpg",
  },
  {
    id: 5,
    name: "prime-3",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-07-nireeka-prime.jpg",
  },
  {
    id: 6,
    name: "prime-4",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-04-nireeka-prime.jpg",
  },
  {
    id: 7,
    name: "prime-5",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-06-nireeka-prime.jpg",
  },
  {
    id: 8,
    name: "prime-6",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-05-nireeka-prime.jpg",
  },
  {
    id: 9,
    name: "prime-7",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-01-nireeka-prime.jpg",
  },
  {
    id: 10,
    name: "prime-8",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-08-nireeka-prime.jpg",
  },
  {
    id: 11,
    name: "prime-9",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-09-nireeka-prime.jpg",
  },
  {
    id: 12,
    name: "prime-10",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-10-nireeka-prime.jpg",
  },
  {
    id: 13,
    name: "prime-11",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-11-nireeka-prime.jpg",
  },
  {
    id: 13,
    name: "prime-12",
    href: "https://api.nireeka.com/images/landing/gallery/gallery-slide-12-nireeka-prime.jpg",
  },
];

export default function Gallery() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { height, width } = GetWindowSize();
  return (
    <div>
      <div className="flex w-full bg-[#181417] py-2 md:py-10 justify-center">
        <div className="relative flex-col justify-center ">
          <p className="text-white">GALLERY</p>
          <div className="flex flex-col items-center justify-center pt-6 mx-auto text-center align-center">
            <hr className="w-full text-black " />
            <hr className="w-full text-black mt-[1px] " />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full">
        {" "}
        <div className="bg-black md:w-3/5 w-full">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            // autoplay={{
            //     delay: 4500,
            //     disableOnInteraction: false,
            //   }}
            spaceBetween={width > 768 ? 10 : 4}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {gallery.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  {item.type === "video" ? (
                    <div className="h-auto" key={item.id}>
                      <div className="w-full h-full fixed ">
                        <div className="flex" style={{ height: "inherit" }}>
                          <ReactPlayer
                            height="inherit"
                            width={"100%"}
                            url={item.video}
                            controls={true}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img src={item.href} alt={item.name} key={item.id} />
                  )}
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={3}
            slidesPerView={width > 768 ? 14 : 3}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {gallery.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <img src={item.href} alt={item.name} key={item.id} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
