const OrderPageTabsSkeleton = () => {
  return (
    <div className="relative h-12 z-0 rounded-lg flex animate-pulse divide-x bg-white">
      <div className="flex-1 flex justify-center items-center">
        <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
      </div>
      <div className="flex-1 flex justify-center items-center">
        <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
};

export default OrderPageTabsSkeleton;
