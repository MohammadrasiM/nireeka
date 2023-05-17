import Link from "next/link";

const MainHelpCenter = ({ Help }) => {
  return (
    <div>
      <div className="bg-gray-100">
        <div className="flex flex-wrap w-full px-1 py-5 mx-auto lg:py-12 lg:px-4 lg:w-8/12 ">
          {/* map */}
          {Help.data.map((card) => {
            return (
              <div className="w-full p-4 md:w-1/2 " key={card.id}>
                <Link href={`help-center/category/${card.slug}`}>
                  <a>
                    <div className="h-40 px-6 pt-8 transition-all bg-white border rounded-md cursor-pointer border-customColorNIR hover:border-indigo-500">
                      <h6 className="text-xl font-light ">
                        {card.title}
                      </h6>
                      <p className="pt-2 text-sm font-light text-gray-500 ">
                        {card.description}
                      </p>
                    </div>
                  </a>
                </Link>
              </div>
            );
          })}

          {/* map */}
        </div>
        <div className="flex-col pt-0 pb-10 text-center bg-gray-100 md:pt-5 md:pb-16 align-center">
          <h2 className="text-lg font-light md:text-4xl lg:py-2">
            Can’t find your answer?
          </h2>
          <p className="py-2 pt-2 pb-5 text-sm font-light text-gray-500 ">
            Contact us and we’ll get back to you as soon as we can
          </p>
          <Link href="contact">
            <a
              className="px-4 py-2 mt-3 text-sm font-light text-white border border-transparent rounded-md shadow-sm bg-customColorNIR hover:border-customColorNIR hover:bg-transparent hover:text-customColorNIR focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              target="_blank"
            >
              Contact Us
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainHelpCenter;
