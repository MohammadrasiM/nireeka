import LoadingNireeka from "@/components/Atoms/LoadingNireeka";
import { userDataPending } from "app/store/authSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserPrivacySettings } from "../../../app/api/user/profile";
import NireekaSwitch from "../../Atoms/inputs/NireekaSwitch";

const PrivacySettings = () => {
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.auth.userData);
  const isUserDataLoading = useSelector((state) => state.auth.isUserDataLoading);

  const [isShowCountryEnabled, setIsShowCountryEnabled] = useState(userData.show_country);
  const [isLeaderboardEnabled, setIsLeaderboardEnabled] = useState(userData.show_in_leaderboard);

  const [isShowCountryLoading, setIsShowCountryLoading] = useState(false);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);

  useEffect(() => {
    dispatch(userDataPending());
  }, [dispatch]);

  useEffect(() => {
    setIsShowCountryEnabled(userData.show_country);
    setIsLeaderboardEnabled(userData.show_in_leaderboard);
  }, [userData]);

  const handleShowCountrySwitchChange = async (toSet) => {
    try {
      setIsShowCountryLoading(true);
      const res = await updateUserPrivacySettings({
        show_country: toSet,
        show_in_leaderboard: isLeaderboardEnabled,
      });
      setIsShowCountryEnabled(toSet);
    } catch (error) {
      console.log(error)
    } finally {
      setIsShowCountryLoading(false);
    }
  };

  const handleLeaderboardSwitchChange = async (toSet) => {
    try {
      setIsLeaderboardLoading(true);
      const res = await updateUserPrivacySettings({
        show_in_leaderboard: toSet,
        show_country: isShowCountryEnabled,
      });
      setIsLeaderboardEnabled(toSet);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLeaderboardLoading(false);
    }
  };

  return (
    <div className="my-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {isUserDataLoading ? (
        <div className="flex justify-center">
          <LoadingNireeka className="w-7 h-7 border-gray-700" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <NireekaSwitch
              width={50}
              height={25}
              enabled={isShowCountryEnabled}
              label="Show my country"
              onChange={handleShowCountrySwitchChange}
              isLoading={isShowCountryLoading}
              isInline
            />
          </div>
          <div className="relative">
            <NireekaSwitch
              width={50}
              height={25}
              enabled={isLeaderboardEnabled}
              label="Show me in leaderboard"
              onChange={handleLeaderboardSwitchChange}
              isLoading={isLeaderboardLoading}
              isInline
            />
          </div>
        </div>
      )}
    </div>
  );
};
export default PrivacySettings;
