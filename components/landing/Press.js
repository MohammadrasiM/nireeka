import Link from "next/link";
import React from "react";

const item_1 = [
  {
    id: 1,
    name: "gadgetify",
    img: "../../../images/landing/gadget.png",
    href: "https://www.gadgetify.com/nireeka-smart-ebike/",
  },
  {
    id: 2,
    name: "evNerds",
    img: "../../../images/landing/ev.png",
    href: "https://evnerds.com/?s=nireeka",
  },
  {
    id: 3,
    name: "atlas",
    img: "../../../images/landing/newatlas.png",
    href: "https://newatlas.com/search/?q=nireeka#nt=navsearch",
  },
  {
    id: 4,
    name: "connectedCrib",
    img: "../../../images/landing/connectcrib.png",
    href: "https://www.connectedcrib.com/nireeka-smart-ebike/",
  },
  {
    id: 5,
    name: "amw",
    img: "../../../images/landing/amw.png",
    href: "",
  },
];
const item_2 = [
  {
    id: 1,
    name: "nechestar",
    img: "../../../images/landing/nechestar.png",
    href: "",
  },
  {
    id: 2,
    name: "9t",
    img: "../../../images/landing/9t.png",
    href: "",
  },
  {
    id: 3,
    name: "esist",
    img: "../../../images/landing/esist.png",
    href: "",
  },
  {
    id: 4,
    name: "gadgetflow",
    img: "../../../images/landing/gadgetflow.png",
    href: "",
  },
];
const item_3 = [
  {
    id: 1,
    name: "vodafone",
    img: "../../../images/landing/vodafone.png",
    href: "https://www.vodafone.de/featured/gadgets-wearables/nireeka-das-smarte-e-bike-der-zukunft/",
  },
  {
    id: 2,
    name: "techstartups",
    img: "../../../images/landing/techstartups.png",
    href: "https://techstartups.com/2018/02/25/nireeka-is-the-most-affordable-smart-ebike-for-under-1000/",
  },
];

function Press() {
  return (
    <div className="bg-black">
      <div className="flex-col items-center">
        <div>
          <div className="flex justify-center pt-8">
            <hr className="w-12 mt-2.5 mx-2 inline border-t border-[#bf7e00] " />
            <p className=" text-[#bf7e00] text-center font-light text-sm">
              PRESS
            </p>
            <hr className="w-12 mt-2.5 mx-2 inline border-t border-[#bf7e00] " />
          </div>
          <p className=" text-white p-2 text-center">AS SEEN IN</p>
        </div>
        <div className="py-10">
          <div className="w-full md:w-3/5 mx-auto p-2 md:p-5">
            <div className="flex justify-between">
              {item_1.map((item) => {
                return (
                  <div key={item.id}>
                    <Link href={item.href}>
                      <a className=" cursor-pointer">
                        <img
                          src={item.img}
                          alt={item.neme}
                          key={item.id}
                          className="w-[85%]"
                        />
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:w-2/5 w-900 mx-auto md:p-5 p-2">
            <div className="flex justify-between items-center">
              {item_2.map((item) => {
                return (
                  <div key={item.id}>
                    <Link href={item.href}>
                      <a className=" cursor-pointer">
                        <img
                          src={item.img}
                          alt={item.neme}
                          key={item.id}
                          className="w-[85%]"
                        />
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:w-1/5 w-3/5 mx-auto p-2 md:p-5">
            <div className="flex justify-between">
              {item_3.map((item) => {
                return (
                  <div key={item.id}>
                    <Link href={item.href}>
                      <a className=" cursor-pointer">
                        <img
                          src={item.img}
                          alt={item.neme}
                          key={item.id}
                          className="w-[95%]"
                        />
                      </a>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Press;
