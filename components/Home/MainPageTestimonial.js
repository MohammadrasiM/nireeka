import { Carousel } from "react-responsive-carousel";
import "../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css";
import data from "./data";
import Image from "next/image";
import Link from "next/link";

export default function MainPageTestimonial() {
  return (
    <div className="mx-auto bg-white relative carousel-wrapper z-[2] pt-12 pb-28 ">
      <Carousel
        selectedItem
        showArrows={true}
        showThumbs={false}
        showIndicators
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval="5000"
        swipeable={false}
      >
        {data.map((person) => {
          const { id, image, name, sizeImage_w, sizeImage_h, quote, smallImage, company, site } =
            person;

          return (
            <div key={id} className="px-6 pt-16 lg:px-12">
              <div>
                <Image src={image} alt={name} width={sizeImage_w} height={sizeImage_h} />

                <h5 className="w-full px-2 pb-3 mx-auto text-2xl font-light pt-7 lg:px-10 lg:w-600">
                  {name}
                </h5>
                <div className="px-2 mx-auto text-sm font-light w-900 xl:px-10 xl:w-600">
                  <p className="px-6 text-gray-500 ">{quote}</p>
                </div>
                <div className="mt-5 md:flex md:items-center md:justify-center">
                  <div className="md:flex-shrink-0">
                    <div className="w-10 h-10 mx-auto rounded-full h-35 relativ">
                      <Image
                        src={smallImage}
                        alt={name}
                        width={100}
                        height={100}
                        className={"rounded-full"}
                      />
                    </div>
                  </div>
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <div className="text-base font-light text-gray-900">{company}</div>

                    <svg
                      className="hidden w-5 h-5 mx-1 text-indigo-600 md:block"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z"></path>
                    </svg>

                    <div className="text-base font-light text-gray-500 cursor-pointer">
                      <Link href={site}>
                        <a>{site}</a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
}
