import WhiteShadowCard from "../../cards/WhiteShadowCard";

const WelcomeCardSkeleton = () => {
  return (
    <WhiteShadowCard className="animate-pulse overflow-hidden" noPadding>
      <div className="p-8 flex space-x-8">
        <div>
          <div className="w-20 h-20 rounded-full bg-gray-200"></div>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
          <div className="w-52 h-3 bg-gray-200 rounded-full"></div>
          <div className="w-12 h-3 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
        <div className="px-6 py-5 text-sm font-light flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="mt-5 mb-1 w-10 h-3 bg-gray-200 rounded-full"></div>
          <div className="mt-2 mb-1 w-14 h-3 bg-gray-200 rounded-full"></div>
        </div>
        <div className="px-6 py-5 text-sm font-light flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="mt-5 mb-1 w-10 h-3 bg-gray-200 rounded-full"></div>
          <div className="mt-2 mb-1 w-14 h-3 bg-gray-200 rounded-full"></div>
        </div>
        <div className="px-6 py-5 text-sm font-light flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="mt-5 mb-1 w-10 h-3 bg-gray-200 rounded-full"></div>
          <div className="mt-2 mb-1 w-14 h-3 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default WelcomeCardSkeleton;
