import WhiteShadowCard from "../../cards/WhiteShadowCard";
import ForumPostSkeleton from "@/components/Atoms/skeletonLoading/ForumPostSkeleton";
import UserProfileInfoSkeleton from "./UserProfileInfoSkeleton";

const ProfilePageSkeleton = () => {
  return (
    <div className="space-y-14">
      <WhiteShadowCard className="animate-pulse overflow-hidden" noPadding>
        <div className="h-[200px] bg-gray-200"></div>
        <div className="relative flex px-8">
          <div className="w-32 h-32 -mt-16 rounded-full bg-gray-200 border-2 border-white"></div>
          <div className="space-y-3 py-4">
            <div className="w-32 h-6 rounded-full bg-gray-200"></div>
            <div className="w-52 h-4 rounded-full bg-gray-200"></div>
          </div>
        </div>

        <UserProfileInfoSkeleton />
      </WhiteShadowCard>

      <div className="space-y-4">
        <div className="w-44 h-6 rounded-md bg-gray-200"></div>
        <WhiteShadowCard className="flex animate-pulse overflow-hidden" noPadding>
          <div className="flex-1 px-8 py-6 border-r border-gray-200">
            <div className="w-32 h-4 rounded-full bg-gray-200 mx-auto"></div>
          </div>
          <div className="flex-1 px-8 py-6 border-r border-gray-200">
            <div className="w-32 h-4 rounded-full bg-gray-200 mx-auto"></div>
          </div>
          <div className="flex-1 px-8 py-6">
            <div className="w-32 h-4 rounded-full bg-gray-200 mx-auto"></div>
          </div>
        </WhiteShadowCard>

        <ForumPostSkeleton />
      </div>
    </div>
  );
};

export default ProfilePageSkeleton;
