import React from "react";

function WideCardSkelton() {
  return (
    <div className="pt-16 animate-pulse">
      <div className="px-4 py-10 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mx-auto align-center">
          <div className="w-1/4 h-12 font-light text-indigo-600 uppercase bg-gray-200 rounded-2xl sm:tracking-tight md:text-2xl"></div>
          <div className="w-1/3 h-16 mt-3 text-5xl font-light text-gray-900 bg-gray-200 rounded-2xl"></div>
          <div className="w-1/2 max-w-xl mx-auto mt-5 text-xl bg-gray-200 rounded-2xl h-28 "></div>
        </div>
      </div>
      <div className="h-screen max-w-md px-4 py-10 mx-auto bg-gray-200 sm:max-w-3xl sm:py-10 sm:px-6 lg:max-w-7xl lg:px-8 rounded-2xl">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8"></div>
      </div>
    </div>
  );
}

export default WideCardSkelton;
