import WhiteShadowCard from "../../cards/WhiteShadowCard";

const DashboardIndexSkeleton = () => {
  return (
    <div className="space-y-4">
      <WhiteShadowCard className="animate-pulse overflow-hidden" noPadding>
        <div className="grid grid-cols-6 grid-rows-6 h-full">
          <div className="col-span-6 md:col-span-3 row-span-3 space-y-10 p-8 flex flex-col justify-between border-r border-b">
            <div className="w-12 h-12 rounded-md bg-gray-200"></div>
            <div className="space-y-3">
              <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
              <div className="w-56 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-6 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 row-span-3 space-y-10 p-8 flex flex-col justify-between border-b">
            <div className="w-12 h-12 rounded-md bg-gray-200"></div>
            <div className="space-y-3">
              <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
              <div className="w-56 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-6 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 row-span-3 space-y-10 p-8 flex flex-col justify-between border-r">
            <div className="w-12 h-12 rounded-md bg-gray-200"></div>
            <div className="space-y-3">
              <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
              <div className="w-56 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-6 rounded-full bg-gray-200"></div>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3 row-span-3 space-y-10 p-8 flex flex-col justify-between border-r">
            <div className="w-12 h-12 rounded-md bg-gray-200"></div>
            <div className="space-y-3">
              <div className="w-20 h-10 bg-gray-200 rounded-md"></div>
              <div className="w-56 h-3 bg-gray-200 rounded-full"></div>
              <div className="w-32 h-6 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
      </WhiteShadowCard>

      <WhiteShadowCard className="flex flex-col md:flex-row divide-x animate-pulse" noPadding>
        <div className="p-8 flex-1 space-y-8">
          <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
          <div className="flex justify-between">
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-32 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="p-8 flex-1 space-y-8">
          <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
          <div className="flex justify-between">
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-32 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>
        <div className="p-8 flex-1 space-y-8">
          <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
          <div className="flex justify-between">
            <div className="w-10 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-32 h-6 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </WhiteShadowCard>
    </div>
  );
};

export default DashboardIndexSkeleton;
