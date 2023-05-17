import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import classNames from "../../functions/classNames";

export default function MainPageBikes() {
  const [changeHover, setChangeHover] = useState(null);

  const homePageData = useSelector((state) => state.homePage.homePageData);
  const bikeChoose = useSelector((state) => state.homePage.bikeChoose);

  const handleEnterDive = (id) => {
    setChangeHover(id);
  };
  const handleLeaveDiv = (id) => {
    setChangeHover(null);
  };

  console.log("homePageData", homePageData);
  return (
    <>
      <div className="w-4/5 px-1 pt-10 mx-auto mt-4 lp:px-24">
        {homePageData?.data.map((bike) => {
          const conditionText = () => {
            // id revenant
            if (bike.product_id == 5000103) {
              return (
                <div>
                  <div
                    className={`transition duration-500  transform opacity-0 ${
                      changeHover == 5000103 && "opacity-100"
                    }`}
                  >
                    <div className="absolute grid grid-cols-2 gap-4 translate-x-200 -top-12">
                      <div>
                        <span className="text-5xl font-extralight">1000w*</span>
                        <span className="block">Motor</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">840wh*</span>
                        <span className="block">Battery</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">140mm</span>
                        <span className="block">Travel</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">
                          Hub-motor
                        </span>
                        <span className="block">Motor Layout</span>
                      </div>
                      <p className="font-extralight">* Optional upgrades</p>
                    </div>
                  </div>

                  <>
                    <h4
                      className={`text-6xl text-center transition duration-500  text-gray-900 opacity-100 font-extralight ${
                        changeHover == 5000103 && "opacity-10"
                      }`}
                    >
                      {`All about versatility`}
                      <span className="ml-3 text-2xl ">{`${"(¬‿¬)"}`}</span>
                    </h4>
                  </>
                </div>
              );
            }
            if (bike.product_id == 5000105) {
              return (
                <div>
                  <div
                    className={`transition duration-500  transform opacity-0 ${
                      changeHover == 5000105 && "opacity-100"
                    }`}
                  >
                    <div className="absolute grid grid-cols-2 gap-4 translate-x-200 -top-12">
                      <div>
                        <span className="text-5xl font-extralight">500w*</span>
                        <span className="block">Motor</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">840wh*</span>
                        <span className="block">Battery</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">140mm</span>
                        <span className="block">Sus. Travel</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">
                          Mid-drive
                        </span>
                        <span className="block">Motor Layout</span>
                      </div>
                      <p className="font-extralight">* Optional upgrades</p>
                    </div>
                  </div>

                  <>
                    <h4
                      className={`text-6xl text-center transition duration-500  text-gray-900 opacity-100 font-extralight ${
                        changeHover == 5000105 && "opacity-10"
                      }`}
                    >
                      {`Extreme offroader?!`}
                      <span className="ml-3 text-2xl ">{`${"¯_(ツ)_/¯"}`}</span>
                    </h4>
                  </>
                </div>
              );
            }
            if (bike.product_id == 5000007) {
              return (
                <div>
                  <div
                    className={`transition duration-500 translate-x-[18%] transform opacity-0 ${
                      changeHover == 5000007 && "opacity-100"
                    }`}
                  >
                    <div className="absolute grid grid-cols-2 gap-4 -left-12 -top-12">
                      <div>
                        <span className="text-5xl font-extralight">1500w*</span>
                        <span className="block">Motor</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">840wh*</span>
                        <span className="block">Battery</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">
                          Hardtail
                        </span>
                        <span className="block">No Rear Sus.</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">
                          Mid-drive
                        </span>
                        <span className="block">Motor Layout</span>
                      </div>
                      <p className="font-extralight">* Optional upgrades</p>
                    </div>
                  </div>
                  <h4
                    className={`text-6xl text-center transition duration-500  text-gray-900 opacity-100 font-extralight ${
                      changeHover == 5000007 && "opacity-10"
                    }`}
                  >
                    {`I want POWEEEEEER!`}
                    <span className="ml-3 text-2xl ">{`${">("}`}</span>
                  </h4>
                </div>
              );
            }
            if (bike.product_id == 5000000) {
              return (
                <div>
                  <div
                    className={`transition duration-500   transform opacity-0 ${
                      changeHover == 5000000 && "opacity-100"
                    }`}
                  >
                    <div className="absolute translate-x-[14%] grid grid-cols-2 gap-4 -left-16 -top-12">
                      <div>
                        <span className="text-5xl font-extralight">500w*</span>
                        <span className="block">Motor</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">672wh*</span>
                        <span className="block">Battery</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">90mm</span>
                        <span className="block">Sus. Travel</span>
                      </div>
                      <div>
                        <span className="text-5xl font-extralight">
                          Hub-drive
                        </span>
                        <span className="block">Motor Layout</span>
                      </div>
                      <p className="font-extralight">* Optional upgrades</p>
                    </div>
                  </div>
                  <h4
                    className={`text-6xl text-center transition duration-500  text-gray-900 opacity-100 font-extralight ${
                      changeHover == 5000000 && "opacity-10"
                    }`}
                  >
                    {`I'm a commuter`}
                    <span className="ml-3 text-2xl ">{`${"( ^^)"}`}</span>
                  </h4>
                </div>
              );
            }
          };

          return (
            <div
              key={bike.id}
              onMouseEnter={() => handleEnterDive(bike.product_id)}
              onMouseLeave={() => handleLeaveDiv(bike.product_id)}
            >
              <Link passHref href={`/configurator/${bike.slug}`}>
                <div
                  className={`flex flex-row-reverse justify-between cursor-pointer lg:mb-8`}
                >
                  <div
                    className={classNames(
                      `w-full p-5 mb-0 text-2xl text-center transition duration-500 transform cursor-pointer sm:w-3/3 md:w-3/3 lp:1/3 lg:w-1/3 xl:w-1/3 min-w-nireeka hover:border-b opacity-100 hover:border-b-red-500 lg:border-none  `
                    )}
                  >
                    <div
                      className={`absolute hidden lg:flex top-[30%] z-20 left-[40%] opacity-0 ${
                        changeHover == bike.product_id && "opacity-100"
                      }`}
                    >
                      <Link passHref href={`/configurator/${bike.slug}`}>
                        <a className="w-32 px-4 py-1 font-light text-green-400 bg-transparent border-2 border-green-400 text rounded-xl">
                          Order
                        </a>
                      </Link>
                    </div>
                    <Link href={`/configurator/${bike.slug}`} passHref>
                      <a
                        className={`opacity-100 ${
                          changeHover == bike.product_id && "lg:opacity-10"
                        }`}
                      >
                        <Image
                          key={Math.floor(Math.random() * 9)}
                          src={bike.image}
                          alt={bike.name}
                          width={350}
                          height={200}
                          className={classNames(
                            "h-full align-middle transition-all duration-500 transform border-none",
                            bikeChoose !== bike.product_id
                              ? "hover:scale-105"
                              : "scale-100"
                          )}
                        />
                      </a>
                    </Link>
                    <div
                      className={`opacity-100 ${
                        changeHover == bike.product_id && "lg:opacity-10"
                      }`}
                    >
                      <h6 className="block text-xl font-light">
                        {bike.title}
                        {/* <span className=" text-xl text-gray-500"> {` ${bike.variation}`}</span> */}
                        {/* {bike.product_id===8&&<span className="pl-0.5 text-normal font-light text-gray-600">{`1500w`}</span>} */}
                      </h6>
                      <h6 className="p-1 text-lg font-light text-gray-500">
                        {`from `}
                        <span className="inline text-xl font-normal text-green-500">
                          {bike.price}
                        </span>
                        {/* <span className="inline text-xl text-gray-400 font-extralight">
                    {bike.retail_price}
                  </span> */}
                        <div className="relative inline-block mx-2">
                          <p className="inline text-xl text-gray-500 line-through font-extralight">
                            {` ${bike.retail_price}`}
                          </p>
                        </div>
                      </h6>
                    </div>
                  </div>
                  <div className="items-center justify-center hidden h-auto p-2 text-center lg:flex lp:2/3 lg:w-2/3 xl:w-2/3 ">
                    {conditionText()}
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
