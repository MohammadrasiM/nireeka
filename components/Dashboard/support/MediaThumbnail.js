import { Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import classNames from "../../../functions/classNames";
import { createFileFromPath } from "../../../functions/createFileFromPath";
import { getPrettyFileSize } from "../../../functions/getPrettyFileSize";
import ImageOverlay from "../../Atoms/overlays/ImageOverlay";
import XButton from "../../Atoms/XButton";

const MediaThumbnail = (props) => {
  const [shouldTruncateFileName, setShouldTruncateFileName] = useState(true);
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);
  const [fileSize, setFileSize] = useState("");
  const fileIsFileType = props.file instanceof File;
  const getData = useCallback(async () => {
    const file = { ...props.file };
    if (!fileIsFileType) {
      file = await createFileFromPath(props.file.path);
    }

    if (!!file && !!file.size) {
      const prettySize = getPrettyFileSize(file.size);
      setFileSize(prettySize);
    }
  }, [fileIsFileType, props.file]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <li className={classNames("relative w-20", props.className)}>
      <div
        className="relative ring-1 ring-offset-2 ring-indigo-500 group block w-20 aspect-square rounded-lg bg-gray-100 overflow-hidden"
        onClick={() => setIsPicOverlaid(true)}
      >
        <Image
          width={80}
          height={80}
          src={fileIsFileType ? URL.createObjectURL(props.file) : props.file.path}
          alt={props.file.name}
          objectFit="cover"
          className="pointer-events-none"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {props.file.name}</span>
        </button>
        {!!props.hasXButton && (
          <div
            className="absolute flex items-center justify-center top-1 left-1 cursor-pointer"
            onClick={(e) => e.stopPropagation()}
          >
            <XButton className="w-5 h-5" onClick={props.onXClick} />
          </div>
        )}
      </div>
      <div
        className="relative"
        onMouseOver={() => setShouldTruncateFileName(false)}
        onMouseLeave={() => setShouldTruncateFileName(true)}
      >
        <p className="mt-2 text-sm font-medium text-gray-900 truncate pointer-events-none">
          {props.file.name}
        </p>
        <Transition
          show={!shouldTruncateFileName}
          as={Fragment}
          enter="transform ease-out duration-100 transition"
          enterFrom="opacity-0 -translate-y-5 scale-y-50"
          enterTo="opacity-100 -translate-y-5 scale-y-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="max-w-sm bg-white shadow-md absolute top-500 -translate-y-500 z-10 p-2">
            <span
              onClick={() =>
                window.open(
                  fileIsFileType ? URL.createObjectURL(props.file) : props.file.path,
                  "_blank"
                )
              }
            >
              <p className="text-sm leading-tight hover:text-blue-500 cursor-pointer">
                {props.file.name}
              </p>
            </span>
            {fileSize && (
              <p className="block text-sm font-medium text-gray-500 pointer-events-none mt-2">
                {!!fileSize}
              </p>
            )}
          </div>
        </Transition>
        {!!fileSize && (
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{fileSize}</p>
        )}
      </div>
      <ImageOverlay
        src={fileIsFileType ? URL.createObjectURL(props.file) : props.file.path}
        alt={props.file.name}
        isVisible={isPicOverlaid}
        onClose={() => setIsPicOverlaid(false)}
        noBackdrop={props.noBackdrop}
        backdropMode={props.backdropMode}
      />
    </li>
  );
};

export default MediaThumbnail;
