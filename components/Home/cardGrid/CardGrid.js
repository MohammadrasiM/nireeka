import Link from "next/link";
import React, { useEffect } from "react";
import Styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getStatisticsPending } from "app/store/homePageSlice";
import helmetImage from "../../../public/images/card-home/helmet_new.webp";
import forumsImage from "../../../public/images/card-home/forums_new.webp";
import motorsImage from "../../../public/images/card-home/motor_new.webp";
import dashboardImage from "../../../public/images/card-home/dashboard_new.webp";
import primeNew from "../../../public/images/card-home/prime_new.webp";
import Image from "next/image";
const productStyles = {
  position: "relative",
  overflow: "hidden",

  // "@media (max-width: 900px)": {
  //   height: "6rem",
  //   width: "6rem",
  // },
};
function CardGrid() {
  const dispatch = useDispatch();
  const statistics = useSelector((state) => state?.homePage?.statistics);

  useEffect(() => {
    dispatch(getStatisticsPending());
  }, []);

  return (
    <div className="">
      <div className="mx-auto max-w-8xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:mt-0 ">
          <Link passHref href="/configurator">
            <a className={`${Styles.cardZoom} w-full h-full  cursor-pointer`}>
              <div
                style={productStyles}
                className="h-full min-h-[350px] min-w-[350px]  w-full"
              >
                {/* <img
                src="../../../images/card-home/prime_new.webp"
                className={`${Styles.cardZoomImage} h-full xl:min-h-[670px] w-full`}
                alt="bikes"
              /> */}
                <Image
                  src={primeNew}
                  alt="prime"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="right"
                  // loading="eager"
                  priority={true}
                  className={`${Styles.cardZoomImage} h-full xl:min-h-[670px] w-full`}
                />
              </div>
              <div
                className={`${Styles.cardZoomText} absolute top-0 md:top-2 left-0 md:left-[8.25%] w-full`}
              >
                <h2
                  className={`${Styles.inverted} font-light text-2xl w-fit px-1 text-[#222222] font-hind`}
                >
                  E-bike
                </h2>
                <p className="text-[0.75rem] font-medium text-[#999999] px-2 font-hind">
                  EXPLORE ALL NIREEKA MODELS
                </p>
                {!!statistics?.bikes_model_count && (
                  <div className="text-stone-900 font-bold px-2 text-[0.75rem] font-hind subpixel-antialiased">
                    {`(${statistics?.bikes_model_count} MODELS/${statistics?.bikes_variation_count} VARIATIONS)`}
                  </div>
                )}
              </div>
            </a>
          </Link>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 ">
            <Link passHref href="/accessories">
              <a className={`${Styles.cardZoom} w-full h-full cursor-pointer`}>
                <div
                  style={productStyles}
                  className="h-full min-h-[350px] min-w-[300px] max-w-2xl w-full"
                >
                  <Image
                    src={helmetImage}
                    alt="helmet"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="right"
                    // loading="eager"
                    priority={true}
                    className={`${Styles.cardZoomImage} h-full w-full`}
                  />
                </div>
                {/* <img
                  src="../../../images/card-home/helmet_new.webp"
                  alt="helmet"
                  className={`${Styles.cardZoomImage} h-full w-full`}
                /> */}
                <div
                  className={`${Styles.cardZoomText} absolute top-0 left-0 w-full`}
                >
                  <h2
                    className={`${Styles.inverted} font-light text-[1.4rem] w-fit px-1 text-[#222222] font-hind`}
                  >
                    Accessories
                  </h2>
                  <p className="text-[0.75rem] font-medium text-[#999999] px-2 font-hind">
                    GEARS
                  </p>
                  {!!statistics?.accessories_count && (
                    <div className="text-stone-900 font-bold px-2 text-[0.75rem] font-hind subpixel-antialiased">
                      {`(${statistics?.accessories_count} ITEMS)`}
                    </div>
                  )}
                </div>
              </a>
            </Link>
            <Link passHref href="/forum">
              <a
                className={`${Styles.cardZoom} w-full h-full cursor-pointer order-4 lg:order-2`}
              >
                <div
                  style={productStyles}
                  className="h-full min-h-[350px] min-w-[300px] max-w-2xl w-full"
                >
                  <Image
                    src={forumsImage}
                    alt="forums"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="right"
                    // loading="eager"
                    priority={true}
                    className={`${Styles.cardZoomImage} h-full w-full`}
                  />
                </div>
                {/* <img
                  src="../../../images/card-home/forums_new.webp"
                  alt="forums"
                  className={`${Styles.cardZoomImage} h-full w-full`}
                /> */}
                <div
                  className={`${Styles.cardZoomText} absolute top-0 left-0 w-full`}
                >
                  <h2
                    className={`${Styles.inverted} font-light text-[1.4rem] w-fit px-1 text-[#222222] font-hind`}
                  >
                    Forums
                  </h2>
                  <p className="text-[0.75rem] font-medium text-[#999999] px-2 font-hind">
                    NIREEKA COMMUNITY
                  </p>
                  {!!statistics?.threads_count && (
                    <div className="text-stone-900 font-bold px-2 text-[0.75rem] font-hind subpixel-antialiased">
                      {`(${statistics?.threads_count} THREADS)`}
                    </div>
                  )}
                </div>
              </a>
            </Link>
            <Link passHref href="/spares">
              <a
                className={`${Styles.cardZoom} w-full h-full cursor-pointer order-3 lg:order-2`}
              >
                {/* <img
                  src="../../../images/card-home/motor_new.webp"
                  alt="motor"
                  className={`${Styles.cardZoomImage} h-full w-full`}
                /> */}
                <div
                  style={productStyles}
                  className="h-full min-h-[350px] min-w-[300px] max-w-2xl w-full"
                >
                  <Image
                    src={motorsImage}
                    alt="motors"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="right"
                    // loading="eager"
                    priority={true}
                    className={`${Styles.cardZoomImage} h-full w-full`}
                  />
                </div>
                <div
                  className={`${Styles.cardZoomText} absolute top-0 left-0 w-full`}
                >
                  <h2
                    className={`${Styles.inverted} font-light text-[1.4rem] w-fit px-1 text-[#222222] font-hind`}
                  >
                    Spare parts
                  </h2>
                  <p className="text-[0.75rem] font-medium text-[#999999] px-2 font-hind">
                    REPLACEMENT PARTS
                  </p>
                  {!!statistics?.spares_count && (
                    <div className="text-stone-900 font-bold px-2 text-[0.75rem] font-hind subpixel-antialiased">
                      {`(${statistics?.spares_count} ITEMS)`}
                    </div>
                  )}
                </div>
              </a>
            </Link>
            <Link passHref href="/dashboard">
              <a
                className={`${Styles.cardZoom} w-full h-full cursor-pointer order-5 lg:order-5`}
              >
                {/* <img
                  src="../../../images/card-home/dashboard_new.webp"
                  alt="dashboard"
                  className={`${Styles.cardZoomImage} h-full w-full`}
                /> */}
                <div
                  style={productStyles}
                  className="h-full min-h-[350px] min-w-[300px] max-w-2xl w-full"
                >
                  <Image
                    src={dashboardImage}
                    alt="dashboard"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="right"
                    // loading="eager"
                    priority={true}
                    className={`${Styles.cardZoomImage} h-full w-full`}
                  />
                </div>
                <div
                  className={`${Styles.cardZoomText} absolute top-0 left-0 w-full`}
                >
                  <h2
                    className={`${Styles.inverted} font-light text-[1.4rem] w-fit px-1 text-[#222222] font-hind`}
                  >
                    Dashboard
                  </h2>
                  <p className="text-[0.75rem] font-medium text-[#999999] px-2 font-hind">
                    ORDER HISTORY/DETAILS
                  </p>
                  {!!statistics?.orders_count && (
                    <div className="text-stone-900 font-bold px-2 text-[0.75rem] font-hind subpixel-antialiased">
                      {`(${statistics?.orders_count} ORDERS)`}
                    </div>
                  )}
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardGrid;
