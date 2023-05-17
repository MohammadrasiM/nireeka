import { HeartIcon } from "@heroicons/react/solid";
import Image from "next/image";
import React from "react";

const items = [
  {
    id: 1,
    img: "../../../images/landing/heart_1.png",
    title: "Total raised",
    counter: "$1.8m",
  },
  {
    id: 2,
    img: "../../../images/landing/heart_2.png",
    title: "Backers",
    counter: "4.5K+",
  },
  {
    id: 3,
    img: "../../../images/landing/location.png",
    title: "Countries",
    counter: "50+",
  },
];
console.log(items);
function Journey() {
  return (
    <div className="bg-[#181417] -mt-[10px]">
      <div className="flex justify-center p-2 mx-auto">
        <h4 className="pt-2 pb-2 text-lg text-center text-white md:text-xl md:pt-8">
          WELCOME TO OUR SECOND JOURNEY
        </h4>
      </div>
      <div className="flex justify-center w-full">
        {" "}
        <div className="flex justify-between w-[85%]  md:w-[40%]">
          {items.map((item) => {
            return (
              <div className="flex flex-col " key={item.id}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="md:w-[70px] w-[45px] h-auto mx-auto"
                />
                <p className="text-2xl text-center text-white md:text-4xl">
                  {item.counter}
                </p>
                <p className="text-lg text-center text-gray-500 md:text-2xl">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center w-full pt-4">
        <p className="text-lg font-light text-center text-white w-900 ">
          {`More than 1000 backers helped us raised more than $1.8m USD on our
            first campaign on the Indiegogo. We successfully delivered the bikes
            to more than 50 countries. Prime is the result of 18 months of
            product development and campaign management experience. We designed
            the product and campaign based on your feedback.`}
        </p>
      </div>
      <div className="px-6 py-12">
      
      <Image
            src="https://api.nireeka.com/images/landing/homie-prime.jpg"
            width="2500"
            height="1500"
            objectFit="cover"
            className="w-full h-auto "
            alt="Nireeka Prime"
          />
      </div>
    </div>
  );
}

export default Journey;
