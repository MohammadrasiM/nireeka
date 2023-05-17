import Link from "next/link";
import React from "react";
// const Partners = [
//   {
//     id: 1,
//     href: "https://www.lg.com/us",
//     title: "LG",
//     image: "https://api.nireeka.com/images/landing/partners-logo-lg.png",
//   },
//   {
//     id: 2,
//     href: "https://www.shimano.com/en/",
//     title: "Shimano",
//     image: "https://api.nireeka.com/images/landing/partners-logo-shimano.png",
//   },
//   {
//     id: 3,
//     href: "https://www.bafang-e.com/",
//     title: "bafang",
//     image: "https://api.nireeka.com/images/landing/partners-logo-bafang.png",
//   },
//   {
//     id: 4,
//     href: "https://www.tektro.com/",
//     title: "tektro",
//     image: "https://api.nireeka.com/images/landing/partners-logo-tektro.png",
//   },
//   {
//     id: 5,
//     href: "https://www.xfusionshox.com/",
//     title: "xfusionshox",
//     image: "https://api.nireeka.com/images/landing/partners-logo-xfusion.png",
//   },
//   {
//     id: 6,
//     href: "https://www.maxxis.com/",
//     title: "maxxis",
//     image: "https://api.nireeka.com/images/landing/partners-logo-maxxis.png",
//   },
// ];
function WhoAreWe() {
  return (
    <>
      <div className="relative hidden overflow-hidden md:block">
        <div className="flex justify-center w-full bg-white">
          <img
            src="https://api.nireeka.com/images/landing/history-nireeka-prime-shojaie.jpg"
            alt="bike"
            className="w-[550px]"
          />
        </div>
        <div className="absolute flex justify-between top-8 left-32 ">
          <div className="w-1/3">
            <h3 className="pb-4 text-5xl border-b-2 w-fit ">WHO ARE WE?</h3>

            <p className="pt-4 font-semibold">SHOJAIE MOTORS</p>
            <p className="pt-4 leading-8">
              {`Founded by Max Shojaie in 2009, the mission was and still is to make
  any transportation experience a beautiful one by designing and making
  the most unique vehicles in the world.`}
            </p>

            <p className="pt-4 mt-20 font-semibold">LOCHNESS CHOPPER</p>
            <p className="pt-4 pr-16 leading-8">
              {`Lochness chopper has inherited not only the face of the monster but some moral features. The very long wheelbase reminds the serenity and the dark paint reminds cryptic manner and also a hidden fear underneath.`}
            </p>
            <p className="pt-4 mt-[30rem] font-semibold">NIREEKA ECU</p>
            <p className="pt-4 pr-16 leading-8">
              {`The ECU gives our bikes all the smart features such as blind-spot radar, auto light, daytime light, GPS anti-theft system, and even a pedal-assist level based on your heartbeat.`}
            </p>
          </div>
          <div className="w-[39%] overflow-hidden">
            <div className="w-[75%] px-4 mr-32 mt-10">
              <p className="pt-4 font-semibold">OSTOURE SUPER STREET BIKE</p>
              <p className="pt-4 leading-8">
                {`Ostoure super street bike concept designed by Max Shojaie draws inspiration from ancient Persian engravings, combining these with cutting-edge design elements and some high-tech trimmings such as two-wheel drive and an in-helmet heads-up display.`}
              </p>
            </div>
            <div className="w-[75%] px-4 mr-32 mt-[17rem]">
              <p className="pt-4 font-semibold">NIREEKA HOMIE</p>
              <p className="pt-4 leading-8">
                {`Quickly get around in style with the Nireeka Ultralight Smart eBike. The Nireeka Smart eBike features an ultralight monocoque carbon fiber frame that makes it easy to take with you anywhere. Additionally, the eBike comes with a 500-watt bafang brushless motor that keeps you going as well as a twist throttle for easy control. The Nireeka Smart eBike loaded with smart features including a blind spot radar, an autolight, a GPS anti-theft system, and even pedal-assist level based on your heartbeat.`}
              </p>
            </div>
            <div className="w-[75%] px-4 mr-32 mt-[9rem]">
              <p className="pt-4 font-semibold">NIREEKA PRIME</p>
              <p className="pt-4 leading-8">
                {`Nireeka Prime with the most unique design ever for a bicycle, and a powerful mid-drive motor, a high range battery, will be going to create memorable experiences for you! We have perfected a way to balance fat bikes parameters by designing a completely new frame.`}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-black flex-col z-[2]">
        <div>
          <div className="flex justify-center pt-12">
            <hr className="w-12 mt-2.5 mx-2 inline border-t border-[#bf7e00] " />
            <p className=" text-[#bf7e00] text-center font-light text-sm">
              SUPPLIERS
            </p>
            <hr className="w-12 mt-2.5 mx-2 inline border-t border-[#bf7e00] " />
          </div>
          <p className="px-2 py-4 text-xl text-center text-white ">PARTNERS</p>
        </div>
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-center w-full pt-6 pb-16 mx-auto ">
            {Partners.map((partner) => (
              <Link href={partner.href}  key={partner.id}>
                <a className="w-[140px] p-4 flex" target="_blank" key={partner.id}>
                  <img
                    alt={partner.title}
                    src={partner.image}
                    className="w-[94px] h-auto"
                  />
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div> */}
    </>
  );
}

export default WhoAreWe;
