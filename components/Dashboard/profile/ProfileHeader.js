import { CameraIcon } from "@heroicons/react/outline";
import { useState } from "react";
import { useSelector } from "react-redux";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import UpdateAvatarModal from "./UpdateAvatarModal";
import Image from "next/image";
const profileStyles = {
  position: "relative",
  overflow: "hidden",

  "@media (max-width: 900px)": {
    height: "6rem",
    width: "6rem",
  },
};
const ProfileHeader = () => {
  const userData = useSelector((state) => state.auth.userData);

  // State to control update avatar modal visibility
  const [isUpdateAvatarModalVisible, setIsUpdateAvatarModalVisible] =
    useState(false);

  // Update avatar modal visibility logic
  const handleUpdateAvatarClick = () => {
    setIsUpdateAvatarModalVisible(true);
  };
  const handleUpdateAvatarClose = () => {
    setIsUpdateAvatarModalVisible(false);
  };

  return (
    <div>
      {/* Cover image */}
      <div>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: "32vh",
            maxHeight: "12rem",
            minHeight: "8rem",
          }}
        >
          <Image
            src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="cover"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            // loading="eager"
            priority={true}
            className="h-32 w-full object-cover lg:h-48 rounded-t-lg"
          />
        </div>
        {/* <img
          className="h-32 w-full object-cover lg:h-48 rounded-t-lg"
          src="https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
          alt=""
        /> */}
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          {/* Profile pic */}{" "}
          <div className="flex relative">
            {userData && (
              // <img
              //   className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
              //   src={userData.avatar}
              //   alt="avatar"
              // />
              <div
                style={profileStyles}
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32 object-cover"
              >
                <Image
                  src={userData.avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  // loading="eager"
                  priority={true}
                />
              </div>
            )}
            <div
              className="absolute bottom-0 left-14 sm:left-auto sm:right-0 bg-white rounded-full w-10 h-10 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-all"
              onClick={handleUpdateAvatarClick}
            >
              <CameraIcon className="icon-stroke-width-1 w-6 h-6" />
            </div>
          </div>
          {/* Data NEXT TO profile pic (on larger screens) */}
          <div className="flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-center sm:space-x-6 space-y-4 md:space-y-0 sm:pb-1">
            <div className="sm:hidden md:block min-w-0 flex-1">
              <h1 className="text-2xl font-medium text-gray-900 truncate">
                {!!userData && userData.name + " " + userData.last_name}
              </h1>
              <span className="text-gray-600 font-light">
                {!!userData && userData.email}
              </span>
            </div>
            <div className="sm:hidden md:block">
              {/* <button
          type="button"
          className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-light rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
        >
          <MailIcon
            className="-ml-1 mr-2 h-5 w-5 text-gray-700 icon-stroke-width-1"
            aria-hidden="true"
          />
          <span>Message</span>
        </button> */}
            </div>
          </div>
        </div>
        {/* Data BELLOW profile pic (on larger screens) */}
        <div className="hidden sm:flex md:hidden mt-4 min-w-0 flex-1">
          <div>
            <h1 className="text-2xl font-medium text-gray-900 truncate">
              {!!userData && userData.name + " " + userData.last_name}
            </h1>
            <span className="text-gray-600 font-light">
              {!!userData && userData.email}
            </span>
          </div>
          <div className="ml-auto">
            {/* <button
        type="button"
        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-light rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
      >
        <MailIcon
          className="-ml-1 mr-2 h-5 w-5 text-gray-700 icon-stroke-width-1"
          aria-hidden="true"
        />
        <span>Message</span>
      </button> */}
          </div>
        </div>
      </div>

      <BlurBackdrop
        isVisible={isUpdateAvatarModalVisible}
        onClose={handleUpdateAvatarClose}
        className="w-auto sm:mx-auto"
        backdropMode="dark"
      >
        <UpdateAvatarModal onClose={handleUpdateAvatarClose} />
      </BlurBackdrop>
    </div>
  );
};

export default ProfileHeader;
