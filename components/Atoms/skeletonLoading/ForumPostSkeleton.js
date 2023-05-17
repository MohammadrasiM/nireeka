import WhiteShadowCard from "../cards/WhiteShadowCard";

const ForumPostSkeleton = () => {
  return (
    <WhiteShadowCard className="animate-pulse space-y-8">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
        <div className="w-40 h-4 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex flex-col space-y-2">
        <div className="w-[10%] h-4 bg-gray-200 mb-5 rounded-full"></div>
        <div className="w-[90%] h-4 bg-gray-200 rounded-full"></div>
        <div className="w-[95%] h-4 bg-gray-200 rounded-full"></div>
        <div className="w-[80%] h-4 bg-gray-200 rounded-full"></div>
        <div className="w-[100%] h-4 bg-gray-200 rounded-full"></div>
        <div className="w-[50%] h-4 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex space-x-3">
        <div className="w-14 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-14 h-4 bg-gray-200 rounded-full"></div>
        <div className="w-14 h-4 bg-gray-200 rounded-full"></div>
      </div>
    </WhiteShadowCard>
  );
};

export default ForumPostSkeleton;
