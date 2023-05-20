// import MainPageBikes from "@/components/Home/MainPageBikes";
// import MainPageHeader from "@/components/Home/MainPageHeader";
// import ProductsIntroduction from "@/components/Home/ProductsIntroduction";
// import MainPageTestimonial from "@/components/Home/MainPageTestimonial";
import { useEffect, useState } from "react";
import { getHomePageData, getHomePageDataSlider } from "../app/api/home";
import Head from "next/head";
// import MainPageCountryShipping from "@/components/Home/MainPageCountryShipping";
// import SalesFeatures from "@/components/Home/SalesFeatures";
import Image from "next/image";
import GirLBike from "../public/images/backgrounds/cover-01-nireeka-prime.webp";
import WhiteBike from "../public/images/backgrounds/cover-02.webp";
// import SliderHero from "@/components/Home/SliderHero";
import { getConfiguratorBikes } from "app/api/configurator";
import { setHomePageData } from "app/store/homePageSlice";
//
import { useDispatch } from "react-redux";

import { GetWindowSize } from "@/components/Atoms/windowSize/GetWindowSize";
import dynamic from "next/dynamic";
//
// import CardGrid from "@/components/Home/cardGrid/CardGrid";

const MainPageBikes = dynamic(() => import("@/components/Home/MainPageBikes"));
const MainPageHeader = dynamic(() => import("@/components/Home/MainPageHeader"));
const ProductsIntroduction = dynamic(() => import("@/components/Home/ProductsIntroduction"));
const MainPageTestimonial = dynamic(() => import("@/components/Home/MainPageTestimonial"));
const MainPageCountryShipping = dynamic(() => import("@/components/Home/MainPageCountryShipping"));
const SalesFeatures = dynamic(() => import("@/components/Home/SalesFeatures"));
const SliderHero = dynamic(() => import("@/components/Home/SliderHero"));
const CardGrid = dynamic(() => import("@/components/Home/cardGrid/CardGrid"));

function HomePage({ homePageData, getDataSlider, configurator }) {
  const dispatch = useDispatch();
  const [darkHeader, setDarkHeader] = useState(false);

  const { height, width } = GetWindowSize();
  useEffect(() => {
    dispatch(setHomePageData(homePageData));
  }, [dispatch, homePageData]);

  // Handle theme header
  const handleTheme = () => {
    setDarkHeader(true);
  };

  return (
    <div>
      <section>
        <div className="relative">
          {/* <MainPageHeader MainPageHeader darkHeader={darkHeader} /> */}
          <MainPageHeader
            // setBackDrop={setBackDrop}
            // backdrop={backdrop}
            darkHeader={darkHeader}
          />

          <div className="w-full max-h-[85vh] mb-6 md:mb-0 md:max-h-screen h-screen min-h-[505px]">
            <div
              className="absolute top-0 justify-end w-full bg-transparent h-900 md:flex "
              // onClick={() => router.push(`https://www.niree.ca/`)}
            >
              <div className="w-full ">
                {getDataSlider?.data && configurator ? (
                  <SliderHero
                    getDataSlider={getDataSlider}
                    handleTheme={handleTheme}
                    darkHeader={darkHeader}
                    setDarkHeader={setDarkHeader}
                    data={configurator}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            {/* <div className="flex-col justify-start w-1/2 mx-auto text-center md:flex-col md:flex text-gray-50">
                <h2 className=" text-2xl md:text-2.75 font-exo  font-extralight ">
                  Nireeka Nyx
                </h2>
                <p className="font-light text-[14px] leading-[1.2rem] pt-[7px] text-gray-300">
                  Order online and have it delivered to your home
                </p>
              </div> */}

            {/* <div className="flex self-end w-full">
              <div className="relative z-20 flex flex-col justify-center w-1/2 mx-auto mb-8 break-words bg-transparent md:flex-row glass text-gray-50 ">
                {items.map((item) => (
                  <Link href={item.passLink} key={item.id}>
                    <a
                      className={` font-light cursor-pointer transition-all ease-in border-nireekaBorderColor md:max-w-11.5 my-2 md:my-0 text-center flex-auto px-1 py-2 w-full md:w-32 flex items-center justify-center mx-2 rounded-full border ${
                        item.id === 1
                          ? " bg-nireekaBorderColor hover:bg-transparent "
                          : "hover:bg-nireekaBorderColor "
                      } `}
                      key={item.id}
                      // target="_blank"
                    >
                      <p className="font-normal text-gray-300 ">
                        {item.details}
                      </p>
                    </a>
                  </Link>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>
      <div className="lg:mb-20 ">
        <CardGrid />
      </div>
      {/* Nireeka Products */}
      {/* <section className="mt-5 md:mt-20 mb-[40px] md:mb-[70px]">
        <ProductsIntroduction />
        <MainPageBikes />
      </section> */}

      {/* Countries Shipping Calculator & Testimonials */}
      <div>
        <MainPageCountryShipping />
        <div className="sticky top-0 flex justify-center w-full">
          <div>
            {/* <img
              alt="bike"
              className="w-full h-auto "
              src={"../../images/cover-01-nireeka-prime.jpg"}
              // width='100%'
              // height='100%'
              // objectFit='cover'
            /> */}
            <Image
              src={GirLBike}
              width="2500"
              height="1500"
              objectFit="cover"
              className="w-full h-auto "
              alt="Nireeka Prime"
            />
          </div>
        </div>

        <MainPageTestimonial />
        <div className="sticky top-0 flex justify-center w-full">
          <div>
            <Image
              src={WhiteBike}
              width="2500"
              height="1500"
              objectFit="cover"
              className="w-full h-auto"
              alt="Nireeka Prime"
            />
          </div>
        </div>
        <SalesFeatures />
      </div>
    </div>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  let homePageData;
  let getDataSlider;
  let res;

  try {
    homePageData = await getHomePageData();
    getDataSlider = await getHomePageDataSlider();
    res = await getConfiguratorBikes();
  } catch {
    homePageData = null;
    getDataSlider = null;
    res = null;
  }

  return {
    props: { homePageData, getDataSlider, configurator: res?.data || null },

    revalidate: 60,
  };
};
