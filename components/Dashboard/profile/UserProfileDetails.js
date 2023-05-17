import { PencilAltIcon } from "@heroicons/react/outline";
import { useState } from "react";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import EditProfileModal from "./EditProfileModal";
import ProfileFields from "./ProfileFields";

const UserProfileDetails = () => {
  // State to control edit profile modal visibility
  const [isEditProfileModalVisible, setIsEditProfileModalVisible] =
    useState(false);

  // Edit profile modal visibility logic
  const handleEditProfileClick = () => {
    setIsEditProfileModalVisible(true);
  };
  const handleEditProfileClose = () => {
    setIsEditProfileModalVisible(false);
  };

  return (
    <div>
      <div className="flex justify-end mt-3 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p
          className="font-light text-blue-600 flex items-center space-x-1 cursor-pointer"
          onClick={handleEditProfileClick}
        >
          <PencilAltIcon className="w-4 h-4 icon-stroke-width-1" />
          <span>Edit</span>
        </p>
      </div>
      <ProfileFields />

      <BlurBackdrop
        isVisible={isEditProfileModalVisible}
        onClose={handleEditProfileClose}
        className="w-full md:w-[43rem] xl:w-[50rem]"
        backdropMode="dark"
      >
        <EditProfileModal onClose={handleEditProfileClose} />
      </BlurBackdrop>
    </div>
  );
};

export default UserProfileDetails;
