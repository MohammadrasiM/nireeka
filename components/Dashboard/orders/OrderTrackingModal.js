import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import classNames from "functions/classNames";
import { getPrettyDate } from "functions/convertors";
import Link from "next/link";
import CourierTrackingInfo from "./CourierTrackingInfo";

const timeline = [
  {
    description: "Departure from the factory",
    addedDays: 0,
  },
  {
    description: "Arrival scan at forwarder's warehouse (The shipping company)",
    addedDays: 1,
  },
  {
    description: "Scanned Induction into the system scan barcode system",
    addedDays: 2,
  },
  {
    description: "Port of Origin",
    addedDays: 4,
  },
  {
    description: "Customs paperwork/Loaded into the vessel",
    addedDays: 3,
  },
  {
    description: "Vessel to the destination customs",
    addedDays: 30,
  },
  {
    description: "Arrival at the destination customs",
    addedDays: 2,
  },
  {
    description: "Customers clearance",
    addedDays: 5,
  },
  {
    description: "Arrival scan at the receiving location warehouse",
    addedDays: 10,
  },
  {
    description: "Scanned for sortation",
    addedDays: 1,
  },
  {
    description: "Scanned out of delivery",
    addedDays: 2,
  },
  {
    description: "Arranging courier collection",
    addedDays: 1,
  },
];

const OrderTrackingModal = (props) => {
  const todayDate = new Date();
  todayDate.setHours(0, 0, 0);

  const eventDate = !!props.shippingDate
    ? new Date(
        props.shippingDate.includes("/")
          ? props.shippingDate.replaceAll("/", "-")
          : props.shippingDate
      )
    : null;

  if (!eventDate) {
    <WhiteShadowCard>
      <span className="text-sm">
        Sorry, there is no data available for your order status right now.
      </span>
    </WhiteShadowCard>;
  }

  return (
    <WhiteShadowCard>
      <div className="flex flex-col space-y-2 mb-4">
        <span className="text-2xl">Shipping</span>
        <span className="text-sm text-red-500">
          Please note that all dates are estimated and subject to change due to courier service
          delays and disruption, the pandemic outbreak of COVID-19, and other conditions beyond our
          control.
        </span>
      </div>
      <div className="relative">
        <div className="absolute h-full w-[2px] bg-blue-400 left-6 -translate-x-[13px] m-0"></div>
        {timeline.map((event) => {
          eventDate.setDate(eventDate.getDate() + event.addedDays);

          return (
            <div
              key={eventDate.getTime() + "-" + event.description.length}
              className="flex justify-between mb-6 last:mb-0"
            >
              <div>
                <div
                  className={classNames(
                    "w-6 h-6 rounded-full border border-blue-400 relative z-[1]",
                    todayDate.getTime() >= eventDate.getTime() || props.orderProgress === 103
                      ? "bg-blue-400"
                      : "bg-white"
                  )}
                ></div>
              </div>
              <div className="flex-grow px-4">
                <span className="text-sm max-w-full">{event.description}</span>
              </div>
              <div>
                <span className="text-sm">{getPrettyDate(eventDate)}</span>
              </div>
            </div>
          );
        })}
        <div className="flex justify-between mb-6 last:mb-0">
          <div>
            <div
              className={classNames(
                "w-6 h-6 rounded-full border top-full -translate-y-full border-blue-500 relative z-[1]",
                props.orderProgress === 103 ? "bg-blue-500" : "bg-white"
              )}
            ></div>
          </div>
          <div className="flex flex-col flex-grow px-4">
            <span className="max-w-full">Delivery</span>
            {/* <span className="text-sm text-gray-700">
              <Link href={"/"} passHref>
                <a className="text-blue-500 hover:underline">Click here</a>
              </Link>{" "}
              if you have already taken delivery of your bike.
            </span> */}
            <CourierTrackingInfo courier={props.courier} trackNumber={props.trackNumber} />
          </div>
          <div>
            {/* {!!props.deliveryDate && (
              <span className="text-sm">{getPrettyDate(props.deliveryDate)}</span>
            )} */}
          </div>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default OrderTrackingModal;
