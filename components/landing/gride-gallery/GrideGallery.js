import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { GetWindowSize } from "@/components/Atoms/windowSize/GetWindowSize";
import React, { useState } from "react";
import Styles from "./style.module.css";

const gallery = [
  {
    id: 1,
    name: "nireeka-prime",
    href: "../../../../images/prime/gallery-slide-03-nireeka-prime.jpg",
  },
  {
    id: 2,
    name: "prime-2",
    href: "../../../../images/prime/gallery-slide-02-nireeka-prime.jpg",
  },
  {
    id: 3,
    name: "prime-3",
    href: "../../../../images/prime/gallery-slide-08-nireeka-prime.jpg",
  },
  {
    id: 4,
    name: "prime-4",
    href: "../../../../images/prime/gallery-slide-04-nireeka-prime.jpg",
  },
  {
    id: 5,
    name: "prime-5",
    href: "../../../../images/prime/gallery-slide-06-nireeka-prime.jpg",
  },
  {
    id: 6,
    name: "prime-6",
    href: "../../../../images/prime/gallery-slide-05-nireeka-prime.jpg",
  },
  {
    id: 7,
    name: "prime-7",
    href: "../../../../images/prime/gallery-slide-07-nireeka-prime.jpg",
  },
  {
    id: 8,
    name: "prime-8",
    href: "../../../../images/prime/gallery-slide-01-nireeka-prime.jpg",
  },
  {
    id: 9,
    name: "prime-9",
    href: "../../../../images/prime/gallery-slide-09-nireeka-prime.jpg",
  },
  {
    id: 10,
    name: "prime-10",
    href: "../../../../images/prime/gallery-slide-10-nireeka-prime.jpg",
  },

  {
    id: 11,
    name: "prime-12",
    href: "../../../../images/prime/gallery-slide-12-nireeka-prime.jpg",
  },
  {
    id: 12,
    name: "prime-11",
    href: "../../../../images/prime/gallery-slide-11-nireeka-prime.jpg",
  },
];
function GrideGallery() {
  const { height, width } = GetWindowSize();
  const [selected, setSelected] = useState(null);
  return (
    <div className={width > 768 ? Styles.animatedGrid : Styles.animatedGridSm}>
      {gallery.map((item) => {
        return (
          <div
            key={item.id}
            className={width > 768 ? Styles.card : Styles.cardSm}
          >
            <img
              src={item.href}
              alt={item.name}
              key={item.id}
              className="object-cover w-full h-full cursor-pointer "
              onClick={() => setSelected(item.id)}
            />
          </div>
        );
      })}

      {/* modal */}
      {gallery.map((item) => {
        return (
          <BlurBackdrop
            key={item.id}
            isVisible={selected === item.id}
            onClose={() => setSelected(null)}
            backdropColorClass="bg-black/40"
            // className="relative w-full mx-auto h-inherit top-7 md:max-w-6xl"
          >
            <WhiteShadowCard noPadding className=" rounded-2xl">
              <img
                src={item.href}
                alt={item.name}
                key={item.id}
                className="object-cover w-full h-full cursor-pointer rounded-2xl "
              />
            </WhiteShadowCard>
          </BlurBackdrop>
        );
      })}
    </div>
  );
}

export default GrideGallery;
