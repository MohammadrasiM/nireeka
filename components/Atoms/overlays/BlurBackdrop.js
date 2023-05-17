import { Fragment, useRef } from "react";
import { Transition } from "@headlessui/react";
import XButton from "../XButton";
import classNames from "../../../functions/classNames";
import OverlayPortal from "./OverlayPortal";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

const BlurBackdrop = (props) => {
  const contentContainerRef = useRef();
  const parentContainerRef = useRef();

  const handleOutsideClick = (e) => {
    handleClose(e);
  };

  useOutsideClick(contentContainerRef, parentContainerRef, handleOutsideClick);

  const handleOpen = () => {
    document.getElementsByTagName("body")[0].style.overflow = "hidden";

    if (typeof props.onOpen === "function") props.onOpen();
  };
  const handleClose = (e) => {
    if (props.onClose) {
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      props.onClose(e);
    }
  };

  if (props.isVisible) handleOpen();

  return (
    <OverlayPortal>
      <div ref={parentContainerRef}>
        <Transition.Root show={props.isVisible} as={Fragment}>
          <div
            className={classNames(
              "fixed inset-0 flex w-full min-h-screen px-4 py-6 md:px-6 md:py-10 z-[10000] overflow-y-auto bg-fully-transparent md:cursor-pointer",
              props.backdropMode === "dark" &&
                !props.noBackdrop &&
                !props.backdropColorClass &&
                "bg-black/80",
              props.backdropColorClass,
              !props.noBackdrop && "backdrop-blur-sm",
              "overflow-y-scroll" // add this class for scroll-y
            )}
            // style={props.customStyle}
          >
            {!props.noXButton && (
              <XButton
                onClick={(e) => handleClose(e)}
                className="absolute z-20 p-2 top-6 left-6 w-9 h-9"
              />
            )}
            <div
              className={classNames("m-auto cursor-auto", props.className)}
              ref={contentContainerRef}
              style={{
                maxHeight: "calc(100vh - 2rem)",
                overflowY: "auto",
                // add custom scrollbar styles
                scrollbarWidth: "thin",
                scrollbarColor: "#A0AEC0 transparent",
                paddingRight: "0.5rem", // add some right padding for the scrollbar
              }}
            >
              {/* add this style to hide scrollbar buttons */}
              <style>
                {`
      .fixed.inset-0::-webkit-scrollbar-button {
        display: none;
      }
      .fixed.inset-0::-webkit-scrollbar {
        width: 1px;
        height: 1px;
      }
      .fixed.inset-0::-webkit-scrollbar-track {
        background-color: #F3F4F6;
        border-radius: 1px;
      }
      .fixed.inset-0::-webkit-scrollbar-thumb {
        background-color: #A0AEC0;
        border-radius: 6px;
      }
    `}
              </style>

              <Transition.Child
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="transform opacity-0 scale-50"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-50"
              >
                <div className="h-full">{props.children}</div>
              </Transition.Child>
            </div>
          </div>
        </Transition.Root>
      </div>
    </OverlayPortal>
  );
};

export default BlurBackdrop;
