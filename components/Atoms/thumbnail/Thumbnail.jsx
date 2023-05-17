import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import classNames from "../../../functions/classNames";
import ImageOverlay from "../overlays/ImageOverlay";
import Image from "next/image";

export default function Thumbnail(props) {
  // Pic overlay logic
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);
  const onOpenImageOverlay = () => {
    setIsPicOverlaid(true);
  };
  const onCloseImageOverlay = () => {
    setIsPicOverlaid(false);
  };
  return (
    <>
      <Tab.Group as="div" className={props.stylesProps.tabGroupClass}>
        {/* Image selector */}
        <div className={props.stylesProps.wrapperTabListClass}>
          <Tab.List className={props.stylesProps.tabListClass}>
            {props.data.map((item, index) => (
              <Tab key={index} className={props.stylesProps.TabCalss}>
                {/* {({ selected }) => ( */}
                <>
                  <span className="sr-only">{item.title}</span>
                  <span className={props.stylesProps.wrapperImageClass}>
                    {/* <img
                      src={item.original}
                      alt={item.title}
                      className={props.stylesProps.imageClass}
                    /> */}
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        // height: "100",
                        // maxHeight: "600px",
                        // minHeight: "400px",
                      }}
                      className={`${props.stylesProps.imageClass} w-full h-full`}
                    >
                      <Image
                        src={item.original}
                        alt={item.title}
                        className={props.stylesProps.imageClass}
                        layout="fill"
                        objectFit="cover"
                        objectPosition="center"
                        loading="eager"
                      />
                    </div>
                  </span>
                  <span
                    // className={classNames(
                    //   selected
                    //     ? `${props.stylesProps.selectImageClass}`
                    //     : "ring-transparent",
                    //   ` ${props.stylesProps.defaultSelectImageClass}`
                    // )}
                    aria-hidden="true"
                  />
                </>
                {/* )} */}
              </Tab>
            ))}
          </Tab.List>
        </div>

        <Tab.Panels
          className={props.stylesProps.thumbnailWrapperClass}

          // props.styleAccessory
        >
          {props.data.map((image, index) => (
            <Tab.Panel key={index}>
              <div
                style={{
                  position: "relative",
                  overflow: "hidden",
                  // height: "100",
                  // maxHeight: "600px",
                  // minHeight: "400px",
                }}
                className={`${
                  props.styleAccessory
                    ? "min-h-[280px] min-w-[290px] md:min-h-[500px] max-h-[800px] max-w-[900px]"
                    : "min-h-[280px] max-w-[290px] md:min-h-[300px] max-h-[310px]"
                }w-full h-full`}
              >
                {" "}
                <Image
                  src={image.original}
                  alt={image.title}
                  className={props.stylesProps.thumbnailImageClass}
                  onClick={onOpenImageOverlay}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="eager"
                />
              </div>

              <ImageOverlay
                isVisible={isPicOverlaid}
                src={image.original}
                alt={image.title}
                onClose={onCloseImageOverlay}
              />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </>
  );
}
