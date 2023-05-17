import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserAvatar } from "../../../app/api/user/profile";
import classNames from "../../../functions/classNames";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import { userDataPending } from "../../../app/store/authSlice";

const UpdateAvatarModal = (props) => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  // Selected picture FILE object to upload
  const [selectedAvatarPic, setSelectedAvatarPic] = useState(null);
  // State to show file size error
  const [fileSizeErrorVisible, setFileSizeErrorVisible] = useState(false);
  // State to show a loading spinner while the picture is uploading
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarPicSelect = (e) => {
    if (e.target.files[0]) {
      if (e.target.files[0].size < 5000000) {
        setSelectedAvatarPic(e.target.files[0]);
        setFileSizeErrorVisible(false);
      } else {
        setFileSizeErrorVisible(true);
      }
    }
  };

  const handleAvatarPicSubmit = async (e) => {
    try {
      setIsLoading(true);
      const avatarForm = new FormData();
      avatarForm.append("avatar", selectedAvatarPic);
      const res = await updateUserAvatar(avatarForm);

      toast.success("Your avatar has been updated successfully!");
      document.getElementsByTagName("body")[0].style.overflow = "auto";
      props.onClose();
      dispatch(userDataPending());
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WhiteShadowCard className="w-auto rounded-lg overflow-hidden" noPadding>
      <div className="h-[50vh]">
        <img
          className="w-full h-full inline-block select-none object-cover"
          src={!selectedAvatarPic ? userData.avatar : URL.createObjectURL(selectedAvatarPic)}
          alt=""
        />
      </div>
      <div className="p-5">
        <div className="mb-3">
          {fileSizeErrorVisible && (
            <p className="text-red-600">* File size is too large. Maximum allowed file size: 5MB</p>
          )}
        </div>
        <div className="flex space-x-3 justify-end ">
          <WhiteButton
            onClick={() => {
              document.getElementsByTagName("body")[0].style.overflow = "auto";
              props.onClose();
            }}
            disabled={isLoading}
          >
            Cancel
          </WhiteButton>
          <PrimaryButton className="px-0 py-0" disabled={isLoading}>
            <label
              htmlFor={isLoading ? "" : "avatar-update-input"}
              className={classNames(
                "w-full h-full px-4 py-2",
                isLoading ? "cursor-not-allowed" : "cursor-pointer"
              )}
            >
              Browse
            </label>
          </PrimaryButton>
          {selectedAvatarPic && (
            <PrimaryButton
              onClick={handleAvatarPicSubmit}
              disabled={isLoading}
              className="space-x-3"
            >
              {isLoading && <LoadingNireeka className="w-4 h-4" />}
              <span>{isLoading ? "Uploading..." : "Save"}</span>
            </PrimaryButton>
          )}
          <input
            id="avatar-update-input"
            className="hidden"
            type="file"
            onChange={handleAvatarPicSelect}
            accept="image/*"
          />
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default UpdateAvatarModal;
