import UserInfoModal from "./UserInfoModal";
import classNames from "../../../functions/classNames";
import Link from "next/link";
import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import { getUserModalData } from "../../../app/api/user";
import WhiteShadowCard from "../cards/WhiteShadowCard";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

const Name = (props) => {
  const userInfoModalContainer = useRef();

  const [isUserInfoModalVisible, setIsUserInfoModalVisible] = useState(false);
  const [isFetchPending, setIsFetchPending] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [hoverTimerId, setHoverTimerId] = useState(null);
  // By default the UserInfoModal pops on the right of the element (has left-0 class)
  // by some calculation the modal might appear on the left (if it couldn't fit the screen)
  const [modalPopsLeft, setModalPopsLeft] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const getUserInfo = async () => {
    if (props.noUserInfoModal) return;
    try {
      setIsFetchPending(true);
      const res = await getUserModalData(props.user.id);

      setIsFetchPending(false);
      setModalData(res.data);
    } catch (error) {}
  };

  const handleMouseEnterName = async () => {
    if (props.noUserInfoModal) return;
    const timerId = setTimeout(() => {
      getUserInfo();
      setIsUserInfoModalVisible(true);
    }, 750);
    setHoverTimerId(timerId);
  };

  const handleMouseLeaveName = () => {
    if (props.noUserInfoModal) return;
    clearTimeout(hoverTimerId);
    setIsUserInfoModalVisible(false);
  };

  useEffect(() => {
    const elementBoundRect = userInfoModalContainer.current.getBoundingClientRect();
    // Checking if the userinfo modal can appear on the right of the hovered element, and if not we show it on the left
    if (document.body.clientWidth - elementBoundRect.left + 10 < 480) {
      setModalPopsLeft(true);
    }
  }, [isUserInfoModalVisible]);

  useEffect(() => {
    if (typeof window !== "undefined") setWindowWidth(window?.document?.body?.clientWidth);
  }, []);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={handleMouseEnterName}
      onMouseLeave={handleMouseLeaveName}
      ref={userInfoModalContainer}
    >
      <Link href={`/profile/${props.user.id}`} passHref>
        <a
          className={classNames(
            "text-gray-900 hover:underline hover:text-blue-600 cursor-pointer",
            props.className
          )}
        >
          {props.children}
        </a>
      </Link>
      {!props.noUserInfoModal && windowWidth > mdScreenBreakPointInPixels && (
        <Transition
          show={isUserInfoModalVisible}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              "absolute top-5 z-40 w-[30rem]",
              modalPopsLeft ? "right-0" : "left-0"
            )}
          >
            {isFetchPending || !modalData ? (
              <WhiteShadowCard className="px-4 py-2 shadow-xl border border-gray-200 space-y-3 flex items-center justify-center">
                <LoadingNireeka className="w-10 h-10 border-gray-600" />
              </WhiteShadowCard>
            ) : (
              <UserInfoModal data={modalData} />
            )}
          </div>
        </Transition>
      )}
    </span>
  );
};

export default Name;
