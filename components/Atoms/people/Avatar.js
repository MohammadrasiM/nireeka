import UserInfoModal from "./UserInfoModal";
import { Transition } from "@headlessui/react";
import { useEffect, useRef, useState } from "react";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import { getUserModalData } from "../../../app/api/user";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import Image from "next/image";
import classNames from "../../../functions/classNames";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.md);

const Avatar = (props) => {
  const userInfoModalContainer = useRef();

  const [isUserInfoModalVisible, setIsUserInfoModalVisible] = useState(false);
  const [isFetchPending, setIsFetchPending] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [timerId, setTimerId] = useState(null);
  // By default the UserInfoModal pops on the right of the element (has left-0 class)
  // by some calculation the modal might appear on the left (if it couldn't fit the screen)
  const [modalPopsLeft, setModalPopsLeft] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Online status circle
  let statusLightComponent = <></>;
  if (props.user.is_online) {
    statusLightComponent = (
      <span className="block border border-white h-3 w-3 rounded-full bg-avatarDarkGreen"></span>
    );
  } else {
    if (props.user.last_seen !== 0) {
      statusLightComponent = (
        <span className="block border border-white min-w-3 px-1 rounded-full bg-avatarLightGreen text-avatarDarkGreen text-xs">
          {props.user.last_seen}
        </span>
      );
    }
  }

  // User info modal logic
  const getUserInfo = async () => {
    if (props.noUserInfoModal) return;
    try {
      setIsFetchPending(true);
      const res = await getUserModalData(props.user.id);
      setModalData(res.data);
      setIsFetchPending(false);
    } catch (error) {}
  };

  const handleMouseEnterName = async () => {
    if (props.noUserInfoModal) return;
    const timerId = setTimeout(() => {
      getUserInfo();
      setIsUserInfoModalVisible(true);
    }, 750);
    setTimerId(timerId);
  };

  const handleMouseLeaveName = () => {
    if (props.noUserInfoModal) return;
    clearTimeout(timerId);
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
      className="relative flex items-start justify-center"
      onMouseEnter={handleMouseEnterName}
      onMouseLeave={handleMouseLeaveName}
      ref={userInfoModalContainer}
    >
      <span className="w-10 h-10">
        <Image
          width={40}
          height={40}
          objectFit="cover"
          className={classNames(
            "w-10 h-10 object-cover rounded-full max-w-none",
            !props.noUserInfoModal && "cursor-pointer"
          )}
          src={props.user.avatar}
          alt={`avatar-${props.full_name ? props.full_name : ""}`}
        />
      </span>
      <span className="absolute bottom-1 right-1 transform translate-y-1/2 translate-x-1/2 block rounded-full">
        {statusLightComponent}
      </span>
      {!props.noUserInfoModal && windowWidth > mdScreenBreakPointInPixels && (
        <Transition
          show={isUserInfoModalVisible}
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

export default Avatar;
