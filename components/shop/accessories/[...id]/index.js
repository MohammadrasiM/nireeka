import ImageGallery from "react-image-gallery";
import Header from "@/components/Static/Header";
import Footer from "@/components/Static/Footer";

const images = [
  {
    original:
      "https://api.nireeka.com/storage/product/vRmzyURvabcupUGhdMsghIoILCua5GedmBZ2yKMj.jpeg",
    thumbnail:
      "https://api.nireeka.com/storage/product/vRmzyURvabcupUGhdMsghIoILCua5GedmBZ2yKMj.jpeg",
  },
  {
    original:
      "https://api.nireeka.com/storage/product/Ffewys9fGG6LZNvV3v9No4pgq4phTEZhcuUiti7p.jpeg",
    thumbnail:
      "https://api.nireeka.com/storage/product/Ffewys9fGG6LZNvV3v9No4pgq4phTEZhcuUiti7p.jpeg",
  },
  {
    original:
      "https://api.nireeka.com/storage/product/6G7OwsyyFBtLmt0orscMqOhJqAJuQBs0ycfsBWEg.jpeg",
    thumbnail:
      "https://api.nireeka.com/storage/product/6G7OwsyyFBtLmt0orscMqOhJqAJuQBs0ycfsBWEg.jpeg",
  },
  {
    original:
      "https://api.nireeka.com/storage/product/z5UzaUgSIYhkmuDAjpcWuA96c6hwyToy6fJfU2Qm.jpeg",
    thumbnail:
      "https://api.nireeka.com/storage/product/z5UzaUgSIYhkmuDAjpcWuA96c6hwyToy6fJfU2Qm.jpeg",
  },
];

export default function Index() {
  return (
    <>
      {" "}
      <Header />
      <div className="flex justify-center pt-40 pb-16 mx-auto w-900">
        <div className="w-1/2">
          <ImageGallery
            items={images}
            slideInterval={5000}
            slideDuration={1000}
            showBullets
            originalHeight
          />
        </div>
        <div className="w-1/2 pl-3">
          <h3 className="pb-12 text-4xl font-light text-center">
            Nireeka Helmet
          </h3>
          <div className="flex justify-start">
            <div className="flex justify-start px-2 ">
              <div className="flex justify-start pt-1.5">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="yellow"
                  viewBox="0 0 24 24"
                  stroke="gray"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
            </div>
            <p className="px-2 pt-1 text-lg font-light text-gray-600">{`(1 custom review)`}</p>
          </div>
          <div className="flex justify-start px-2 pt-4">
            <p className="text-xl font-light">{`$99 USD `}</p>
            <p className="px-1 text-xl font-light text-gray-600 line-through decoration-red-500 ">{` ($149 USD)`}</p>
          </div>

          <p className="px-2 pt-4 text-lg font-light ">
            Keep the entire family safe with Nireeka helmets for men, women, and
            teenagers.
          </p>
          <hr className="my-5" />
          <div className="pt-2">
            <div className="relative flex flex-row w-full h-10 mt-1 bg-transparent rounded-lg">
              <button
                data-action="decrement"
                className="w-5 h-full text-gray-600 bg-gray-300 rounded-l outline-none cursor-pointer hover:text-gray-700 hover:bg-gray-400"
              >
                <span className="m-auto text-2xl font-thin">−</span>
              </button>
              <input
                type="number"
                className="flex items-center w-10 pl-2 font-light text-center text-gray-700 bg-gray-300 outline-none focus:outline-none text-md hover:text-black focus:text-black md:text-basecursor-default"
                
                value="0"
              />
              <button
                data-action="increment"
                className="w-5 h-full text-gray-600 bg-gray-300 rounded-r cursor-pointer hover:text-gray-700 hover:bg-gray-400"
              >
                <span className="m-auto text-2xl font-thin">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
