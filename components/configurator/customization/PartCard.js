import { CogIcon, InformationCircleIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useState } from "react";
import classNames from "../../../functions/classNames";
import ModalPartInfo from "../../Atoms/modals/ModalPartInfo";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import SafeHTMLWithoutAnyTag from "../../SafeHtml/SafeHTMLWithoutAnyTag";

export default function PartCard(props) {
  const [isPartInfoModalVisible, setIsPartInfoModalVisible] = useState(false);
  return (
    <>
      <div
        className={classNames(
          props.isSelected ? "border-blue-800" : "border-gray-300",
          props.isWide ? "col-span-2" : "col-span-1 sm:col-span-2 lg:col-span-1",
          "border-2 rounded-lg flex flex-col justify-center px-3 py-2",
          props.isDisabled ? "cursor-not-allowed opacity-50 -z-10" : "cursor-pointer",
          props.className
        )}
        onClick={!props.isDisabled ? props.onClick : null}
      >
        <div className="flex justify-center transition-all-children">
          {props.part.cover_image_path ? (
            <Image
              alt={props.part.title}
              className="w-auto rounded-md"
              width={80}
              height={80}
              objectFit="contain"
              src={props.part.cover_image_path}
            />
          ) : (
            <CogIcon className="w-16 h-16 icon-stroke-width-1" />
          )}
        </div>
        <div className="flex justify-center my-0">
          <span className="font-normal text-center">{props.part.title}</span>
        </div>
        <div className="relative flex justify-center items-center text-xs sm:text-sm font-light text-gray-400 mx-1">
          <span className="px-7 block max-w-full">
            <SafeHTMLWithoutAnyTag
              dirtyHtml={props.part.short_description}
              className="text-left whitespace-nowrap overflow-hidden block w-full text-ellipsis"
            />
          </span>
          <span className="absolute right-0" onClick={(e) => e.stopPropagation()}>
            <a
              onClick={() => setIsPartInfoModalVisible(true)}
              className="cursor-pointer text-xs font-semibold text-center text-gray-500 hover:text-gray-700 rounded-lg transition-colors"
            >
              <InformationCircleIcon className="w-5 h-5 icon-stroke-width-1" />
            </a>
          </span>
        </div>
        <div className="flex justify-center items-center py-1">
          <span className="text-xl font-light">
            ${props.part.price ? props.part.price : 0}
          </span>
        </div>
      </div>
      <BlurBackdrop
        onClick={(e) => e.stopPropagation()}
        isVisible={isPartInfoModalVisible}
        onClose={() => setIsPartInfoModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[55rem] min-w-[70%]"
      >
        <ModalPartInfo part={props.part} />
      </BlurBackdrop>
    </>
  );
}
