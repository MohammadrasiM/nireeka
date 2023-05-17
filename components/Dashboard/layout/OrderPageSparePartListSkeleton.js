import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";

const Row = () => (
  <div className="flex justify-evenly py-6">
    <div className="flex items-center">
      <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex items-center">
      <div className="w-28 h-3 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex items-center">
      <div className="w-12 h-5 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex items-center">
      <div className="w-20 h-5 bg-gray-200 rounded-full"></div>
    </div>
    <div className="flex items-center">
      <div className="w-20 h-3 bg-gray-200 rounded-full"></div>
    </div>
  </div>
);

const OrderPageSparePartListSkeleton = () => {
  return (
    <WhiteShadowCard className="animate-pulse" noPadding>
      <Row />
      <Row />
      <Row />
    </WhiteShadowCard>
  );
};

export default OrderPageSparePartListSkeleton;
