import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import DangerButton from "../buttons/DangerButton";
import PrimaryButton from "../buttons/PrimaryButton";
import WhiteButton from "../buttons/WhiteButton";

const Modal2BtnAlert = (props) => {
  let PrimaryButtonComponent = PrimaryButton;
  if (props.primaryButtonType === "danger")
    PrimaryButtonComponent = DangerButton;

  return (
    <Transition.Root show={props.isVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-[70] overflow-y-auto"
        onClose={props.onDismiss}
      >
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
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
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="flex justify-center flex-shrink-0 w-16 h-16 mx-auto sm:mx-0 sm:h-10 sm:w-10">
                  {props.icon}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {props.title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">{props.message}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5 space-x-3 sm:mt-4">
                <WhiteButton
                  onClick={props.onSecondaryClick}
                  className="w-full sm:w-auto"
                >
                  {props.secondaryButton}
                </WhiteButton>
                <PrimaryButtonComponent
                  onClick={props.onPrimaryClick}
                  className="w-full sm:w-auto"
                >
                  {props.primaryButton}
                </PrimaryButtonComponent>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal2BtnAlert;
