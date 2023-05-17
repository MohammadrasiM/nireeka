const topic = {
  title: "Nireeka Products",
  desc: "Stylish, Carbon Fiber, and affordable. These are the best three words to describe the Nireeka products. Just click on the models below to make your bespoke bike and make it absolutely one of a kind.",
};
const ProductsIntroduction = () => {
  return (
    <>
      <div className="flex justify-center w-full mx-auto mb-4 text-4xl text-center text-gray-700 ">
        <h1 className="py-2 font-light text-center align-middle w-96">
          {topic.title}
          <span className="flex pt-6 mx-auto font-light border-b-4 border-gray-300 border-double w-36"></span>
        </h1>
      </div>
      <div className="flex justify-center w-full">
        <h4 className="w-5/6 font-light text-sm text-center text-gray-500 normal-case md:w-2/6 lp:w-2/6 lg:w-2/6 xl:w-2/6 ">
          {topic.desc}
        </h4>
      </div>
    </>
  );
};

export default ProductsIntroduction;
