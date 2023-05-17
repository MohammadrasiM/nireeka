import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import Image from "next/image";
const heroStyle = {
  position: "relative",
  overflow: "hidden",
  // objectPosition: `50% 0%`,
};
export default function SlideHero({ setDarkHeader, data, getDataSlider }) {
  const { data: dataSlider } = getDataSlider;
  return (
    <div>
      <Swiper
        id="landingIntroduction-swiper-home"
        style={{ backgroundColor: "black" }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          // delay: 60000,
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{
          clickable: true,
        }}
        // modules={[Navigation, Autoplay]}
        modules={[Autoplay, Pagination]}
        // className="mySwiper"
      >
        {/* revenant */}
        <SwiperSlide>
          <div className="relative">
            <div style={heroStyle} className="hero-img">
              <Image
                src={dataSlider[1].image}
                alt={dataSlider[1].product}
                className="hero-img"
                style={{
                  objectPosition: `50% 0%`,
                }}
                loading="eager"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                quality={100}
              />
            </div>
            {/* <img
              src={dataSlider[1].image}
              alt={dataSlider[1].product}
              className="hero-img"
              style={{
                objectPosition: `50% 0%`,
              }}
              loading="lazy"
            /> */}

            <div className=" absolute bg-transparent  top-[11rem] w-full left-12 h-auto  hidden md:block ">
              <div>
                <p className="text-2xl font-light text-[#b4b4b4] ">
                  {dataSlider[1].title}
                </p>
                <p className="text-5xl font-light text-white ">
                  {dataSlider[1].product.toUpperCase()}
                </p>
                <div className="mt-8 flex">
                  <Link href={`/configurator/${dataSlider[1].slug}`} passHref>
                    <a
                      className="
                           font-medium text-sm cursor-pointer bg-white text-gray-900 hover:text-gray-300 hover:bg-nireekaBorderColor transition-all ease-in md:max-w-[10rem] lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1  py-2 w-[6rem] lg:w-24 flex items-center justify-center  rounded-lg "
                    >
                      Order Now
                    </a>
                  </Link>
                  <Link href={dataSlider[1].details_url} passHref>
                    <a
                      className="
                           font-medium ml-2 text-sm cursor-pointer bg-transparent border border-gray-200 text-white hover:text-gray-300 hover:bg-nireekaBorderColor transition-all ease-in md:max-w-[10rem] lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1  py-2 w-[6rem] lg:w-24 flex items-center justify-center  rounded-lg "
                    >
                      More info
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className=" md:hidden absolute bg-transparent lg:bg-gray-200 lg:bg-opacity-10 top-[2.7rem]  w-full lg:w-[27rem] h-auto   pt-8 ">
            <div className="flex-col justify-center lg:justify-start text-center lg:text-left lg:flex-col lg:flex text-gray-50 min-h-[520px] h-[90vh] lg:h-[63vh] lg:min-h-[490px]">
              <div className=" h-750 lg:w-full">
                <h2
                  className={`text-3xl text-2 text-white lg:text-2.75 font-exo font-extralight`}
                >
                  {dataSlider[1].product.toUpperCase()}
                </h2>
                <p className="text-white">
                  Order online now for earlybird offers
                </p>
              </div>

              <div className="flex flex-col items-center justify-center w-full mb-8 break-words bg-transparent glass text-gray-50">
                <div className="mt-8 flex">
                  <Link href={`/configurator/${dataSlider[1].slug}`} passHref>
                    <a
                      className="
                           font-medium text-sm cursor-pointer bg-white text-gray-900 hover:text-gray-300 hover:bg-nireekaBorderColor transition-all ease-in lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1 py-[7px] w-[9rem] lg:w-32 flex items-center justify-center  rounded-lg "
                    >
                      Order Now!
                    </a>
                  </Link>
                  <Link href={dataSlider[1].details_url} passHref>
                    <a
                      className="
                           font-medium text-sm cursor-pointer bg-transparent ml-2 border-gray-200 border  text-gray-100 hover:text-gray-300 hover:bg-nireekaBorderColor transition-all ease-in lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1 py-[7px] w-[9rem] lg:w-32 flex items-center justify-center  rounded-lg "
                    >
                      More info
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        {/* nyx */}
        <SwiperSlide>
          <div>
            <div style={heroStyle} className="hero-img">
              <Image
                src={dataSlider[0].image}
                alt={dataSlider[0].product}
                className="hero-img"
                style={{
                  objectPosition: `50% 0%`,
                }}
                loading="eager"
                layout="fill"
                objectFit="cover"
                objectPosition="top"
                quality={100}
              />
            </div>
            {/* <img
              src={dataSlider[0].image}
              alt={dataSlider[0].product}
              className="hero-img"
              loading="lazy"
            /> */}
            <div className=" absolute bg-transparent lg:bg-gray-200 lg:bg-opacity-10 top-[2.2rem] lg:top-[7.5rem] w-full lg:w-[27rem] lg:left-20 h-auto lg:pr-11 md:pr-0  pt-8 lg:pl-8">
              <div className="flex-col justify-center lg:justify-start text-center lg:text-left lg:flex-col lg:flex text-gray-50 min-h-[520px] h-[90vh] lg:h-[63vh] lg:min-h-[490px]">
                <div className=" h-800 lg:w-full">
                  <h2
                    className={`text-3xl text-2 lg:text-2.75 font-exo font-extralight`}
                  >
                    {dataSlider[0].product}
                  </h2>
                  <h3
                    className={`font-light justify-center lg:hidden flex text-[14px] leading-[1.2rem] pt-[10px] text-gray-300`}
                  >
                    {dataSlider[0].title}
                  </h3>
                  <div className="hidden lg:flex lg:flex-col">
                    <h3
                      className={`font-light text-[14px] leading-[1.2rem] pt-[20px] text-gray-300`}
                    >
                      {dataSlider[0].title}
                    </h3>
                    <p
                      className={`font-light text-[14px] leading-[1.2rem] pt-[25px] text-gray-300`}
                    >
                      {dataSlider[0].description}
                    </p>
                  </div>
                  <div className="hidden lg:flex lg:flex-col">
                    <p
                      className={`font-light text-[14px] leading-[1.2rem] pt-[20px] text-gray-300`}
                    >
                      Starting from
                    </p>
                    <p
                      className={`font-normal text-5xl leading-[1.2rem] pt-[25px] text-[#4ca607]`}
                    >
                      {dataSlider[0].sign}
                      {dataSlider[0].price}
                      {` *`}
                    </p>
                    <span className={`font-extralight text-[12px] pt-4`}>
                      {dataSlider[0].tag}
                    </span>
                  </div>
                </div>

                <div className="flex flex-row justify-center w-full mb-8 break-words bg-transparent lg:w-1/2 lg:ml-12 glass text-gray-50">
                  <div>
                    <Link href={`/configurator/${dataSlider[0].slug}`}>
                      <a
                        className={`font-light cursor-pointer transition-all ease-in border-nireekaBorderColor lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1 py-2 w-[9rem] lg:w-32 flex items-center justify-center mx-2 rounded-full border  bg-nireekaBorderColor hover:bg-transparent`}
                      >
                        <p className={`font-normal text-gray-300 font-inter`}>
                          Order Now
                        </p>
                      </a>
                    </Link>
                  </div>
                  <div>
                    <Link href={`/configurator/${dataSlider[0].slug}`}>
                      <a
                        className={`font-light cursor-pointer transition-all ease-in border-nireekaBorderColor lg:max-w-11.5 my-2 lg:my-0 text-center flex-auto px-1 py-2 w-[9rem] lg:w-32 flex items-center justify-center mx-2 rounded-full border hover:bg-nireekaBorderColor `}
                      >
                        <p className={`font-normal text-gray-300 font-inter`}>
                          Details
                        </p>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
