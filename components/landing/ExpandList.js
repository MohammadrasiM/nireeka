import Link from "next/link";
import React from "react";
import { useState } from "react";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
const table = [
  { id: 1, name: "FRAME SIZE", title: `17" (only one size available)` },
  { id: 2, name: "WEIGHT", title: `26 kg (57lbs.) incluing motor and battery` },
  { id: 3, name: "MOTOR", title: `250W, 750 W` },
  { id: 4, name: "BATTERY", title: `10Ah 48V` },
  { id: 5, name: "MAX SPEED", title: `60 km/h (37.5 mph)` },
  { id: 6, name: "MAX TORQUE", title: `160 nm` },
  { id: 7, name: "RANGE", title: `50 km (31 miles)` },
  { id: 8, name: "SPEED LIMIT", title: `25 km/h (15 mph)` },
  { id: 9, name: "CASSETTE", title: `10 speed Shimano Deore` },
  { id: 10, name: "SHIFTER", title: `Shimano Deore` },
  { id: 11, name: "BRAKES", title: `Tektro hydraulic disk brake` },
  { id: 12, name: "BRAKE DISKS", title: `160mm front, 180mm rear` },
  { id: 13, name: "WHEELS", title: `Aluminum` },
  { id: 14, name: "TIRES", title: `26"X4"` },
  { id: 15, name: "FRAME", title: `monocoque UD carbon fiber` },
  { id: 16, name: "FORK", title: `monocoque UD carbon fiber` },
];
const ExpendTable = {
  specification: [
    { head: "Specifications" },
    {
      id: "1",
      name: "Frame",
      title: `Carbon fiber frame, 26" compatible, Tapered headtube design, mid kickstand mount`,
    },
    { id: "2", name: "Fork", title: `Carbon fiber monocoque fork` },
    { id: "3", name: "Rear Derailleur", title: `Shimano Deore SGC 10 Speed` },
    { id: "4", name: "Shifter", title: `Shimano Deore / Optical gear display` },
    { id: "5", name: "Brake Lever", title: `Tektro hydraulic brake` },
    {
      id: "6",
      name: "Cassette",
      title: `Shimano CS-HG50 10-speed 11-13-15-17-19-21-24-28-32-36T`,
    },
    {
      id: "7",
      name: "Rotors",
      title: `Shimano 160mm front/180mm rear (203 mm optional)`,
    },
    {
      id: "8",
      name: "Front Hub",
      title: `HB-M6000, Deore / 32H`,
      subtitle: `QR: 133mm`,
    },
    {
      id: "9",
      name: "Rear Hub",
      title: `HB-M6000, Deore / 32H`,
      subtitle: `QR: 133mm`,
    },
    { id: "10", name: "Chain", title: `CN-HG54 / Super narrow HG / 120 links` },
    { id: "11", name: "Chainring", title: `Deckas 130BCD 50T` },
    { id: "12", name: "Handlebar", title: `Alloy 6061D.B. / 680MM` },
    { id: "13", name: "Seatpost", title: `31.6MM D / Alloy 6061D.B.` },
    { id: "14", name: "Spokes", title: `Stainless Black` },
    { id: "16", name: "Rims", title: `Front 32H / Rear 32H` },
    { id: "17", name: "Tires", title: `Front & Rear Innova 26"x4"` },
  ],
  parameters: [
    { head: "Ebike Parameters" },
    {
      id: "1",
      name: `Motor`,
      title: `48V 250 W (1000 W optional) mid-drive motor, 160nm`,
    },
    { id: "2", name: `Battery`, title: `480Wh LG Li-ion cells` },
    {
      id: "3",
      name: `Computer Display`,
      title: `DP C01.UART (DP C18.UART optional)`,
    },
    { id: "4", name: `Controller Protocol`, title: `UART` },
    { id: "5", name: `Assist Sensor`, title: `Torque Sensor & Cadence Sensor` },
    {
      id: "6",
      name: `Charger`,
      title: `110-220V input - 42V 2A Output (42V 4A Fast charger)`,
    },
    {
      id: "7",
      name: `Charging Time`,
      title: `5-6 Hours Normal charger (2-3 Fast charger)`,
    },
  ],

  tests: [
    { head: "Tests & Certifications" },
    { id: "1", name: `Certifications`, title: `Standard: EN ISO 12100:2010,` },
    { id: "2", name: ``, title: `EN 15194:2017,` },
    { id: "3", name: ``, title: `EN 60204-1:2006+A1:2009+AC:2010` },
    {
      id: "4",
      name: ``,
      title: `related to CE Directive(s): 2006/42/EC (Machinery) 2014/35/EU (Low Voltage) 2014/30/EU`,
    },
    { id: "5", name: ``, title: `(Electromagnetic Compatibility)` },
  ],
};
function ExpandList() {
  const [backdrop, setBackDrop] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const handleBackdrop = (id) => {
    setBackDrop(true);
    setSelectId(id);
  };
  const handleClose = () => {
    setBackDrop(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  };

  const selectComponent = () => {
    return (
      <BlurBackdrop
        isVisible={backdrop}
        onClose={() => setBackDrop(false)}
        backdropColorClass="bg-black/40"
        noXButton
        className="relative w-full mx-auto h-inherit top-7 md:max-w-6xl"
        // backdropColorClass
        customStyle={{
          width: "calc(100% - 1rem)",
          overflowY: "hidden",
        }}
      >
        {selectId === 1 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="text-xl text-left md:text-2xl ">All Specs</h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              {/* <div className="flex justify-center h-auto pt-8">
                <div className="w-full ">
                  <div
                    className="flex justify-between"
                    style={{ height: "inherit" }}
                  >
                    <img
                      src="https://api.nireeka.com/images/landing/all-specs-prime.svg"
                      alt="Nireeka Lightweight Frame"
                      className="mx-auto "
                    />
                  </div>
                </div>
              </div> */}
              <div className="w-full py-2 mx-auto md:px-4 md:py-8">
                <table className="w-full table-auto ">
                  <tbody className="flex flex-col w-full mx-2">
                    {ExpendTable.specification.map((item) => {
                      return (
                        <>
                          {item.head && (
                            <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 ">
                              {item.head}
                            </th>
                          )}
                          <tr
                            key={item.id}
                            className={`px-4  flex justify-between my-0 py-1.5`}
                          >
                            <td classNAme="font-semibold text-black">
                              {item.name}
                            </td>
                            <td className="flex flex-col w-2/3 text-sm font-light leading-6">
                              <p>{item.title}</p>

                              <p>{item.subtitle}</p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {ExpendTable.parameters.map((item) => {
                      return (
                        <>
                          {item.head && (
                            <th className="bg-[#efefec] py-1 font-medium text-left mt-3 px-1 text-gray-700 ">
                              {item.head}
                            </th>
                          )}
                          <tr
                            key={item.id}
                            className={`px-4  flex justify-between my-0 py-1.5`}
                          >
                            <td classNAme="font-semibold text-black">
                              {item.name}
                            </td>
                            <td className="flex flex-col w-2/3 text-sm font-light leading-6">
                              <p>{item.title}</p>
                              <p>{item.subtitle}</p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    {ExpendTable.tests.map((item) => {
                      return (
                        <>
                          {item.head && (
                            <th className="bg-[#efefec] py-1 font-medium text-left mt-3 px-1 text-gray-700 ">
                              {" "}
                              {item.head}
                            </th>
                          )}
                          <tr
                            key={item.id}
                            className={`px-4  flex justify-between my-0 py-1.5`}
                          >
                            <td classNAme="font-semibold text-black">
                              {item.name}
                            </td>
                            <td className="flex flex-col w-2/3 text-sm font-light leading-6">
                              <p>{item.title}</p>

                              <p>{item.subtitle}</p>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </WhiteShadowCard>
        )}
      </BlurBackdrop>
    );
  };

  return (
    <>
      <>
        <div className="justify-center hidden px-4 pt-16 bg-white md:flex">
          <div className="w-1/2">
            <img
              src="https://api.nireeka.com/images/landing/design-nireeka-prime-01.jpg"
              alt="bike"
              className="w-full"
            />
          </div>
          <div className="w-1/2">
            <img
              src="https://api.nireeka.com/images/landing/design-nireeka-prime-03.jpg"
              alt="shadow bike"
              className="w-full p-10"
            />
            {/* <div className="w-full flex mt-2 p-2 justify-start w-[268px]">
              <Link href={"/configurator/nireeka-prime"}>
                <a className="flex justify-center w-[160px] py-1 px-1 mx-4 mt-2 font-medium text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black">
                  BUY NOW
                </a>
              </Link>
            </div> */}
          </div>
        </div>
      </>
      <div className="flex flex-col justify-center px-4 pb-16 mx-auto bg-black md:pb-40 md:flex-row">
        <div className="w-full md:w-1/2">
          <img
            src="https://api.nireeka.com/images/landing/design-nireeka-prime-02.jpg"
            alt="bike"
            className="w-full"
          />
        </div>
        <div className="w-full mx-auto md:w-1/2">
          {/* <img
            src="https://api.nireeka.com/images/landing/all-specs-nireeka-prime.svg"
            alt="table"
            className="w-full py-2 md:pl-8 md:pr-12 md:py-8"
          /> */}
          <div className="w-full py-2 mx-auto md:px-4 md:py-8">
            <table className="w-full table-auto ">
              <tbody className="flex flex-col w-full mx-2 border-t align-center">
                {table.map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className={`px-4  odd:text-gray-100 odd:bg-black even:text-black even:bg-white flex justify-between py-1`}
                    >
                      <td className="font-semibold text-black">{item.name}</td>
                      <td className="w-2/3 text-sm font-light md:pl-6">
                      
                        {item.title}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex flex-row flex-wrap justify-center mt-3 transition-all ease-in md:mt-0">
            <Link href={"/configurator"}>
              <a className="flex justify-center w-[160px] py-1 px-1 md:p-2 mx-4 mt-2 font-medium text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black">
                BUY NOW
              </a>
            </Link>
            <button className="py-1 px-1 mx-2 mt-2 bg-gray-200 rounded-full w-[160px] md:p-2 text-gray-800 hover:text-gray-600 hover:bg-white border border-gray-50">
              <Link href={"/configurator/nireeka-prime"}>Build your own</Link>
            </button>
            <button
              onClick={() => handleBackdrop(1)}
              className="py-1 px-1 mx-2 mt-2 bg-transparent md:p-2 rounded-full w-[160px] text-white hover:text-black hover:bg-white border border-gray-50"
            >
              EXPAND LIST
            </button>
          </div>
          {selectComponent()}
        </div>
      </div>
    </>
  );
}
export default ExpandList;
