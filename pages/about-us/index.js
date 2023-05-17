import dynamic from "next/dynamic";
import About from "@/components/Home/About/About";
import { getAbout } from "app/api/statics";
import { useState } from "react";
import CustomHead from "@/components/seo/CustomHead";

const BlurBackdrop = dynamic(() => import("@/components/Atoms/overlays/BlurBackdrop"), {ssr: false});
const EditorStatics = dynamic(() => import("@/components/Editor/EditorStatics"), {ssr: false});

function AboutUs({data}) {
  const [isShowTopic, setIsShowTopic] = useState(false);
  const [topicInformation, setTopicInformation] = useState(null);

    return (
        <>
            <CustomHead
                selfTitle
                name={data.title}
                description="Nireeka is an electric mobility company that redefines the biking  experience using its solid, sleek, and gorgeous design and strives to make smarter e-bikes with better performance."
                keywords={["about us", "Nireeka", "bike"]}
                available
            />

            {(data.is_admin === 9 || data.is_admin === 1) && (
                <div className="absolute w-full mt-6 md:mt-[5px]">
                    <div className="relative w-full max-w-7xl">
                        <div className="absolute md:right-20 right-2 ">
                            <button
                                onClick={() => setIsShowTopic(true)}
                                className="flex items-center justify-center w-full px-1 py-2 mt-4 font-light border rounded-md text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500"
                            >
                                Edit About Us
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
            <About data={data} />
        </>
    );
}

export const getStaticProps = async () => {
    const response = await getAbout();

    return {
        props: { data: response.data },
    };
};

export default AboutUs;
