export const ConfiguratorSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row animate-pulse">
      <div className="flex flex-col xl:flex-row-reverse md:flex-[2] xl:flex-[3]">
        {/* Bike Pic */}
        <div className="xl:flex-[3] px-4 py-8">
          <div className="w-[90%] h-[300px] lg:h-[400px] mx-auto bg-gray-200 rounded-lg sticky top-4"></div>
        </div>
        {/* Performance */}
        <div className="flex-1 px-4 py-8">
          <div className="w-[90%] mx-auto space-y-7 sticky top-4">
            {/* Overall rating */}
            <div>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-32 h-4 rounded-full bg-gray-200"></div>
                <div className="flex items-baseline space-x-3">
                  <div className="w-20 h-20 rounded-md bg-gray-200"></div>
                  <div className="w-16 h-12 rounded-md bg-gray-200"></div>
                </div>
              </div>
            </div>
            {/* Performance bars */}
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-full"></div>
              </div>
              <div className="space-y-2">
                <div className="w-20 h-5 bg-gray-200 rounded-md"></div>
                <div className="w-full h-4 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Upgrades List */}
      <div className="md:flex-1 px-4">
        <div className="border-b py-8">
          <div className="w-20 h-3 bg-gray-200 rounded-md mb-4"></div>
          <div className="w-40 h-8 bg-gray-200 rounded-md mb-2"></div>
          <div className="w-48 h-8 bg-gray-200 rounded-md"></div>

          <div className="mt-8 space-y-2">
            <div className="w-full h-3 bg-gray-200 rounded-md"></div>
            <div className="w-[80%] h-3 bg-gray-200 rounded-md"></div>
            <div className="w-[90%] h-3 bg-gray-200 rounded-md"></div>
          </div>
        </div>
        <div className="flex border-b py-8 space-x-4 items-center">
          <div className="flex-grow h-8 bg-gray-200 rounded-md"></div>
          <div className="w-20 h-4 bg-gray-200 rounded-md"></div>
        </div>
        <div className="border-b py-8">
          <div>
            <div className="w-28 h-8 rounded-md bg-gray-200"></div>
          </div>
          <div className="flex space-x-3 mt-8">
            <div className="flex-1 h-10 rounded-xl bg-gray-200"></div>
            <div className="flex-1 h-10 rounded-xl bg-gray-200"></div>
          </div>
        </div>
        <div className="border-b py-8">
          <div>
            <div className="w-24 h-8 rounded-md bg-gray-200"></div>
          </div>
          <div className="mt-8">
            <div className="w-16 h-3 rounded-md bg-gray-200 mb-3"></div>
            <div className="flex space-x-3 mb-8">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
            <div className="w-16 h-3 rounded-md bg-gray-200 mb-3"></div>
            <div className="flex space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
              <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="border-b py-8">
          <div className="space-y-2">
            <div className="w-24 h-8 rounded-md bg-gray-200"></div>
            <div className="w-52 h-3 rounded-md bg-gray-200"></div>
          </div>
          <div className="mt-8 flex space-x-4">
            <div className="flex-1 h-28 bg-gray-200 rounded-xl"></div>
            <div className="flex-1 h-28 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
        <div className="border-b py-8">
          <div className="space-y-2">
            <div className="w-24 h-8 rounded-md bg-gray-200"></div>
            <div className="w-52 h-3 rounded-md bg-gray-200"></div>
          </div>
          <div className="mt-8 flex flex-wrap">
            <div className="flex-1 h-28 bg-gray-200 rounded-xl mr-4 mb-4"></div>
            <div className="flex-1 h-28 bg-gray-200 rounded-xl"></div>
            <div className="basis-full h-28 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
