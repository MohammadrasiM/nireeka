import WhiteShadowCard from "../../cards/WhiteShadowCard";

const OrderCardSkeleton = () => {
  return (
    <WhiteShadowCard className="space-y-8 py-8 animate-pulse" noPadding>
      <div className="flex items-baseline px-8">
        <div className="w-32 h-8 rounded-md bg-gray-200 mr-4"></div>
        <div className="w-24 h-3 rounded-md bg-gray-200"></div>
        <div className="w-24 h-3 rounded-md bg-gray-200 ml-auto"></div>
      </div>
      <div className="border-b px-8">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-x-8">
          <div className="sm:flex-1 h-32 rounded-lg bg-gray-200"></div>
          <div className="sm:flex-1 space-y-2">
            <div className="w-36 h-4 rounded-full bg-gray-200"></div>
            <div className="w-20 h-3 rounded-full bg-gray-200"></div>
            <div className="w-24 h-3 rounded-full bg-gray-200"></div>
          </div>
          <div className="sm:flex-1 space-y-2">
            <div className="w-36 h-4 rounded-full bg-gray-200"></div>
            <div className="w-20 h-3 rounded-full bg-gray-200"></div>
            <div className="w-24 h-3 rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="flex space-x-4 py-8">
          <div className="w-28 h-8 rounded-lg bg-gray-200"></div>
          <div className="w-28 h-8 rounded-lg bg-gray-200"></div>
          <div className="w-28 h-8 rounded-lg bg-gray-200"></div>
          <div className="w-28 h-8 rounded-lg bg-gray-200"></div>
        </div>
      </div>
      <div className="px-8 space-y-24">
        <div className="w-full h-3 rounded-full bg-gray-200"></div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 space-y-2">
            <div className="w-36 h-4 rounded-full bg-gray-200"></div>
            <div className="w-20 h-3 rounded-full bg-gray-200"></div>
            <div className="w-24 h-3 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1 space-y-2">
            <div className="w-36 h-4 rounded-full bg-gray-200"></div>
            <div className="w-20 h-3 rounded-full bg-gray-200"></div>
            <div className="w-24 h-3 rounded-full bg-gray-200"></div>
          </div>
          <div className="flex-1">
            <div className="flex py-4 justify-between border-b">
              <div className="w-20 h-3 bg-gray-200 rounded-md"></div>
              <div className="w-10 h-3 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex py-4 justify-between border-b">
              <div className="w-20 h-3 bg-gray-200 rounded-md"></div>
              <div className="w-10 h-3 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex py-4 justify-between border-b">
              <div className="w-20 h-3 bg-gray-200 rounded-md"></div>
              <div className="w-10 h-3 bg-gray-200 rounded-md"></div>
            </div>
            <div className="flex py-4 justify-between ">
              <div className="w-20 h-3 bg-gray-200 rounded-md"></div>
              <div className="w-10 h-3 bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default OrderCardSkeleton;
