import Link from "next/link";
import React from "react";
const items = [
  {
    id: 1,
    title: "38 MPH (60 KPH)",
    subtitle: "MAX SPEED",
    img: "../../../images/prime/ico-speed.svg",
  },
  {
    id: 2,
    title: "52 MILES (80 KM)",
    subtitle: "MAX RANGE",
    img: "../../../images/prime/ico-map.svg",
  },
  {
    id: 3,
    title: "750 to 1500W/160NM",
    subtitle: "MAX POWER/TORQUE",
    img: "../../../images/prime/ico-gear.svg",
  },
];
function DetailsIntroducing() {
  return (
    <div>
      {" "}
      <div className="flex-row justify-center hidden w-4/6 py-4 mx-auto md:flex">
        {items.map((item) => {
          return (
            <div
              key={item.id}
              className={`w-full p-1 md:mt-1 justify-center items-center flex flex-col mt-2 `}
            >
              <img
                alt={item.title}
                src={item.img}
                className="w-12 fill-slate-50 "
              />
              <p className="font-medium text-gray-100 text-md ">{item.title}</p>
              <p className="text-sm font-light text-gray-300">
                {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center w-full mx-auto">
        <div className="flex justify-center w-4/5 md:w-[340px]">
          <Link href={"/configurator"}>
            <a className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-red-500 rounded-full md:w-40 hover:bg-white hover:outline-gray-300  hover:text-black">
              BUY NOW
            </a>
          </Link>
          <Link href={"/configurator/nireeka-prime"}>
            <a className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-gray-400 rounded-full md:w-40 hover:bg-white hover:outline-gray-300 hover:text-black">
              Build your own
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsIntroducing;
