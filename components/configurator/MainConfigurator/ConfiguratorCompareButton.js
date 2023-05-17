import { setBikes } from "app/store/comparisonSlice";
import Link from "next/link";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { toast } from "react-toastify";
import { useComparator } from "services/comparator";
import BlurBackdrop from "components/Atoms/overlays/BlurBackdrop";
import ConfiguratorBike from "components/configurator/ConfiguratorBike";
import {PlusCircleIcon} from "@heroicons/react/outline";
import {getCompareBikeInfoPending} from "app/store/configuratorSlice";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";

const ConfiguratorCompareButton = ({configuratorData}) => {
    const dispatch = useDispatch();
    const { comparator } = useComparator();
    const compareBikeInfo = useSelector((state) => state?.configurator?.compareBikeInfo);
    const compareBikeInfoIsLoading = useSelector((state) => state?.configurator?.compareBikeInfoIsLoading);
    const [showModal, setShowModal] = useState(false);

    const addToCompareDB = async (bikeInfo) => {
        try {
            await comparator.addBike({
                product: configuratorData,
                variation: configuratorData?.variation_details,
                equipmentPrice: configuratorData?.price,
                thumbnail: bikeInfo?.image,
                color: bikeInfo.color,
                size: 0,
                upgrades: bikeInfo?.parts,
            });
        } catch (error) {
            toast.error(error);
        }

        try {
            const bikes = await comparator.getBikes();
            dispatch(setBikes(bikes));
        } catch (error) {
            toast.error(error);
        }
    }

    const handleAddToCompareClick = async () => {
        dispatch(getCompareBikeInfoPending({ id: configuratorData?.id, onSuccess: addToCompareDB }))
        setShowModal(true);
    };
    const handleCloseModal = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        setShowModal(false);
    };
    return (
        <>
            <div onClick={handleAddToCompareClick} className="flex items-center hover:underline mt-3 font-light absolute -top-5 right-1 font-medium z-5 cursor-pointer">
                <PlusCircleIcon className="w-5 h-5 icon-stroke-width-1 mr-2" />
                <span className="text-sm text-gray-600">Compare</span>
            </div>
            {showModal && (
                <BlurBackdrop
                    isVisible
                    backdropMode="dark"
                    onClose={handleCloseModal}
                    className="w-full md:w-[43rem] xl:w-[50rem] min-w-[60%] bg-white">
                    <h4 className="text-center font-light text-2xl pb-5 pt-10">
                        <span>{`${configuratorData?.product?.title || configuratorData?.title}`}</span>
                        <span className=" text-gray-500 font-medium">{configuratorData?.variation?.name || configuratorData?.variation_details?.name}</span> was
                        added to comparison.
                    </h4>
                    {compareBikeInfoIsLoading ? (
                        <div className="flex justify-center pb-10">
                            <LoadingNireeka className="w-10 h-10 border-gray-600" />
                        </div>
                    ) : (
                        <>
                            <ConfiguratorBike
                                className="w-2/3 mx-auto"
                                bikeImageSrc={compareBikeInfo?.image || configuratorData?.image || configuratorData?.variation_image}
                            />
                            <div className="flex w-full mx-auto justify-center mt-12 z-[2] pb-10">
                                <div className="flex justify-center w-[90%] md:w-[340px]">
                                    <button onClick={handleCloseModal} className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-red-500 rounded-full md:w-40 hover:bg-white hover:outline-gray-300  hover:text-black">
                                        Add another bike
                                    </button>
                                    <Link href={"/compare"}>
                                        <a onClick={handleCloseModal} className="flex mx-0.5 justify-center border border-gray-300 w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium transition-all ease-in  bg-transparent rounded-full md:w-40 hover:border-gray-900   text-gray-700">
                                            Go to comparison
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </BlurBackdrop>
            )}
        </>
    );
};

export default ConfiguratorCompareButton;

