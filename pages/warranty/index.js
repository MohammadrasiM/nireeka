import Link from "next/link";
import React from "react";
import ProgressScroll from "@/components/ProgressScroll/ProgressScroll";
import Footer from "@/components/StaticPages/Footer";
// import { warranty } from "@/components/StaticPages/Warranty/data";
import { warranty } from "@/components/StaticPages/Warranty/data";
import Head from "next/head";
import { getWarranty } from "app/api/statics";
import { useState, useEffect } from "react";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import EditorStatics from "@/components/Editor/EditorStatics";
import WideCardSkelton from "@/components/Atoms/skeletonLoading/WideCardSkelton";
import useSWR from "swr";
import CustomHead from "@/components/seo/CustomHead";
export default function Index() {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topicInformation, setTopicInformation] = useState(null);
  async function fetcher() {
    const { data } = await getWarranty();
    setTopicInformation(data);
    return data;
  }
  const { data, error } = useSWR(`getData`, fetcher);

  if (!data) {
    return <WideCardSkelton />;
  }
  if (data) {
    return (
      <>
        <CustomHead
          selfTitle
          title="Warranty - Nireeka Bikes"
          name="Warranty Information"
          description="Learn about our product warranty and how to make a warranty claim."
          keywords={["warranty", "product warranty", "warranty claim"]}
          available
        />

        {/* <div className="w-full mx-auto bg-gradient-to-r from-green-200 to-blue-200 md:w-4/5 rounded-3xl">h</div> */}
        {(data.is_admin === 9 || data.is_admin === 1) && (
          <div className="absolute w-full mt-6 md:mt-[105px]">
            <div className="relative w-full max-w-7xl">
              <div className="absolute md:right-20 right-2 ">
                <button
                  onClick={() => setIsShowTopic(true)}
                  className="flex items-center justify-center w-full px-1 py-2 mt-4 font-light border rounded-md text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500"
                >
                  Edit Warranty
                </button>
              </div>
            </div>
          </div>
        )}
        <BlurBackdrop
          isVisible={isShowTopic}
          noXButton
          // onClose={() => setIsShowTopic(false)}
          backdropMode="dark"
          className="w-full md:w-[60%]"
        >
          <EditorStatics
            topicInformation={topicInformation}
            setTopicInformation={setTopicInformation}
            onClose={() => setIsShowTopic(false)}
          />
        </BlurBackdrop>
        {/* <div className="pt-16">
        <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xl font-light text-indigo-600 uppercase sm:tracking-tight md:text-2xl">
              {`Terms & Conditions`}
            </h2>
            <p className="mt-1 text-5xl font-light text-gray-900 lg:text-7xl">{`Warranty`}</p>
            <p className="max-w-xl mx-auto mt-5 text-xl text-gray-500 ">
              {`     Thanks for joining the Nireeka family. Below you can find all the
            situations you might need to get help from the warranty agreement.`}
            </p>
          </div>
        </div>
        <div className="px-1 md:px-0">
          <div className="w-full mx-auto bg-gradient-to-r from-green-200 to-blue-200 md:w-4/5 rounded-3xl">
            <div className="max-w-md px-4 py-10 mx-auto sm:max-w-3xl sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <h2 className="text-3xl font-light text-gray-900">{warranty.name}</h2>
                  <p className="mt-4 text-sm font-light text-gray-600 ">{warranty.describe}</p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                  <div className="space-y-12">
                    {warranty.GENERAL.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <span className="font-medium text-black ">{item.slice_text}</span>
                            {`or`}
                            <span className="font-medium text-black ">{item.slice_text_2}</span>
                            {item.title_2}
                          </div>
                        </div>
                      );
                    })}

                    {warranty.MAIN.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <br />
                            {item.title_2}
                            <br />
                            {item.title_3}
                            <div className="pt-5">
                              <span className="inline font-medium text-gray-900 ">
                                {`IMPORTANT:`}
                              </span>
                              <p className="inline font-light text-gray-700 ">
                                {` If the frame or fork or any component is broken
                              during shipping, you need to open a`}
                                <Link href="/support/tickets">
                                  <a
                                    target="_blank"
                                    className="font-medium text-black hover:underline hover:text-customColorNIR"
                                  >
                                    {` ticket `}
                                  </a>
                                </Link>
                                {`  and let us know to proceed with the return or
                              replacement in no more than 3 days.`}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {warranty.MOTOR.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <span className="font-medium text-black ">{item.slice_text}</span>
                            {`or`}
                            <span className="font-light text-black ">{item.slice_text_2}</span>
                            {item.title_2}
                          </div>
                        </div>
                      );
                    })}

                    {warranty.BATTERY.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <span className="font-medium text-black ">{item.slice_text}</span>
                            {`or`}
                            <span className="font-medium text-black ">{item.slice_text_2}</span>
                            {item.title_2}
                          </div>
                        </div>
                      );
                    })}
                    {warranty.FORKS.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <span className="font-medium text-black ">{item.slice_text}</span>
                            {item.title_2}
                            <span className="font-medium text-black ">{item.slice_text_2}</span>
                          </div>
                        </div>
                      );
                    })}

                    {warranty.SUSPENSION.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">
                            {item.title_1}
                            <span className="font-medium text-black ">{item.slice_text}</span>
                            {item.title_2}
                            <span className="font-medium text-black ">{item.slice_text_2}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 mt-16 md:px-0">
          <div className="w-full mx-auto bg-gradient-to-r from-green-200 to-blue-200 md:w-4/5 rounded-3xl">
            <div className="max-w-md px-4 py-10 mx-auto sm:max-w-3xl sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <h2 className="text-3xl font-light text-gray-900">{warranty.name_3}</h2>
                  <p className="mt-4 text-sm font-light text-gray-600 ">{warranty.describe_3}</p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                  <div className="space-y-12">
                    {warranty.void.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">{item.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 mt-16 md:px-0">
          <div className="w-full mx-auto bg-gradient-to-r from-green-200 to-blue-200 md:w-4/5 rounded-3xl">
            <div className="max-w-md px-4 py-10 mx-auto sm:max-w-3xl sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div>
                  <h2 className="text-3xl font-light text-gray-900">{warranty.name_2}</h2>
                  <p className="mt-4 text-sm font-light text-gray-600 ">{warranty.describe_2}</p>
                </div>
                <div className="mt-12 lg:mt-0 lg:col-span-2">
                  <div className="space-y-12">
                    {warranty.Warranty_Exclusion.map((item) => {
                      return (
                        <div key={item.id}>
                          <div className="text-2xl font-light text-gray-900 uppercase">
                            {item.name}
                          </div>
                          <div className="mt-2 text-sm text-gray-600 ">{item.title}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-1 mt-16 md:px-0">
          <div className="relative mt-10 mb-10 sm:mt-10 sm:py-16 lg:mb-0">
            <div aria-hidden="true" className="hidden sm:block">
              <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl"></div>
              <svg
                className="absolute -ml-3 top-8 left-1/2"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x="0"
                      y="0"
                      width="4"
                      height="4"
                      className="text-gray-200"
                      fill="currentColor"
                    ></rect>
                  </pattern>
                </defs>
                <rect
                  width="404"
                  height="392"
                  fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)"
                ></rect>
              </svg>
            </div>
            <div className="px-1 mx-auto sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8 ">
              <div className="relative px-6 py-10 overflow-hidden bg-red-500 shadow-xl rounded-2xl sm:px-12 sm:py-20">
                <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="xMidYMid slice"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 1463 360"
                  >
                    <path
                      className="text-red-400 text-opacity-40"
                      fill="currentColor"
                      d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                    ></path>
                    <path
                      className="text-red-600 text-opacity-40"
                      fill="currentColor"
                      d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                    ></path>
                  </svg>
                </div>
                <div className="relative">
                  <div className="sm:text-center">
                    <h2 className="text-3xl font-light tracking-tight text-center text-white sm:text-4xl">
                      {` The Warranty Claim Process`}
                    </h2>
                    <p className="max-w-2xl mx-auto mt-6 text-sm font-light text-center text-red-100 ">
                      {`  All warranty claims must be through our support system by
                    opening a ticket in the warranty category. You need to
                    include enough clear photos and videos requested by the
                    Nireeka team and do the testing requested by the Nireeka
                    team.`}
                    </p>
                  </div>
                  <div className="w-full py-10 mx-auto mt-4 sm:mt-0 sm:ml-3">
                    <Link href="/support">
                      <a target="_blank">
                        <button
                          type="submit"
                          className="block w-full px-5 py-3 mx-auto text-base font-light text-white bg-gray-900 border border-gray-200 shadow md:w-2/5 rounded-xl hover:bg-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-red-500 sm:px-10"
                        >
                          {`Claim now!`}
                        </button>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
        <ProgressScroll />
      </>
    );
  }
}
