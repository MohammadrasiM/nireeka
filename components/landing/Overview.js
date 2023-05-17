import Link from "next/link";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import WhiteShadowCard from "../Atoms/cards/WhiteShadowCard";
import ModalPartInfo from "../Atoms/modals/ModalPartInfo";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
const items = [
  {
    id: 1,
    title: "CARBON FIBER FRAME",
    subtitle: "Solid Monocoque Carbon fiber frame with a lifetime warranty.",
    icon: "https://api.nireeka.com/images/landing/ico-frame.svg",
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
    subtitle:
      "Hydraulics Disk Brakes Shimano brakes with 160mm rotors and optional 203mm rotors",
    icon: "https://api.nireeka.com/images/landing/ico-brake.svg",

    part: {
      id: 5000207,
      category_part_id: 17,
      category_id: 4,
      title: "Shimano Acera BR-4100",
      short_description: "<p>2-Piston Disc Brake Set, Front &amp; Rear</p>",
      description: "<p>2-Piston Disc Brake Set, Front &amp; Rear</p>",
      price: 0,
      weight: 0.618,
      manual_path: "",
      catalog_path: "",
      spec_sheet_path: "",
      video_url: null,
      cover_image_path:
        "https://api.nireeka.com/storage/product/smCuGPqoZ7lU325DsUrzRkZOfsFP5zk377IWOHDt.jpg",
      specs: [
        {
          id: 475,
          title: "Model",
          title_upper: "MODEL",
          value: "Hydraulic",
        },
        {
          id: 476,
          title: "Code",
          title_upper: "CODE",
          value: "BR-M4100",
        },
        {
          id: 477,
          title: "Piston",
          title_upper: "PISTON",
          value: "2",
        },
        {
          id: 478,
          title: "Levers",
          title_upper: "LEVERS",
          value: "BL-M4100",
        },
        {
          id: 479,
          title: "Pads",
          title_upper: "PADS",
          value: "resin ICE",
        },
        {
          id: 480,
          title: "Weight (g)",
          title_upper: "WEIGHT (G)",
          value: "618",
        },
      ],
      files: [
        {
          id: 5000207,
          title: "Shimano Acera BR-4100",
          original:
            "https://api.nireeka.com/storage/product/smCuGPqoZ7lU325DsUrzRkZOfsFP5zk377IWOHDt.jpg",
          thumbnail:
            "https://api.nireeka.com/storage/product/smCuGPqoZ7lU325DsUrzRkZOfsFP5zk377IWOHDt.jpg",
        },
      ],
      performance: null,
    },
  },
];
function Overview() {
  const [backdrop, setBackDrop] = useState(false);
  const [selectId, setSelectId] = useState(null);
  const [selectVisible, setSelectVisible] = useState(null);
  const [visibleInfoModalProductId, setVisibleInfoModalProductId] =
    useState(null);

  const handleBackdrop = (id) => {
    setBackDrop(true);
    setSelectId(id);
  };
  const handleClose = () => {
    setBackDrop(false);
    document.getElementsByTagName("body")[0].style.overflow = "auto";
  };
  // const handleVisibleInfoModal = (id) => {
  //   setSelectVisible(id);
  //   setVisibleInfoModalProductId(true);
  // };
  // console.log("first",selectVisible)
  // const closeHandleVisibleInfoModal = () => {
  //   setVisibleInfoModalProductId(false);
  //   document.getElementsByTagName("body")[0].style.overflow = "auto";
  // };

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
                  LIGHTWEIGHT FRAME & COMPONENTS
                </h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              <div className="flex justify-center h-auto pt-8">
                <div className="w-900 ">
                  <div className="flex flex-col" style={{ height: "inherit" }}>
                    <ReactPlayer
                      height="inherit"
                      width={"100%"}
                      url="https://api.nireeka.com/videos/solid-nireeka-prime.mp4"
                      controls={true}
                    />
                    <img
                      src="https://api.nireeka.com/images/landing/lightweight.svg"
                      alt="Nireeka Lightweight Frame"
                      className="w-1/2 mx-auto"
                    />
                    <p className="p-4 text-center">{`It's not a world record but pretty lightweight despite the gigantic body shape thanks to carbon fiber frame and fork.`}</p>
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
                  MID-DRIVE MOTOR
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
                    <img
                      src="https://api.nireeka.com/images/landing/specs.svg"
                      alt="Nireeka Lightweight Frame"
                      className="w-full mx-auto md:w-1/2"
                    />
                    <img
                      src="https://api.nireeka.com/images/landing/M620_1_MM_G51.750_MM_G51.png"
                      alt="M620_"
                      className="block w-full mx-auto md:w-1/2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
        {selectId === 3 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="px-2 text-xl text-left md:text-2xl ">
                  LG BATTERY
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
                    className="flex flex-col justify-center mx-auto"
                    style={{ height: "inherit" }}
                  >
                    <img
                      src="https://api.nireeka.com/images/landing/battery-nireeka-prime.png"
                      alt="LG Lithium ion battery"
                      className="w-[70%] mx-auto"
                    />
                    <h5 className="text-lg leading-7 text-center">
                      Prime comes with the best quality Lithium-ion
                      <span className="font-semibold ">{` LG battery `}</span>
                      with
                      <span className="font-semibold ">{` 1,000 times `}</span>
                      charging time lifetime. There are two versions available,
                      both<span className="font-semibold">{` 48V`}</span>, the
                      standard one is
                      <span className="font-semibold ">{` 10Ah `}</span>and the
                      upgraded one is
                      <span className="font-semibold ">{` 17Ah. `}</span>
                      {`It's easily removable and you
                      can charge the battery either on the bike or take it off
                      and charge it on your desk.`}
                    </h5>
                    <h5 className="pt-4 text-lg leading-7 text-center">
                      <span className="font-semibold ">{`Please note: `}</span>
                      {`This battery is not the same model as `}
                      <span className="font-semibold ">{`Nireeka Homie `}</span>
                      {`series, so they're not compatible.`}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
        {selectId === 4 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="px-2 text-xl text-left md:text-2xl ">
                  INTELLIGENCE ASSIST SYSTEM
                </h1>
                <button
                  className="-mt-4 text-xl font-medium text-gray-800"
                  onClick={() => handleClose()}
                >
                  x
                </button>
              </div>

              <div className="flex justify-center h-auto pt-8">
                <div className="w-900 ">
                  <div className="flex flex-col" style={{ height: "inherit" }}>
                    <ReactPlayer
                      height="inherit"
                      width={"100%"}
                      url="https://api.nireeka.com/videos/torque-sensor-nireeka-prime.mp4"
                      controls={true}
                    />

                    <h5 className="pt-8 text-lg leading-7 text-center">
                      The
                      <span className="font-semibold ">{` torque sensor `}</span>
                      {`measures your actual force on the pedal, sampling at
                      multiple times per second over the entire pedal stroke.
                      The harder you pedal, the more power it gives to the
                      motor. If you pedal lighter, less power goes to the motor.
                      It makes this adjustment in real time so it is technically
                      amplifying your every input. It feels like you are bionic.`}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </WhiteShadowCard>
        )}
        {selectId === 5 && (
          <WhiteShadowCard>
            <div className="flex flex-col">
              <div className="flex justify-between pb-2 border-b ">
                <h1 className="px-2 text-xl text-left md:text-2xl ">
                  BRAKES CUT-OFF SYSTEM
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
                    className="flex flex-col justify-between"
                    style={{ height: "inherit" }}
                  >
                    <h5 className="pb-8 text-lg">{`When you pull the brake lever, it means you don't need the motor power anymore so the system triggers and cut-off the motor power.
There is a sensor inside the lever detects when you have pulled the lever, and then a signal is sent to the controller to shut off the motor. This is a very important safety feature for powerful motors like ours with 160nm torque.`}</h5>
                    <img
                      src="https://api.nireeka.com/images/landing/brake-tektro-nireeka-prime.jpg"
                      alt="nireeka-prime"
                      className="w-full mx-auto"
                    />
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
    <div className="py-20 md:py-40">
      <div className="flex justify-center w-full">
        <div className="relative flex-col justify-center ">
          {/* <p className="font-medium text-black">OVERVIEW</p> */}
          <p className=" font-medium  text-transparent bg-clip-text bg-gradient-to-br from-gray-200 to-gray-100 text-6xl text-gray-500 md:text-[7rem] lg:text-[11rem]">
            OVERVIEW
          </p>
          {/* <div className="flex flex-col items-center justify-center pt-4 mx-auto text-center align-center">
            <hr className="w-full border-t border-gray-800 " />
            <hr className="w-full mt-[1px] border-t border-gray-800 " />
          </div> */}
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row md:justify-center">
        <div className="flex justify-center w-full md:justify-end md:w-1/2">
          <img
            src="https://api.nireeka.com/images/landing/overview-nireeka-prime.jpg"
            alt="prime"
            className="w-[90%] md:w-3/5 md:min-w-[350px] p-5"
          />
        </div>

        <div className="w-full px-2 mx-auto my-auto md:w-1/2">
          <div>
            {items.map((item) => {
              return (
                <div className="flex justify-start px-8 md:px-0" key={item.id}>
                  <div className=" border-gray-500 hover:border-gray-200 border rounded-full w-[50px] h-[50px] mx-1.5 my-2.5 cursor-pointer hover:bg-sky-400 hover:text-white ">
                    <button onClick={() => handleBackdrop(item.id)}>
                      <img
                        src={item.icon}
                        alt={item.title}
                        className="w-[50px] h-[50px] max-w-fit"
                      />
                    </button>
                  </div>

                  <div className="flex-col flex my-2.5  ">
                    <h4 className="font-medium text-gray-800">{item.title}</h4>

                    {item?.part?.id === 5000207 ? (
                      <p
                        className="text-sm font-light text-gray-700 cursor-pointer "
                        onClick={() =>
                          setVisibleInfoModalProductId(item.part.id)
                        }
                      >
                        {item.subtitle}
                      </p>
                    ) : (
                      <p className="text-sm font-light text-gray-700 ">
                        {item.subtitle}
                      </p>
                    )}
                  </div>
                  {visibleInfoModalProductId && (
                    <BlurBackdrop
                      // onClick={(e) => e.stopPropagation()}
                      isVisible={item?.part?.id === visibleInfoModalProductId}
                      onClose={() => setVisibleInfoModalProductId(null)}
                      backdropColorClass="bg-black/40"
                      className="w-full md:w-[55rem] min-w-[70%]"
                    >
                      <ModalPartInfo part={item.part} />
                    </BlurBackdrop>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {selectComponent()}
      <div className="flex justify-center w-full mx-auto mt-10">
        <div className="flex justify-center w-[90%] md:w-[340px]">
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
  );
}

export default Overview;
