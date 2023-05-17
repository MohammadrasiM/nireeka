import { Transition } from "@headlessui/react";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { useCallback, useRef, useEffect, Fragment } from "react";
import dynamic from "next/dynamic";
import classNames from "../../../functions/classNames";

const EmojiPickerButton = (props) => {
  const EmojiPicker = dynamic(() => import("emoji-picker-react"));
  const emojiPickerRef = useRef();
  const { onClickOutside } = props;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);

  return (
    <div
      ref={emojiPickerRef}
      className={classNames(
        "rounded-full relative inline-flex items-center justify-center text-gray-500 hover:text-gray-500",
        props.className
      )}
    >
      <EmojiHappyIcon
        className="w-5 h-5 icon-stroke-width-1 cursor-pointer"
        onClick={props.onClick}
      />
      <span className="sr-only">Add emoji</span>
      <Transition
        show={props.isPickerVisible}
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="absolute bottom-0 left-5 sm:top-5 z-20">
          <EmojiPicker
            disableSkinTonePicker={true}
            disableSearchBar={true}
            onEmojiClick={props.onEmojiClick}
          />
        </div>
      </Transition>
    </div>
  );
};

export default EmojiPickerButton;
