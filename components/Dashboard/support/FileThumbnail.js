import { Transition } from "@headlessui/react";
import { DocumentIcon, DownloadIcon, XIcon } from "@heroicons/react/outline";
import { Fragment, useCallback, useEffect, useState } from "react";
import classNames from "../../../functions/classNames";
import { createFileFromPath } from "../../../functions/createFileFromPath";
import { getPrettyFileSize } from "../../../functions/getPrettyFileSize";
import XButton from "../../Atoms/XButton";

const FileThumbnail = (props) => {
  const [shouldTruncateFileName, setShouldTruncateFileName] = useState(true);
  const [fileSize, setFileSize] = useState("");
  const fileIsFileType = props.file instanceof File;

  const getData = useCallback(async () => {
    const file = { ...props.file };
    if (!fileIsFileType) {
      file = await createFileFromPath(props.file.path);
    }

    if (!!file && file.size) {
      setFileSize(getPrettyFileSize(file.size));
    }
  }, [fileIsFileType, props.file]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleMouseOverFileName = () => {
    setShouldTruncateFileName(false);
  };

  const handleMouseLeaveFileName = () => {
    setShouldTruncateFileName(true);
  };

  return (
    <li className={classNames("relative w-20", props.className)}>
      <div className="relative flex ring-1 ring-indigo-500 w-20 aspect-square rounded-lg bg-gray-100 overflow-hidden">
        <DocumentIcon className="w-12 h-12 icon-stroke-width-1 text-gray-500 mx-auto self-center" />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {props.file.name}</span>
        </button>
        <div
          className="absolute flex items-center justify-center bottom-0 bg-blue-400 opacity-75 w-full cursor-pointer"
          onClick={() =>
            window.open(
              fileIsFileType ? URL.createObjectURL(props.file) : props.file.path,
              "_blank"
            )
          }
        >
          <DownloadIcon className="w-7 h-7 icon-stroke-width-1 text-white" />
        </div>
        {!!props.hasXButton && (
          <div className="absolute flex items-center justify-center top-1 left-1 cursor-pointer">
            <XButton className="w-5 h-5" onClick={props.onXClick} />
          </div>
        )}
      </div>
      <div
        className="relative"
        onMouseOver={handleMouseOverFileName}
        onMouseLeave={handleMouseLeaveFileName}
      >
        <p className="mt-2 w-full text-sm font-medium text-gray-900 truncate pointer-events-none">
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
          <div className="max-w-sm shadow-md absolute top-500 -translate-y-500 bg-white z-10 p-2">
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
            {!!fileSize && (
              <p className="block text-sm font-medium text-gray-500 pointer-events-none mt-2">
                {fileSize}
              </p>
            )}
          </div>
        </Transition>
        {!!fileSize && (
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">{fileSize}</p>
        )}
      </div>
    </li>
  );
};

export default FileThumbnail;
