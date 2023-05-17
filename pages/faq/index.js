import ProgressScroll from "@/components/ProgressScroll/ProgressScroll";
import { getFaq } from "app/api/statics";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { useState } from "react";
import EditorStatics from "@/components/Editor/EditorStatics";
import useSWR from "swr";
import WideCardSkelton from "@/components/Atoms/skeletonLoading/WideCardSkelton";
import CustomHead from "@/components/seo/CustomHead";

export default function Index() {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topicInformation, setTopicInformation] = useState(null);
  async function fetcher() {
    const { data } = await getFaq();
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
          title="FAQ - Nireeka Bikes"
          name="Frequently Asked Questions"
          description="Find answers to commonly asked questions about our products and services."
          available
        />
        {(data.is_admin === 9 || data.is_admin === 1) && (
          <div className="absolute w-full mt-6 md:mt-[105px]">
            <div className="relative w-full max-w-7xl">
              <div className="absolute md:right-20 right-2 ">
                <button
                  onClick={() => setIsShowTopic(true)}
                  className="flex items-center justify-center w-full px-1 py-2 mt-4 font-light border rounded-md text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500"
                >
                  Edit Faq
                </button>
              </div>
            </div>
          </div>
        )}

        <BlurBackdrop
          isVisible={isShowTopic}
          noXButton
          backdropMode="dark"
          className="w-full md:w-[60%]"
        >
          <EditorStatics
            topicInformation={topicInformation}
            setTopicInformation={setTopicInformation}
            onClose={() => setIsShowTopic(false)}
          />
        </BlurBackdrop>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
        <ProgressScroll />
      </>
    );
  }
}
