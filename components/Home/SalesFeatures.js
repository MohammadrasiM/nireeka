import Image from "next/image";
import Link from "next/link";
import iconFast from "../../public/images/delivery/icon-fast-checkout-light.png";
import iconGift from "../../public/images/delivery/icon-gift-card-light.png";
import iconChat from "../../public/images/delivery/icon-chat-light.png";

const incentives = [
  {
    name: "Always on-sales",
    description:
      "Get our preferred upgrades and parts in the configurator and the website generates a promo code based on your total price.",
    imageSrc: iconGift,
    tohref: "",
    textHref: "",
  },
  {
    name: "1-year warranty",
    description:
      "All the Nireeka bikes and parts are subject to a one-year or 1,600 Miles (2,600 Kilometers) warranty. ",
    imageSrc: iconChat,
    tohref: "/warranty",
    textHref: "Check the warranty terms",
  },
  {
    name: "Customer Support",
    description:
      "Our AI chat widget is powered by a naive series of if/else statements. We also have several other ",
    imageSrc: iconChat,
    tohref: "/contact",
    textHref: "communication channels",
  },
  {
    name: "Door Delivery",
    description:
      "We have door delivery service in more than 60 countries around the world. Awesome, right? ",
    imageSrc: iconFast,
    tohref: "/help-center/topic/18/do-you-ship-to-my-country",
    textHref: "Check the list",
  },
];

export default function Illustrations() {
  return (
    <div className="z-[5] relative">
      <div className="bg-gray-50">
        <div className="py-24 mx-auto max-w-7xl sm:px-2 sm:py-32 lg:px-4">
          <div className="grid max-w-2xl grid-cols-1 px-4 mx-auto gap-y-12 gap-x-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {incentives.map((incentive) => {
              return (
                <div className="sm:flex" key={incentive.name}>
                  <div className="sm:flex-shrink-0">
                    <div className="flex justify-center md:justify-start">
                      <Image
                        src={incentive.imageSrc}
                        alt={incentive.name}
                        className="w-auto h-24"
                        width={120}
                        height={100}
                      />
                      {/* {incentive.imageSrc} */}
                    </div>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <h3 className="font-medium text-center text-gray-900  md:text-left">
                      {incentive.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500 text-center md:text-left">
                      {incentive.description}
                      <span className="inline">
                        <Link href={incentive.tohref} passHref>
                          <a className="underline hover:text-indigo-600 " target="_blank">
                            {incentive.textHref}
                          </a>
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
