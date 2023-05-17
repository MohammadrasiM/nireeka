import React from "react";

function AboutSkeltonLoading() {
  return (
    <div className="px-4 py-12 mx-auto animate-pulse max-w-7xl sm:px-6 lg:px-8 lg:py-24">
      <div className="space-y-12 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0">
        <div className="space-y-5 sm:space-y-4">
          <div className="w-1/2 h-12 text-3xl font-medium bg-gray-200 rounded-2xl sm:text-4xl"></div>
          <div className="w-full h-32 text-sm font-light tracking-tight text-gray-500 bg-gray-200 rounded-2xl"></div>
        </div>
        <div className="lg:col-span-2">
          <div className="space-y-12 sm:divide-y sm:divide-gray-200 sm:space-y-0 sm:-mt-8 lg:gap-x-8 lg:space-y-0">
            <div className="sm:py-8">
              <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                <div className="w-full h-[18rem] bg-gray-200 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 rounded-2xl"></div>
                <div className="sm:col-span-2">
                  <div className="space-y-4">
                    <div className="space-y-1 text-lg font-light leading-6">
                      <div className="w-1/3 h-8 bg-gray-200 rounded-2xl"></div>
                      <div className="w-1/2 h-8 bg-gray-200 rounded-2xl"></div>
                      <div className="w-full h-8 bg-gray-200 rounded-2xl"></div>
                    </div>
                    <div>
                      <div className="w-full bg-gray-200 h-36 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="sm:py-8">
              <div className="space-y-4 sm:grid sm:grid-cols-3 sm:items-start sm:gap-6 sm:space-y-0">
                <div className="w-full h-[18rem] bg-gray-200 aspect-w-3 aspect-h-2 sm:aspect-w-3 sm:aspect-h-4 rounded-2xl"></div>
                <div className="sm:col-span-2">
                  <div className="space-y-4">
                    <div className="space-y-1 text-lg font-light leading-6">
                      <div className="w-1/3 h-8 bg-gray-200 rounded-2xl"></div>
                      <div className="w-1/2 h-8 bg-gray-200 rounded-2xl"></div>
                      <div className="w-full h-8 bg-gray-200 rounded-2xl"></div>
                    </div>
                    <div>
                      <div className="w-full bg-gray-200 h-36 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSkeltonLoading;
