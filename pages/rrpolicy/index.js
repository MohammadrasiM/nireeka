import RrPolicy from "@/components/StaticPages/RRPolicy";
import Head from "next/head";
import { getRRPolicy } from "app/api/statics";
import { useState } from "react";
import EditorStatics from "@/components/Editor/EditorStatics";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import TermsSkeltonLoading from "@/components/Atoms/skeletonLoading/TermsSkeltonLoading";
import useSWR from "swr";
import CustomHead from "@/components/seo/CustomHead";

export default function Index() {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topicInformation, setTopicInformation] = useState(null);
  async function fetcher() {
    const { data } = await getRRPolicy();
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
        <CustomHead
          selfTitle
          title="Return & Refund Policy - Nireeka Bikes"
          name="Return and Refund Policy"
          description="Learn about our return and refund policy and how to request a refund."
          keywords={["return policy", "refund policy", "request a refund"]}
          available
        />

        {(data.is_admin === 9 || data.is_admin === 1) && (
          <div className="absolute w-full mt-6 md:mt-[80px]">
            <div className="relative w-full max-w-7xl">
              <div className="absolute md:right-20 right-2 ">
                <button
                  onClick={() => setIsShowTopic(true)}
                  className="flex items-center justify-center w-full px-1 py-2 mt-4 font-light border rounded-md text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500"
                >
                  Edit rrPolicy
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

        <div className="pt-16 md:pt-20">
          <RrPolicy data={data} />
        </div>
        {/* <Footer /> */}
      </>
    );
  }
}
