import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Footer from "@/components/StaticPages/Footer";
import { PRIVACYPOLICY } from "@/components/StaticPages/PrivacyPolicy/data";
import ProgressScroll from "@/components/ProgressScroll/ProgressScroll";
import Head from "next/head";
import { getPrivacyPolicy } from "app/api/statics";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { useState, useEffect } from "react";
import EditorStatics from "@/components/Editor/EditorStatics";
import useSWR from "swr";
import TermsSkeltonLoading from "@/components/Atoms/skeletonLoading/TermsSkeltonLoading";
import CustomHead from "@/components/seo/CustomHead";

export default function Index() {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topicInformation, setTopicInformation] = useState(null);
  async function fetcher() {
    const { data } = await getPrivacyPolicy();
    setTopicInformation(data);
    return data;
  }
  const { data, error } = useSWR(`getData`, fetcher);

  if (!data) {
    return <TermsSkeltonLoading />;
  }

  if (data) {
    return (
      <>
        {/* <Head>
          <title>Privacy Policy - Nireeka Bikes</title>
        </Head> */}
        <CustomHead
          selfTitle
          title="Privacy Policy - Nireeka Bikes"
          name="Privacy Policy - Nireeka Bikes"
          description="Learn about our privacy policy and how we collect, use, and protect your personal information."
          keywords={["privacy policy", "data privacy", "personal information"]}
        />
        {(data.is_admin === 9 || data.is_admin === 1) && (
          <div className="absolute w-full mt-6 md:mt-[95px]">
            <div className="relative w-full max-w-7xl">
              <div className="absolute md:right-20 right-2 ">
                <button
                  onClick={() => setIsShowTopic(true)}
                  className="flex items-center justify-center w-full px-1 py-2 mt-4 font-light border rounded-md text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500"
                >
                  Edit Privacy Policy
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
        {/* <div className="pt-16 md:pt-20">
        {" "}
        <div className="flex flex-wrap w-full px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-center w-full px-2 py-3 mx-auto ">
            <div className="w-full mx-2 border-b ">
              <h3 className="py-4 text-3xl font-light text-gray-600">
                {PRIVACYPOLICY.name}
              </h3>
            </div>
          </div>
          {PRIVACYPOLICY.PRIVACYPOLICY.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 py-3 mx-auto "
                key={item.id}
                //1. animate={{ scale: 1 }} initial={{ scale: 2 }} transition={{duration:3}}
                // whileHover={{ scale: 1.1, y: -100 }}
                // transition={{ duration: 3 }}
              >
                <div className="w-full mx-2 ">
                  <p className="pb-4 text-xl font-light text-gray-700">
                    {item.name}
                  </p>
                  <div className="mb-5 font-light text-gray-500">
                    <p className="inline text-sm font-light leading-8">
                      {`Thank you for choosing to be part of our community at
                    Shojaie, doing business as Nireeka (`}
                      <span className="text-sm font-normal leading-8 text-gray-900">
                        {` "Nireeka"`}
                      </span>
                      ,
                      <span className="text-sm font-normal leading-8 text-gray-900">{` "we"`}</span>
                      ,
                      <span className="text-sm font-normal leading-8 text-gray-900">{` "us"`}</span>
                      {`, or `}
                      <span className="text-sm font-normal leading-8 text-gray-900">{` "our"`}</span>
                      {`). We are committed to protecting your
                    personal information and your right to privacy. If you have
                    any questions or concerns about our policy or our practices
                    with regards to your personal information, please contact us
                    at support@nireeka.com.`}
                    </p>
                  </div>
                  <div className="mb-5 font-light text-gray-500">
                    <p className="inline text-sm font-light leading-8">
                      {item.title_2}
                    </p>
                  </div>
                  <div className="mb-5 font-light text-gray-500">
                    <p className="inline text-sm font-light leading-8">
                      {`This privacy policy applies to all information collected through our website such as nireeka.com), mobile application, (`}
                      <span className="text-sm font-normal leading-8 text-gray-900">{`"Apps"`}</span>
                      {`), and/or any related services, sales, marketing or events we refer to them collectively in this privacy policy as the `}
                      <span className="text-sm font-normal leading-8 text-gray-900">{`"Sites"`}</span>
                      {`).`}
                    </p>
                  </div>
                  <div className="py-4 mb-5">
                    <p className="inline text-sm font-light leading-8 text-black">
                      {item.describ}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex justify-center w-full px-2 pb-2 mx-auto ">
            <div className="w-full mx-2">
              <p className="inline text-lg font-light leading-8 text-black">
                {PRIVACYPOLICY.TABLE.name}
              </p>
            </div>
          </div>

          {PRIVACYPOLICY.links.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 pb-2 mx-auto text-sm "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <Link href={item.href} passHref>
                    <a className="cursor-pointer" key={item.id}>
                      <p className="inline text-sm font-light leading-8 text-gray-500 hover:text-customColorNIR">
                        {item.title_href}
                      </p>
                    </a>
                  </Link>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.WHAT_INFORMATION.map((item) => {
            return (
              <div className="flex justify-center w-full px-2 mx-auto " key={item.id}>
                <div className="w-full mx-2 " key={item.id}>
                  <div className="py-10">
                    <p className="text-sm font-light leading-8 text-justify text-black">
                      {item.name}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-black">
                      {item.describ}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1_1}
                    </p>
                  </div>
                  <div className="pt-8">
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                  </div>

                  <div className="pt-8">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head_3}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                  </div>
                  <div className="pt-8">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head_4}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_4}
                    </p>
                  </div>
                  <div className="pt-8">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head_5}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_5}
                    </p>
                  </div>
                  <div className="pt-8">
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_6}
                    </p>
                  </div>
                  <div className="pt-10">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.T_Head_8}
                    </p>
                  </div>
                  <div className="pt-6">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head_8}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_8}
                    </p>
                  </div>
                  <div className="pt-10">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.T_Head_9}
                    </p>
                  </div>
                  <div className="pt-6">
                    <p className="inline text-lg font-light leading-8 text-justify text-black">
                      {item.head_9}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_9}
                    </p>
                    <div>
                      <p className="inline-block text-sm font-light leading-8 text-justify text-gray-500">
                        {item.paragraph_9_1}
                      </p>
                      <p className="inline-block text-sm font-light leading-8 text-justify text-gray-500">
                        {item.paragraph_9_2}
                      </p>
                      <p className="inline-block text-sm font-light leading-8 text-justify text-gray-500">
                        {item.paragraph_9_3}
                      </p>
                      <p className="inline-block text-sm font-light leading-8 text-justify text-gray-500">
                        {item.paragraph_9_4}
                      </p>
                    </div>
                    <div className="pt-10">
                      <p className="inline text-lg font-light leading-8 text-justify text-black">
                        {item.T_Head_10}
                      </p>
                    </div>
                    <div className="pt-6">
                      <p className="inline text-lg font-light leading-8 text-justify text-black">
                        {item.head_10}
                      </p>
                      <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_10}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.HOW_DO_WE_USE_YOUR_INFORMATION.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_4}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_5}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_6}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_7}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_8}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.WILL_YOUR_INFORMATION.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_4}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_5}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_6}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_7}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_8}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      <span className="text-black">{`•`}</span> {item.title_9}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      <span className="text-black">{`•`}</span> {item.title_10}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.DO_WE_USE_COOKIES.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.HOW_LONG_DO_WE_KEEP.map((item) => {
            return (
              <div className="flex justify-center w-full px-2 mx-auto " key={item.id}>
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.INFORMATION_SAFE.map((item) => {
            return (
              <div className="flex justify-center w-full px-2 mx-auto " key={item.id}>
                <div className="w-full mx-2 " key={item.id}>
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.PRIVACY_RIGHTS.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                    <div>
                      <p className="text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_4}
                      </p>
                      <Link href={item.href}>
                        <a className="font-light text-gray-400 cursor-pointer hover:text-indigo-600">
                          {item.href}
                        </a>
                      </Link>
                    </div>
                    <div className="pt-10">
                      <p className="text-lg font-light leading-8 text-justify text-black">
                        {item.name_2}
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_5}
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_6}
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_7}
                      </p>
                    </div>
                  </div>
                  <div className="pt-10">
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_8}
                    </p>
                    <div>
                      <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                        {item.title_9}
                      </p>
                      <Link href={item.href_2}>
                        <a className="inline font-light text-gray-400 cursor-pointer hover:text-indigo-600">
                          {item.href_2}
                        </a>
                      </Link>
                    </div>

                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_10}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_11}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {PRIVACYPOLICY.CONTROLS_FOR.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

          {PRIVACYPOLICY.DO_CALIFORNIA.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_3}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.DO_WE_MAKE_UPDATE.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 ">
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-lg font-light text-justify text-black">
                      {item.head}
                    </p>
                    <p className="inline text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_1}
                    </p>
                    <p className="text-sm font-light leading-8 text-justify text-gray-500">
                      {item.title_2}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
          {PRIVACYPOLICY.HOW_CAN_YOU_CONTACT.map((item) => {
            return (
              <div
                className="flex justify-center w-full px-2 pb-8 mx-auto "
                key={item.id}
              >
                <div className="w-full mx-2 " >
                  <div className="py-10">
                    <p className="text-lg font-light text-justify text-black">
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <p className="inline text-sm font-light leading-8 text-black">
                      {item.title_1}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div> */}
        <div dangerouslySetInnerHTML={{ __html: data.content }} />

        <ProgressScroll />
      </>
    );
  }
}
