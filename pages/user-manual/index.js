import CustomHead from "@/components/seo/CustomHead";
import Image from "next/image";
import React from "react";
const userManualStylesBike = {
  position: "relative",
  overflow: "hidden",
  height: "10rem",
  width: "100%",
  maxWidth: "20rem",

  "@media (min-width: 640px)": {
    height: "6rem",
    width: "6rem",
    maxWidth: "24rem",
  },
  "@media (min-width: 768px)": {
    height: "6rem",
    maxWidth: "32rem",
  },
  "@media (min-width: 1024)": {
    height: "8rem",
    width: "100%",
  },
};

export default function Index() {
  return (
    <>
      <CustomHead
        title="User Manual"
        name="User Manual"
        description="Find all the information you need to set up and use your Nireeka bike in the user manual."
        keywords={["Nireeka", "user manual", "setup", "use", "bike"]}
        available
        selfTitle
      />
      <div className="pb-16">
        <div className="pb-10 mx-auto mt-12 bg-white lg:pt-2 lg:pb-2 sm:content-center">
          <div className="relative px-4 pt-4 pb-4 mx-auto divide-y divide-red-500 max-w-7xl sm:px-6 lg:px-8">
            <div>
              <h1>{`Nireeka User's Manual`}</h1>
              <h3 className="text-3xl font-light tracking-tight text-gray-900 sm:text-4xl">{`Download User's Manual For Your Nireeka Products`}</h3>
              <p className="mt-8 text-xl text-gray-500 md:mt-3 sm:mt-4">
                NIREEKA E-BIKES
              </p>
            </div>
            <div className="grid grid-cols-1 gap-16 pt-4 my-0 md:pt-12 lg:grid-cols-4 gap-x-1 lg:gap-x-5 lg:gap-y-12">
              <div className="w-full">
                <a
                  href="https://api.nireeka.com/um/Nireeka-Revenant-User-Manual.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    Nireeka Revenant
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Full Suspension
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div style={userManualStylesBike}>
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/Nireeka-Revenant-User-Manual.pdf">
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/storage/color_product/Bx62gDeQlpdcmRXJ9exGFRYJ3KJ0IUj7VKVyHPDo.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/storage/color_product/Bx62gDeQlpdcmRXJ9exGFRYJ3KJ0IUj7VKVyHPDo.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/Nireeka-Revenant-User-Manual.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>
              <div className="w-full">
                <a
                  href="https://api.nireeka.com/um/Nireeka-Nyx-User-Manual.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    Nireeka NYX
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Full Suspension Trail e-Bike
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div style={userManualStylesBike}>
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/Nireeka-Nyx-User-Manual.pdf">
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/storage/color_product/f7CXbTC9cTyYQzKvN6RqPyxJNXImzGEaVn770weL.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/storage/color_product/f7CXbTC9cTyYQzKvN6RqPyxJNXImzGEaVn770weL.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/Nireeka-Nyx-User-Manual.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    Nireeka Prime
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Fat Hardtail e-Bike
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div style={userManualStylesBike}>
                    {" "}
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf">
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/storage/color_product/D9VNuQoVIg4WYI936bc6P8YfPzVwd6K21cDBPi5q.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/storage/color_product/D9VNuQoVIg4WYI936bc6P8YfPzVwd6K21cDBPi5q.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="https://api.nireeka.com/um/Nireeka-User-Manual-4May2019.pdf"
                  className="block mt-4"
                >
                  {" "}
                  <p className="mt-4 text-xl font-medium text-gray-900">
                    Nireeka Homie
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Mountain Commuter e-Bike
                  </p>
                </a>

                <div className="flex items-center pb-4 mt-6">
                  <div style={userManualStylesBike}>
                    {" "}
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/Nireeka-User-Manual-4May2019.pdf">
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/storage/color_product/MFTyNjDszIM5gYd1nNfJqcfvrUZ1YPSOiTV1eL7Z.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/storage/color_product/MFTyNjDszIM5gYd1nNfJqcfvrUZ1YPSOiTV1eL7Z.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/Nireeka-User-Manual-4May2019.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                  <a
                    href="https://api.nireeka.com/um/Nireeka-V%C3%A9lo-%C3%A9lectrique-intelligent.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      French{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 bg-white lg:pt-2 lg:pb-2 sm:content-center">
          <div className="relative px-4 pt-4 pb-4 mx-auto divide-y divide-red-500 max-w-7xl sm:px-6 lg:px-8">
            <div>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">DISPLAYS</p>
            </div>
            <div className="grid gap-16 pt-6 my-0 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              <div>
                <a
                  href="https://api.nireeka.com/um/SW900_manual.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    LCD - SW900
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Black and White Display
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div className="accessoryManual">
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/SW900_manual.pdf">
                        <Image
                          className="h-64 max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/img/p/5000052.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />

                        {/* <img
                        className="h-64 max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/img/p/5000052.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/SW900_manual.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="https://api.nireeka.com/um/750C-display.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    LCD - 750C
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Color Display
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div className="accessoryManual">
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/750C-display.pdf">
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://ae01.alicdn.com/kf/HTB1BVwgatfvK1RjSspoq6zfNpXav.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://ae01.alicdn.com/kf/HTB1BVwgatfvK1RjSspoq6zfNpXav.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/750C-display.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="https://api.nireeka.com/um/Nireeka-display-nd-32.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    LCD - ND32
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Color Display
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div className="accessoryManual">
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/Nireeka-display-nd-32.pdf">
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/img/p/5000053.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                        {/* <img
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/img/p/5000053.jpg"
                          alt="NIREEKA E-BIKES"
                        /> */}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/Nireeka-display-nd-32.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-10 bg-white lg:pt-2 lg:pb-2 sm:content-center ">
          <div className="relative px-4 pt-4 pb-4 mx-auto divide-y divide-red-500 max-w-7xl sm:px-6 lg:px-8">
            <div>
              <p className="mt-3 text-xl text-gray-500 sm:mt-4">
                BAFANG DISPLAYS
              </p>
            </div>
            <div className="grid gap-16 pt-6 my-0 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
              <div>
                <a
                  href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    LCD - DP C01
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Black and White Display
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div className="accessoryManualDown">
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf">
                        {/* <img
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-24"
                          src="https://api.nireeka.com/images/help-center/DP%20C01.UART-01_1643533714.jpg"
                          alt="NIREEKA E-BIKES"
                        /> */}
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-24"
                          src="https://api.nireeka.com/images/help-center/DP%20C01.UART-01_1643533714.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      {" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>

              <div>
                <a
                  href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf"
                  className="block mt-4"
                >
                  <p className="text-xl font-medium text-gray-900">
                    LCD - DP C18
                  </p>
                  <p className="mt-3 text-base font-light text-gray-500">
                    Color Display
                  </p>
                </a>
                <div className="flex items-center pb-4 mt-6">
                  <div className="accessoryManualDown">
                    <div className="flex-shrink-0">
                      <a href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf">
                        {/* <img
                        className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                        src="https://api.nireeka.com/images/help-center/DP%20C18.UART_1643576324.jpg"
                        alt="NIREEKA E-BIKES"
                      /> */}
                        <Image
                          className="h-auto max-w-xs sm:max-w-sm md:max-w-lg lg:w-full lg:h-32"
                          src="https://api.nireeka.com/images/help-center/DP%20C18.UART_1643576324.jpg"
                          alt="NIREEKA E-BIKES"
                          layout="fill"
                          objectFit="contain"
                          objectPosition="center"
                          // loading="eager"
                          priority={true}
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center max-w-xs lg:justify-start sm:max-w-sm md:max-w-lg lg:w-full">
                  <a
                    href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf"
                    className="inline-block"
                  >
                    <span className="bg-blue-600 w-full lg:w-32 border text-white inline-flex px-6 py-1 lg:py-0.5 rounded-full text-sm font-medium hover:border-black hover:bg-white hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>{" "}
                      English{" "}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className='pb-16'> <Footer/></div>   */}
      </div>{" "}
    </>
  );
}
