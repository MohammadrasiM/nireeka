import Link from "next/link";
import React from "react";
import { useState } from "react";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
const items = [
  {
    id: 1,
    title: "CARBON FIBER FRAME",
    subtitle: "Solid Monocoque Carbon fiber frame with a lifetime warranty.",
    icon: "https://api.nireeka.com/images/landing/ico-frame.svg",
    data: [],
  },
  {
    id: 2,
    title: "MID-DRIVE MOTOR",
    subtitle: "Powerful mid-drive Bafang motor with more than 160nm torque.",
    icon: "https://api.nireeka.com/images/landing/ico-motor.svg",
  },
  {
    id: 3,
    title: "LG BATTERY",
    subtitle: "Durable Lithium-ion LG battery with more than 50 miles range.",
    icon: "https://api.nireeka.com/images/landing/ico-battery.svg",
  },
  {
    id: 4,
    title: "INTELLIGENCE ASSIST SYSTEM",
    subtitle: "Speed/Torque sensor.",
    icon: "https://api.nireeka.com/images/landing/ico-wizard.svg",
  },
  {
    id: 5,
    title: "BRAKES CUT-OFF SYSTEM",
    subtitle: "Hydraulic disk brakes equipped with the cut-off system.",
    icon: "https://api.nireeka.com/images/landing/ico-brake.svg",
  },
];
const displayTable = {
  Core: [
    { head: "Core Data" },
    {
      id: "1",
      name: "Display Type",
      title: `LCD`,
    },
    {
      id: "2",
      name: "Display",
      title: `Segment Display`,
    },
    {
      id: "3",
      name: `Rated Voltage(DCV)`,
      title: `36/43/48`,
    },
    {
      id: "4",
      name: "Support Modes",
      title: `0-3 / 0-5 / 0-9`,
    },
    {
      id: "5",
      name: "Operating Temperature",
      title: `-20 - 45℃`,
    },
    {
      id: "6",
      name: `Com. Protocol`,
      title: `UART`,
    },
  ],
  Mounting: [
    { head: "Mounting Parameters" },
    {
      id: "1",
      name: `Dimensions (mm)`,
      title: `107*58*70`,
    },
    {
      id: "2",
      name: `Holder (mm)`,
      title: `Ø 22.2/25.4/31.8`,
    },
  ],
  Indication: [
    { head: "Indication Information" },
    {
      id: "1",
      name: `Current Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "2",
      name: `Maximum Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "3",
      name: `Average Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "4",
      name: "Total Distance",
      title: `yes`,
    },
    {
      id: "5",
      name: "Capacity",
      title: `yes`,
    },
    {
      id: "6",
      name: "Error Code Display",
      title: `yes`,
    },
    {
      id: "7",
      name: "Walk Boost",
      title: `yes`,
    },
    {
      id: "8",
      name: "Backlight",
      title: `yes`,
    },
  ],
  Tests: [
    { head: `Tests & Certifications` },
    {
      id: "1",
      name: "IP",
      title: `IP 65`,
    },
    {
      id: "2",
      name: "Certifications",
      title: `CE / EN 15194 / REACH / ROHS`,
    },
  ],
};
const colorDisplayTable = {
  Core: [
    { head: "Core Data" },
    {
      id: "1",
      name: "Display Type",
      title: `LCD`,
    },
    {
      id: "2",
      name: "Display",
      title: `Segment Display`,
    },
    {
      id: "3",
      name: `Rated Voltage(DCV)`,
      title: `36/43/48`,
    },
    {
      id: "4",
      name: "Support Modes",
      title: `0-3 / 0-5 / 0-9`,
    },
    {
      id: "5",
      name: "Operating Temperature",
      title: `-20 - 45℃`,
    },
    {
      id: "6",
      name: `Com. Protocol`,
      title: `UART`,
    },
    {
      id: "7",
      name: `Weight (g)`,
      title: `202`,
    },
  ],
  Mounting: [
    { head: "Mounting Parameters" },
    {
      id: "1",
      name: `Dimensions (mm)`,
      title: `98*63*69`,
    },
    {
      id: "2",
      name: `Holder (mm)`,
      title: `Ø 22.2/25.4/31.8`,
    },
  ],
  Indication: [
    { head: "Indication Information" },
    {
      id: "1",
      name: `Current Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "2",
      name: `Maximum Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "3",
      name: `Average Speed (km/h)`,
      title: `yes`,
    },
    {
      id: "4",
      name: `Single Duration Trip`,
      title: `yes`,
    },
    {
      id: "5",
      name: `Single Distance Trip`,
      title: `yes`,
    },

    {
      id: "6",
      name: "Total Distance",
      title: `yes`,
    },
    {
      id: "7",
      name: `Reset S.T. Duration`,
      title: `yes`,
    },
    {
      id: "8",
      name: `Reset S.T. Duration`,
      title: `yes`,
    },
    {
      id: "9",
      name: "Capacity",
      title: `yes`,
    },
    {
      id: "10",
      name: "Error Code Display",
      title: `yes`,
    },
    {
      id: "11",
      name: "Walk Boost",
      title: `yes`,
    },
    {
      id: "12",
      name: "Backlight",
      title: `yes`,
    },
    {
      id: "13",
      name: "Light Sensor",
      title: `yes`,
    },
  ],
  Further: [
    { head: "Further Specifications" },
    { id: 1, name: "USB Charge", title: `5V 500mA` },
  ],
  Tests: [
    { head: `Tests & Certifications` },
    {
      id: "1",
      name: "IP",
      title: `IP 65`,
    },
    {
      id: "2",
      name: "Certifications",
      title: `CE / EN 15194 / REACH / ROHS`,
    },
  ],
};
function Specifications() {
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
                <h1 className="px-2 text-xl text-left md:text-2xl ">
                  COMPUTER DISPLAY
                </h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              <div className="flex justify-center h-auto pt-8">
                <div className="w-full px-2 ">
                  <div
                    className="flex flex-col justify-between md:flex-row"
                    style={{ height: "inherit" }}
                  >
                    {/* <img
                      src="https://api.nireeka.com/images/landing/display-specs.svg"
                      alt="specs"
                      className="w-full mx-auto md:w-1/2"
                      loading="lazy"
                    /> */}
                    <div className="w-full py-2 mx-auto md:w-1/2 md:px-4">
                      <table className="w-full table-auto ">
                        <tbody className="flex flex-col w-full mx-2">
                          {displayTable.Core.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {displayTable.Mounting.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {displayTable.Indication.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {displayTable.Tests.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
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
                    <div className="w-full md:w-1/2">
                      <img
                        src="https://api.nireeka.com/images/landing/csm_DP_C01.232-01_8d3a8a70bb.png"
                        alt="csm"
                        className="mx-auto "
                        loading="lazy"
                      />
                      <p className="p-4 text-4xl font-semibold text-center">
                        <span className="font-bold">{`DP `}</span>C01.UART
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
        {selectId === 2 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="px-2 text-xl text-left md:text-2xl ">
                  UPGRADED DISPLAY
                </h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              <div className="flex justify-center h-auto pt-8">
                <div className="w-full px-2 ">
                  <div
                    className="flex flex-col justify-between md:flex-row"
                    style={{ height: "inherit" }}
                  >
                    <div className="w-full py-2 mx-auto md:w-1/2 md:px-4">
                      <table className="w-full table-auto ">
                        <tbody className="flex flex-col w-full mx-2">
                          {colorDisplayTable.Core.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {colorDisplayTable.Mounting.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {colorDisplayTable.Indication.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {colorDisplayTable.Further.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
                                    <p>{item.title}</p>

                                    <p>{item.subtitle}</p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                          {colorDisplayTable.Tests.map((item) => {
                            return (
                              <>
                                {item.head && (
                                  <th className="bg-[#efefec] text-lg font-medium text-left px-1 text-gray-700 mt-2 ">
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
                                  <td className="flex flex-col text-sm font-light leading-6">
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
                    <div className="w-full md:w-1/2">
                      <img
                        src="https://api.nireeka.com/images/landing/DP_C18.UART1.png"
                        alt="csm"
                        className="mx-auto "
                        loading="lazy"
                      />
                      <p className="p-4 text-4xl font-semibold text-center">
                        <span className="font-bold">{`DP `}</span>C18.UART
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
      </BlurBackdrop>
    );
  };

  return (
    <div className="py-16 bg-white md:py-28 ">
      <div className="flex flex-col w-full px-6 md:flex-row md:justify-center md:px-2">
        <div className="flex justify-center w-full md:justify-end h-fit">
          <img
            src="https://api.nireeka.com/images/landing/display-default-nireeka-prime.jpg"
            alt="prime"
            className="w-full md:minw-w-[465px] md:w-[65%] rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-start w-full mx-auto ">
          <div>
            <h3 className="px-4 pt-2 text-xl text-gray-600 md:pt-0">Handlebar Display</h3>
            <h4 className=" font-medium px-4  text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-100 text-[3rem] lg:text-7xl text-gray-500  ">
              DASHBOARD
            </h4>
            <p className="w-full px-4 pt-4 text-sm font-light leading-7 text-gray-900 md:w-2/3">
              {`The HMI with a high-contrast LCD display delivers all important information at a glance and can also be read in direct sunlight without difficulty. The handlebar controller is extremely robust and easy to use, and the additional output can be individually controlled by five support levels. The HMI is protected against contact and ingress of water and dirt and complies with protection class IP 65.`}
            </p>
            {/* <div className="flex flex-row flex-wrap justify-center mt-2 transition-all ease-in md:justify-start">
              <Link href={"/configurator/nireeka-prime"}>
                <a className="flex justify-center w-[160px] py-1 px-1 mx-2 mt-2 font-medium text-white transition-all ease-in bg-red-500 rounded-full hover:bg-white hover:border hover:border-gray-400 hover:text-black">
                  BUY NOW
                </a>
              </Link>

              <button
                onClick={() => handleBackdrop(1)}
                className="py-1 px-1 mx-2 mt-2 bg-transparent rounded-full w-[160px] text-white hover:text-black hover:bg-white border border-gray-50"
              >
                EXPAND LIST
              </button>
              <button
                onClick={() => handleBackdrop(2)}
                className="py-1 px-1 mx-2 mt-2 bg-transparent rounded-full w-[160px] text-white hover:text-black hover:bg-white border border-gray-50"
              >
                UPGRADE
              </button>
            </div> */}
            <div className="flex w-full mx-auto justify-start mt-8 md:mt-4 z-[2] pb-20">
              <div className="flex justify-center w-full md:w-[340px]">
                <Link href={"/configurator"}>
                  <a className="flex mx-0.5 justify-center w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium text-white transition-all ease-in hover:outline bg-red-500 rounded-full md:w-40 hover:bg-white hover:outline-gray-300  hover:text-black">
                    BUY NOW
                  </a>
                </Link>
                <Link href={"/configurator/nireeka-prime"}>
                  <a className="flex mx-0.5 justify-center border border-gray-300 w-40 p-1 md:p-2 md:mx-auto md:my-4 font-medium transition-all ease-in  bg-transparent rounded-full md:w-40 hover:border-gray-900   text-gray-700">
                    Build your own
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {selectComponent()}
      </div>
    </div>
  );
}

export default Specifications;
