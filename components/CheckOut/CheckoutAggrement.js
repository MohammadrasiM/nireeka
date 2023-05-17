import React, {useEffect, useMemo, useState} from "react";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import {XIcon} from "@heroicons/react/outline";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import {useDispatch, useSelector} from "react-redux";
import {getRRPolicyPending, getTermsPending, getPrivacyPolicyPending} from "app/store/staticSlice";
import LoadingNireeka from "@/components/Atoms/LoadingNireeka";

const CheckoutAggrement = ({textColor}) => {
    const dispatch = useDispatch();
    const [showDetailModal, setShowDetailModal] = useState(null);

    const terms = useSelector((state) => state?.static.terms);
    const termsIsLoading = useSelector((state) => state?.static.getTermsIsLoading);
    const rrPolicy = useSelector((state) => state?.static.rrPolicy);
    const rrPolicyIsLoading = useSelector((state) => state?.static.getRRPolicyIsLoading);
    const privacyPolicy = useSelector((state) => state?.static.privacyPolicy);
    const privacyPolicyIsLoading = useSelector((state) => state?.static.getPrivacyPolicyIsLoading);

    const onCloseModal = () => {
        document.getElementsByTagName("body")[0].style.overflow = "auto";
        setShowDetailModal(null);
    }

    const {data, isLoading} = useMemo(() => {
        switch (showDetailModal) {
            case 'terms': return {data: terms, isLoading: termsIsLoading}
            case 'rrPolicy': return {data: rrPolicy, isLoading: rrPolicyIsLoading}
            case 'privacyPolicy': return {data: privacyPolicy, isLoading: privacyPolicyIsLoading}
            default: return {data: null, isLoading: false}
        }
    }, [showDetailModal, terms, termsIsLoading, rrPolicy, rrPolicyIsLoading, privacyPolicy, privacyPolicyIsLoading]);

    useEffect(() => {
        if(showDetailModal === 'terms' && !terms) dispatch(getTermsPending());
        else if(showDetailModal === 'rrPolicy' && !rrPolicy) dispatch(getRRPolicyPending());
        else if(showDetailModal === 'privacyPolicy' && !privacyPolicy) dispatch(getPrivacyPolicyPending());
    }, [showDetailModal])

    return (
        <>
        <span className={`text-xs font-light sm:text-sm block ${textColor}`}>
          By continuing I agree to the
          <span className="text-blue-600 hover:text-blue-400 cursor-pointer" onClick={() => setShowDetailModal('terms')}>
              {` Terms of Use`}
          </span>
          ,
          <span className="text-blue-600 hover:text-blue-400 cursor-pointer" onClick={() => setShowDetailModal('rrPolicy')}>
              {` Refund&Return Policy `}
          </span>
          and have read and understand the
          <span className="text-blue-600 hover:text-blue-400 cursor-pointer" onClick={() => setShowDetailModal('privacyPolicy')}>
              {` Privacy Policy`}
          </span>
          .
        </span>
        <BlurBackdrop
            isVisible={!!showDetailModal}
            onClose={onCloseModal}
            backdropColorClass="bg-black/40"
            noXButton
            className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl mb-[5vh]"
            customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
        >
            <WhiteShadowCard>
                <div className="flex items-center justify-end">
                    <button type="button" className="text-gray-400 hover:text-gray-500" onClick={onCloseModal}>
                        <span className="sr-only">Close</span>
                        <XIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                </div>
                {!data && isLoading? (
                    <div className="flex justify-center">
                        <LoadingNireeka className="w-10 h-10 border-gray-600" />
                    </div>
                ) : data ? (
                    <div className="flex flex-col">
                        <div className="static-modal-content max-h-[50vh] md:max-h-[60vh] flex-1 overflow-auto" dangerouslySetInnerHTML={{ __html: data?.content }} />
                        <div className="flex flex-col sm:flex-row-reverse items-center space-y-4 sm:space-y-0 justify-between mt-8">
                            <button onClick={onCloseModal} type="button" className="px-4 py-2 text-sm font-medium w-full sm:w-fit text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                                Accept & Close
                            </button>
                            <button onClick={onCloseModal} type="button" className="px-4 py-2 w-full sm:w-fit text-sm font-medium bg-white text-red-600 border border-red-600 rounded-md shadow-sm hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                                Deny
                            </button>
                        </div>
                    </div>
                ) : null}
            </WhiteShadowCard>
        </BlurBackdrop>
        </>
    )
}

export default CheckoutAggrement;