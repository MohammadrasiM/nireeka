import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { popCurrentModal } from "../../../app/store/modalSlice";
import PrimaryButton from "../buttons/PrimaryButton";
import WhiteButton from "../buttons/WhiteButton";

const Modal2WideBtn = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (Object.keys(props).length === 0) setIsVisible(false);
    else setIsVisible(true);
  }, [props]);

  const handlePrimaryButtonClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(popCurrentModal());
    }, 200);
    if (typeof props.onPrimaryButtonClick === "function") props.onPrimaryButtonClick();
  };
  const handleSecondaryButtonClick = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(popCurrentModal());
    }, 200);
    if (typeof props.onSecondaryButtonClick === "function") props.onSecondaryButtonClick();
  };
  const handleModalDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      dispatch(popCurrentModal());
    }, 200);
    if (typeof props.onDismissClick === "function") props.onDismissClick();
  };

  return (
    <Transition.Root show={isVisible} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={handleModalDismiss}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full sm:p-6">
              <div>
                <div className="mx-auto flex items-center justify-center">{props.icon}</div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{props.description}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 sm:space-y-0 mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <PrimaryButton
                  onClick={handlePrimaryButtonClick}
                  className="w-full flex sm:mt-0 sm:col-start-1 sm:text-sm"
                >
                  {props.primaryButton}
                </PrimaryButton>
                <WhiteButton
                  onClick={handleSecondaryButtonClick}
                  className="w-full flex sm:col-start-2 sm:text-sm"
                >
                  {props.secondaryButton}
                </WhiteButton>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default Modal2WideBtn;
