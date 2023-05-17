import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ConfiguratorHeader from "@/components/configurator/header/ConfiguratorHeader";
import TopicItem from "@/components/HelpCenter/TopicItem";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import {XIcon} from "@heroicons/react/outline";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import {getTopicPending} from "../../../app/store/helpCenterSlice";
import Topic from "@/components/HelpCenter/Topic";

const ConfiguratoyServiceTab = () => {
    const dispatch = useDispatch();
    const [showDetailModal, setShowDetailModal] = useState(null);

    const configuratorData = useSelector((state) => state?.configurator.configuratorData);
    const topic = useSelector((state) => state?.helpCenter.topicData);
    const topicIsLoading = useSelector((state) => state?.helpCenter.getTopicIsLoading);

    const onCloseModal = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        setShowDetailModal(null);
    }

    useEffect(() => {
        if(!!showDetailModal) dispatch(getTopicPending(showDetailModal));
    }, [showDetailModal]);


    if(!configuratorData?.topics?.items?.length) return null

    return (
        <section id="service" className="mt-[100px]">
            <ConfiguratorHeader>
                service
            </ConfiguratorHeader>
            <div className="flex flex-col justify-center items-center space-y-4 mt-3 text-center mb-4">
                {configuratorData?.topics?.items?.map((item) =>
                    <TopicItem key={item.title} item={item} hasBreadcrumb={false} onClick={setShowDetailModal} className="cursor-pointer" />
                )}
            </div>
            <BlurBackdrop
                isVisible={!!showDetailModal}
                onClose={onCloseModal}
                backdropColorClass="bg-black/40"
                noXButton
                className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl"
                customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
            >
                <WhiteShadowCard>
                    <div className="flex items-center justify-end">
                        <button type="button" className="text-gray-400 hover:text-gray-500" onClick={onCloseModal}>
                            <span className="sr-only">Close</span>
                            <XIcon className="w-6 h-6" aria-hidden="true" />
                        </button>
                    </div>
                    {topicIsLoading? (
                        <div className="flex justify-center">
                            <LoadingNireeka className="w-10 h-10 border-gray-600" />
                        </div>
                    ) : topic ? (
                        <Topic topics={{data: topic}} isModal isPageEmbedded />
                    ) : null}
                </WhiteShadowCard>
            </BlurBackdrop>
        </section>
    );
};

export default ConfiguratoyServiceTab;
