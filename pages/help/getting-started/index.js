import CustomHead from "@/components/seo/CustomHead";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PrimeBike from "../../../public/images/help/prime-what-is-in-the-box.jpg";

const Styles = {
  position: "relative",
  overflow: "hidden",
};
function Index() {
  return (
    <>
      <CustomHead
        selfTitle
        title="Getting Started - Nireeka Bikes"
        name="Getting Started"
        description="Congratulation on receiving your Nireeka Prime bike. You will find
          all the information you need for setting up your bike for the
          first time on this page."
      />
      <div className="content-center font-white bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
        <div className="px-4 py-16 mx-auto max-w-7xl sm:py-24 sm:px-6 lg:px-8">
          <div className="grid-cols-2 text-center ">
            <h2 className="text-xl font-normal tracking-wide text-pink-200 uppercase">
              assembling tutorials
            </h2>
            <p className="mt-1 text-4xl font-thin text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Getting Started!
            </p>
            <p className="max-w-xl mx-auto mt-5 text-xl font-light text-gray-100 ">
              Congratulation on receiving your Nireeka Prime bike. You will find
              all the information you need for setting up your bike for the
              first time on this page.
            </p>
          </div>
          <div>
            {/* <img
              src="/images/help/nireeka-prime-help.jpg"
              className="my-10 rounded-lg shadow-lg "
              style="display: block; margin-left: auto; margin-right: auto;"
            /> */}
          </div>
        </div>

        <div
          className="relative px-4 pt-10 pb-20 bg-gray-50 sm:px-6 lg:pt-10 lg:pb-10 lg:px-8"
          style={{ width: "80%", borderRadius: "20px", margin: "auto" }}
        >
          <div className="absolute inset-0">
            <div className=" h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2
                className="font-normal text-center text-gray-900 text-9xl "
                // style={{-webkit-text-stroke: 1px black; -webkit-text-fill-color: white;"}}
              >
                1
              </h2>
              <p className="mt-1 text-3xl font-thin sm:text-4xl sm:tracking-tight lg:text-4xl">
                What is in the box?
              </p>
            </div>
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-2 lg:max-w-none">
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-white">
                <div
                  style={Styles}
                  className="w-full   max-h-[650px] h-full md:min-h-[800px] md:w-full md:max-h-max md:h-full lg:min-h-[1100px] "
                >
                  <div className="flex-shrink-0">
                    {/* <img
                      className="object-cover"
                      src={"../../../images/help/prime-what-is-in-the-box.jpg"}
                      alt="prime"
                    /> */}
                    <Image
                      src={PrimeBike}
                      alt="prime"
                      layout="responsive"
                      objectFit="cover"
                      objectPosition="center"
                      priority={true}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between flex-1 p-6 bg-white"></div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        Unboxing: Nireeka Prime
                      </a>
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      1. Pre-assembled Nireeka Prime without front wheel
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      All the parts are assembled except the ones mentioned
                      below.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      2. Front Wheel
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Front wheel with the protector caps.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      3. Battery
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      The battery should be assembled in the bike unless your
                      bike has been shipped by air (Express) or for some
                      countries like Japan, South Korea, Australia.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      4. Charger
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      A universal charger compatible with 110-240V.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      5. Frame Protector
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      {`There is a spare frame protector in the box that doesn't
                      need to be installed since you already have one on your
                      bike.`}
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      6. Mudguards (Optional)
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      There are front and rear mudguards and installation slots
                      and screws.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      7. Wooden Beam
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      {`This beam is designed to protect the fork steerer when the
                      shipping companies put the box on the wrong side! You
                      don't need this wood anymore.`}
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      8. Display
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      The model will be based on your selected version when
                      placing your order.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      {` 9. User's Manuals`}
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      {` A few parts will be delivered to us with the user's
                      manuals included. We sent all to you!`}
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      10. Extras
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      {` Any other parts and accessories that you've ordered such
                      as taillight and helmet.`}
                    </p>
                  </div>
                  <div className="flex items-center mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative px-4 pb-20 bg-gray-50 pt-100 sm:px-6 lg:pt-10 lg:pb-10 lg:px-8"
          style={{
            width: "80%",
            borderRadius: "20px",
            margin: "auto",
            marginTop: "50px",
          }}
        >
          <div className="absolute inset-0">
            <div className=" h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2
                className="font-normal text-center text-gray-900 text-9xl "
                // style="-webkit-text-stroke: 1px black; -webkit-text-fill-color: white;"
              >
                2
              </h2>
              <p className="mt-1 text-3xl font-thin sm:text-4xl sm:tracking-tight lg:text-4xl">
                Unboxing
              </p>
            </div>
            <div className="grid max-w-lg gap-5 mx-auto mt-12 lg:grid-cols-2 lg:max-w-none">
              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex-shrink-0">
                  {/* <Iframe
                    url="http://www.youtube.com/embed/MY53fCmloVk?controls=0"
                    width="100%"
                    height="660px"
                    id="myId"
                    title="YouTube video player"
                    // className="myClassname"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    display="initial"
                    position="relative"
                  /> */}
                  <iframe
                    src="http://www.youtube.com/embed/MY53fCmloVk?controls=0"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ width: "100%", height: "660px" }}
                    //   className="rounded-xl"
                  ></iframe>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden rounded-lg shadow-lg">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-indigo-600">
                      <a href="#" className="hover:underline">
                        Video: Unboxing the Nireeka Prime
                      </a>
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=8" target="">
                        0:07 - Opening the box
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Remove the top cap carefully.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=30" target="">
                        0:30 - Installing the handlebar
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Remove the stem cap and put the handlebar in the right
                      position.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=73" target="">
                        1:13 - Installing the display
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      The display model might be different but the instruction
                      is identical.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=103" target="">
                        1:43 - Installing the front wheel
                      </a>
                    </p>

                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Check this{" "}
                      <Link href="https://youtu.be/b6EWyE745Uo" passHref>
                        <a target="_blank" className="text-pink-500 underline">
                          {`VIDEO `}
                        </a>
                      </Link>
                      for more accurate explanations.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=153" target="">
                        2:33 - Installing the pedals
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Pay attention to the right/left badges.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=164" target="">
                        2:44 - Removing/Installing the battery
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      You can remove the battery for charging inside.
                    </p>

                    <p className="block mt-2 text-xl text-gray-900">
                      <a href="https://youtu.be/MY53fCmloVk?t=178" target="">
                        2:58 - Turning on the bike
                      </a>
                    </p>
                    <p className="mt-3 mb-4 text-base text-gray-500">
                      Hold and keep the power button for 3 seconds to turn the
                      bike on.
                    </p>
                  </div>
                  <div className="flex items-center mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="relative px-4 pb-20 bg-gray-50 pt-100 sm:px-6 lg:pt-10 lg:pb-10 lg:px-8"
          style={{
            width: "80%",
            borderRadius: "20px",
            margin: "auto",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        >
          <div className="absolute inset-0">
            <div className=" h-1/3 sm:h-2/3"></div>
          </div>
          <div className="relative mx-auto max-w-7xl">
            <div className="text-center">
              <h2
                className="font-normal text-center text-gray-900 text-9xl "
                // style="-webkit-text-stroke: 1px black; -webkit-text-fill-color: white;"
              >
                3
              </h2>
              <p className="mt-1 text-3xl font-thin sm:text-4xl sm:tracking-tight lg:text-4xl">
                {` User's Manual`}
              </p>
            </div>

            <div className="px-4 pt-16 pb-20 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
              <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
                <div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                    {`Latest user's manuals`}
                  </h2>
                  <p className="mt-3 text-xl text-gray-500 sm:mt-4 ">
                    {` The user's manuals cover in-depth instruction if you cannot find what you want in the unboxing videos.`}
                  </p>
                </div>
                <div className="grid gap-16 pt-12 mt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
                  <div>
                    <div>
                      <a
                        href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf"
                        className="inline-block"
                      >
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {`Nireeka Prime User's Manual`}
                        </span>
                      </a>
                    </div>
                    <a
                      href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf"
                      className="block mt-4"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        Nireeka Prime V24
                      </p>
                      <p className="mt-3 text-base text-gray-500 ">
                        {` English version of the User's manual for the bikes
                        shipped before August 2021`}
                      </p>
                    </a>
                    <div className="flex items-center mt-6">
                      <div className="flex-shrink-0">
                        <a href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="indigo"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href="https://api.nireeka.com/um/Nireeka-Prime-User-Manual-28th-August-2020.pdf">
                            Download Here
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">
                            Latest update: Mar 16, 2020
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <a
                        href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf"
                        className="inline-block"
                      >
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-pink-100 text-pink-800">
                          {` DP C18 Display User's Manual`}
                        </span>
                      </a>
                    </div>
                    <a
                      href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf"
                      className="block mt-4"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        UART/Color Display
                      </p>
                      <p className="mt-3 text-base text-gray-500 ">
                        This display is compatible with the Homie and Prime
                        shipped before August 2021.
                      </p>
                    </a>
                    <div className="flex items-center mt-6">
                      <div className="flex-shrink-0">
                        <a href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="pink"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href="https://api.nireeka.com/um/BF-CM-DP-C18-EN.pdf">
                            Download Here
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">
                            Latest update: Sep 04, 2019
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <a
                        href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf"
                        className="inline-block"
                      >
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {` DP C01 Display User's Manual`}
                        </span>
                      </a>
                    </div>
                    <a
                      href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf"
                      className="block mt-4"
                    >
                      <p className="text-xl font-semibold text-gray-900">
                        UART/Black&White
                      </p>
                      <p className="mt-3 text-base text-gray-500 ">
                        This display is compatible with the Homie and Prime
                        shipped before August 2021.
                      </p>
                    </a>
                    <div className="flex items-center mt-6">
                      <div className="flex-shrink-0">
                        <a href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-12 h-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="green"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1"
                              d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
                            />
                          </svg>
                        </a>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">
                          <a href="https://api.nireeka.com/um/BF-CM-DP-C01-EN.pdf">
                            Download Here
                          </a>
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-16">
                            Latest update: June 23, 2019
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8 lg:py-24">
            <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
              <div className="space-y-5 sm:space-y-4">
                <h2 className="text-3xl tracking-tight sm:text-4xl">
                  More Resources
                </h2>
                <p className="text-xl text-gray-500 ">
                  Here you can find more videos about installing the upgrades
                  and extras.
                </p>
              </div>
              <div className="lg:col-span-2">
                <ul className="space-y-12 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:space-y-0 lg:gap-x-8">
                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        {/* <Iframe
                          url="https://www.youtube.com/embed/PP0r7Pmt5uI"
                          width="100%"
                          height="660px"
                          id="myId"
                          title="YouTube video player"
                          className="rounded-xl"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          // display="initial"
                          position="relative"
                        /> */}
                        <iframe
                          id="myId"
                          src="https://www.youtube.com/embed/PP0r7Pmt5uI"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime/Homie</h3>
                        <p className="text-indigo-600">Pedals</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to Install/Remove the Pedals on Nireeka Homie or
                          Prime
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/7EnRv8T5Wa8"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Throttle</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to install Throttle on Nireeka Prime
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/P-P9HODsns8"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Free Hub</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to remove Prime free hub.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/Dm60tzuD3cs"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Cassette</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to remove the Nireeka Prime cassette.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/xoSMqqUiRo8"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Tire</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to Remove/Install the Nireeka Prime rear tire form
                          the rim.
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/gQVqpMoTBOU"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Rear Wheel</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          {` How to Remove/Install the Nireeka Prime's rear wheel`}
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/rgYBm80uVAc?controls=0"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">Brake Rotors</p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to Remove/Install the Nireeka Prime rear disk
                          brake rotor
                        </p>
                      </div>
                    </div>
                  </li>

                  <li>
                    <div className="space-y-4">
                      <div className="aspect-w-3 aspect-h-2">
                        <iframe
                          src="https://www.youtube.com/embed/H088fOz8Vyk"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ width: "100%" }}
                          className="rounded-xl"
                        ></iframe>
                      </div>
                      <div className="space-y-1 text-lg font-medium leading-6">
                        <h3>Nireeka Prime</h3>
                        <p className="text-indigo-600">
                          Derailleur Hanger Extender
                        </p>
                      </div>
                      <div className="text-lg">
                        <p className="text-gray-500 ">
                          How to install a derailleur hanger extender on the
                          Nireeka Prime.
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
