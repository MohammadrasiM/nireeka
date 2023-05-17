import { CogIcon, CubeIcon, PaperAirplaneIcon, PencilAltIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useState } from "react";
import classNames from "../../../functions/classNames";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import { getOrderDetailsData } from "../../../app/api/user/finance";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import Invoice from "../../Atoms/finance/Invoice";
import { commafy } from "../../../functions/numbers";
import Address from "../../Atoms/texts/Address";
import { getPrettyDate } from "../../../functions/convertors";

import { toast } from "react-toastify";
import OrderCardSkeleton from "@/components/Atoms/skeletonLoading/dashboard/OrderCardSkeleton";
import { MONTHS } from "app/constants/time";
import dynamic from "next/dynamic";
import { CONFIGURATOR_EDIT_ORDER_MODE } from "app/constants/configuratorModes";
import OrderTrackingModal from "./OrderTrackingModal";
import ExpressTruckIcon from "@/components/svg/ExpressTruckIcon";
import CourierTrackingInfo from "./CourierTrackingInfo";
import concat from "lodash/concat";
import uniqBy from "lodash/uniqBy";

const EditAddressModal = dynamic(() => import("../profile/EditAddressModal"));
const UpgradesListModal = dynamic(() => import("./UpgradesListModal"));

const OrderCard = ({ order, setIsLoading, isLoading }) => {
  const [orderDetails, setOrderDetails] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [isEditAddressModalVisible, setIsEditAddressModalVisible] = useState(false);
  const [isUpgradesModalVisible, setIsUpgradesModalVisible] = useState(false);
  const [isTrackOrderModalVisible, setIsTrackOrderModalVisible] = useState(false);

  const [bikeTotalPrice, setBikeTotalPrice] = useState(0);

  const orderPlaceDate = new Date(order?.order_placed ? order?.order_placed : null);

  const handleInvoiceModalOpen = () => {
    setIsInvoiceModalVisible(true);
  };

  const handleInvoiceModalClose = () => {
    setIsInvoiceModalVisible(false);
  };

  const getOrderDetails = useCallback(async () => {
    setIsLoading(true);
    try {
      const orderDetails = await getOrderDetailsData(order.order_bike_id);
      setOrderDetails(orderDetails?.data);
    } catch (error) {
      try {
        const orderDetails = await getOrderDetailsData(order.order_bike_id);
        setOrderDetails(orderDetails?.data);
      } catch (e) {
        console.log(e);
      }
    }
    setIsLoading(false);
  }, [order?.order_bike_id]);

  // useEffect(() => {
  //   getOrderDetails();
  // }, [getOrderDetails]);

  useEffect(() => {
    if (!order) return;

    let bikeTotalPriceToSet = order?.bike?.price;

    for (let upgrade of order?.upgrades) {
      if (upgrade?.price && order?.order_bike_id === upgrade?.order_bike_id) bikeTotalPriceToSet += upgrade?.price;
    }

    setBikeTotalPrice(bikeTotalPriceToSet);
  }, [order]);

  if (isLoading) return <OrderCardSkeleton />;

  // if (!orderDetails) return <Fragment />;

  /**
   * if progress === 0     : "Order Placed"
   * if 0 < progress < 100 : "Manufacturing"
   * if progress === 100   : "Assembled"
   * if progress === 101   : "Packed"
   * if progress === 102   : "Shipped"
   * if progress === 103   : "Delivered"
   */
  const PROGRESS = order.progress;

  return (
    <WhiteShadowCard className={classNames(order.is_refunded && "border-red-600 border bg-red-100")} noPadding>
      {/* Card Heading */}
      <div className="flex flex-col px-4 pt-6 space-y-3 sm:flex-row sm:space-y-0 sm:items-baseline sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">Order #{order.id}</h1>

        <span
          className="hidden ml-4 text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-500 sm:block"
          onClick={handleInvoiceModalOpen}
        >
          View invoice<span aria-hidden="true"> &rarr;</span>
        </span>
        <p className="text-sm text-gray-600 sm:ml-auto">
          Order placed{" "}
          <time dateTime="2021-03-22" className="font-medium text-gray-900">
            {MONTHS[orderPlaceDate.getMonth()] + " " + orderPlaceDate.getDate() + ", " + orderPlaceDate.getFullYear()}
          </time>
        </p>
        <span
          className="text-sm font-medium text-indigo-600 cursor-pointer hover:text-indigo-500 sm:hidden"
          onClick={handleInvoiceModalOpen}
        >
          View invoice<span aria-hidden="true"> &rarr;</span>
        </span>
      </div>

      {/* Order details */}
      <section aria-labelledby="products-heading" className="px-4 py-6 sm:p-6">
        <h2 id="products-heading" className="sr-only">
          Products purchased
        </h2>

        <div className="space-y-24">
          <div className="grid relative grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8">
            {/* Image */}
            {order.label && (
              <p className="pointer-events-none absolute top-3 left-3 z-10 rounded-full bg-sky-500 bg-opacity-90 py-0.5 px-1.5 text-[0.625rem] font-semibold uppercase leading-4 tracking-wide text-white">
                {order.label}
              </p>
            )}
            <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
              <div className="overflow-hidden rounded-lg aspect-w-1 aspect-h-1 bg-gray-50">
                {/* <img src={order.image} alt={order.title} className="object-cover object-center" /> */}
                <div className="w-full aspect-[1.74/1] relative">
                  <Image
                    src={order.image}
                    alt={order.title}
                    // width="100%"
                    // height="100%"
                    layout="fill"
                    objectFit="fill"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>
            {/* Product info */}
            <div className="sm:col-span-12 md:col-span-7">
              <dl className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 sm:gap-x-6">
                <div>
                  <dt className="text-base font-semibold text-gray-900">
                    <h3>
                      {order.title} <span className="text-gray-500 font-normal">{order?.bike?.variation}</span>
                    </h3>
                  </dt>
                  <dd className="font-light">
                    <p className="mt-3 text-3.5xl text-gray-900">${commafy(bikeTotalPrice)}</p>
                    <p className="mt-3 text-sm text-gray-500">
                      {order.color} / {order.size}&quot;
                    </p>
                  </dd>
                  {order.frame_no && (
                    <dd className="mt-4">
                      <span className="text-sm text-gray-500">
                        Frame no: <span className="text-base text-gray-800">{order.frame_no}</span>
                      </span>
                    </dd>
                  )}
                </div>
                <div>
                  <dt className="text-sm font-semibold text-gray-900">
                    <h3>Delivery Address</h3>
                  </dt>
                  <dd className="mt-3 font-light text-gray-500">
                    {order?.shipping_address ? <Address address={order?.shipping_address} /> : <p>No address found</p>}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <div className="px-4 py-6 text-left border-b border-gray-200 sm:p-6">
        {PROGRESS >= 102 && PROGRESS < 103 && !!order.shipped_at && (
          <WhiteButton className="inline-flex mb-2 mr-2" onClick={() => setIsTrackOrderModalVisible(true)}>
            <ExpressTruckIcon className="w-5 h-5 icon-stroke-width-1" />
            <span className="pl-1">Track Order</span>
          </WhiteButton>
        )}
        <WhiteButton className="inline-flex mb-2 mr-2" onClick={() => setIsUpgradesModalVisible(true)}>
          <CubeIcon className="w-5 h-5 icon-stroke-width-1" />
          <span className="pl-1">Upgrades</span>
        </WhiteButton>
        {order.progress < 100 && (
          <WhiteButton
            className="inline-flex mb-2 mr-2"
            href={{
              pathname: `/configurator/${order?.bike.slug}`,
              query: {
                orderBikeID: order.order_bike_id,
                mode: CONFIGURATOR_EDIT_ORDER_MODE,
              },
            }}
          >
            <PaperAirplaneIcon className="w-5 h-5 icon-stroke-width-1" />
            <span className="pl-1">Get New Upgrades</span>
          </WhiteButton>
        )}
        {order?.shipping_address && PROGRESS < 100 && (
          <WhiteButton className="inline-flex mb-2 mr-2" onClick={() => setIsEditAddressModalVisible(true)}>
            <PencilAltIcon className="w-5 h-5 icon-stroke-width-1" />
            <span className="pl-2">Edit Delivery Address</span>
          </WhiteButton>
        )}
        <WhiteButton
          className="inline-flex mb-2 mr-2"
          href={{
            pathname: "/spares",
            query: { parents: order?.bike.id },
          }}
        >
          <CogIcon className="w-5 h-5 icon-stroke-width-1" />
          <span className="pl-2">Spare Parts</span>
        </WhiteButton>
      </div>

      {/* Progress Bar */}
      {order.is_refunded ? (
        <div className="flex flex-col px-4 py-6 sm:p-6">
          <span className="text-red-600">This order is refunded</span>
          {!!order.refunded_at && (
            <span>
              Refunded at: <span className="text-gray-700">{getPrettyDate(order.refunded_at)}</span>
            </span>
          )}
        </div>
      ) : (
        <div className="px-4 py-6 sm:p-6">
          <div className="text-sm text-gray-900">
            {PROGRESS <= 101 && !!order.est_shipped_at && (
              <div>
                <span>Preparing to ship on </span>
                <time dateTime={order.est_shipped_at}>{getPrettyDate(order.est_shipped_at)}</time>
              </div>
            )}
            {PROGRESS === 102 && !!order.est_delivered_at && (
              <div>
                <span>Estimated delivery on </span>
                <time dateTime={order.est_delivered_at}>{getPrettyDate(order.est_delivered_at)}</time>
              </div>
            )}
            {PROGRESS === 102 && order.shipped_at && (
              <div>
                <span className="text-sm">Shipped at </span>
                <time dateTime={order.shipped_at}>{getPrettyDate(order.shipped_at)}</time>
              </div>
            )}
            {PROGRESS === 103 && order.delivered_at && (
              <div>
                <span className="text-sm">Delivered at </span>
                <time dateTime={order.delivered_at}>{getPrettyDate(order.delivered_at)}</time>
              </div>
            )}
          </div>
          <div className="mt-6">
            <div className="overflow-hidden bg-gray-200 rounded-full">
              <div
                className="h-2 bg-indigo-600 rounded-full"
                style={{
                  width:
                    PROGRESS === 0
                      ? "10%"
                      : PROGRESS < 100
                      ? `${20 + (PROGRESS / 100) * 10}%`
                      : `${40 + (PROGRESS % 100) * 20}%`,
                }}
              />
            </div>
            <div className="grid grid-cols-5 mt-6 text-sm text-gray-600">
              <div className={classNames(PROGRESS >= 0 && "text-indigo-600", "mr-1")}>Order Placed</div>
              <div className={classNames(PROGRESS > 0 && "text-indigo-600", "sm:text-center mr-1")}>
                {PROGRESS < 100 ? `Manufacturing (${PROGRESS}%)` : "Assembled"}
              </div>
              <div className={classNames(PROGRESS > 100 && "text-indigo-600", "text-center mr-1")}>Packed</div>
              <div className={classNames(PROGRESS > 101 && "text-indigo-600", "text-center mr-1")}>Shipped</div>
              <div className={classNames(PROGRESS > 102 && "text-indigo-600", "text-right mr-1")}>Delivered</div>
            </div>
          </div>
        </div>
      )}

      {/* Tracking number and courier data */}
      {(!!order?.courier?.name || !!order?.track_number) && (
        <div className="flex flex-col px-4 py-6 sm:p-6">
          <CourierTrackingInfo courier={order.courier} trackNumber={order.track_number} />
        </div>
      )}

      {/* Billing */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">
          Billing Summary
        </h2>
        <div
          className={classNames(
            order.is_refunded ? "bg-red-100" : "bg-gray-50",
            "px-4 py-6 sm:rounded-br-lg sm:rounded-bl-lg lg:grid lg:grid-cols-12 lg:gap-x-8 sm:p-6 "
          )}
        >
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">Billing address</dt>
              <dd className="mt-3 text-gray-500">
                {order?.billing_address ? <Address address={order?.billing_address} /> : <p>No address found</p>}
              </dd>
            </div>
            {order?.payment_methods && (
              <div>
                <dt className="font-medium text-gray-900">Payment information</dt>
                <div className="mt-3">
                  <dd className="flex flex-wrap -mt-4 -ml-4">
                    <div className="flex flex-grow mt-4 ml-4 space-x-2">
                      {order?.payment_methods?.logo && (
                        <div className="h-5 w-14">
                          <Image
                            width={56}
                            height={18}
                            alt={order?.payment_methods.name}
                            src={order?.payment_methods.logo}
                            className="object-contain"
                          />
                        </div>
                      )}
                      {order?.payment_methods.name && <p className="text-sm">{order?.payment_methods.name}</p>}
                    </div>
                    <div className="mt-4 ml-4">
                      {order?.payment_methods.number_card && (
                        <p className="text-gray-900">Ending with {order?.payment_methods.number_card.substr(-4)}</p>
                      )}
                      {order?.payment_methods.expire && (
                        <p className="text-gray-600">Expires {order?.payment_methods.expire}</p>
                      )}
                    </div>
                  </dd>
                </div>
              </div>
            )}
          </dl>

          <dl className="mt-8 text-sm divide-y divide-gray-200 lg:mt-0 lg:col-span-5">
            {!!order?.prices?.sub_total && (
              <div className="flex items-center justify-between pb-4">
                <dt className="text-gray-600">Subtotal</dt>
                <dd className="font-medium text-gray-900">${commafy(order?.prices?.sub_total)}</dd>
              </div>
            )}
            {!!order?.prices?.shipping && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Shipping</dt>
                <dd className="font-medium text-gray-900">${commafy(order?.prices?.shipping)}</dd>
              </div>
            )}
            {!!order?.prices?.vat && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Tax</dt>
                <dd className="font-medium text-gray-900">${commafy(order?.prices?.vat)}</dd>
              </div>
            )}
            {!!order?.prices?.credit && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Credit</dt>
                {+order?.prices?.credit > 0 ? (
                  <dd className="font-medium text-green-600">${commafy(order?.prices?.credit)}</dd>
                ) : (
                  <dd className="font-medium text-red-500">-${commafy(Math.abs(order?.prices?.credit))}</dd>
                )}
              </div>
            )}
            {!!order?.prices?.discount && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Discount</dt>
                <dd className="font-medium text-green-600">-${commafy(Math.abs(order?.prices?.discount))}</dd>
              </div>
            )}
            {!!order?.prices?.refund_amount && (
              <div className="flex items-center justify-between py-4">
                <dt className="text-gray-600">Refund</dt>
                {<dd className="font-medium text-green-600">-${commafy(Math.abs(order?.prices?.refund_amount))}</dd>}
              </div>
            )}
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Order total</dt>
              <dd className="font-medium text-indigo-600">
                ${commafy(order?.prices?.total_price > 0 ? order?.prices?.total_price : 0)}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <BlurBackdrop
        isVisible={isInvoiceModalVisible}
        onClose={handleInvoiceModalClose}
        backdropMode="dark"
        className="w-full md:w-[43rem] xl:w-[50rem]"
      >
        <Invoice orderId={order.id} latestUpgrades={order?.upgrades} />
      </BlurBackdrop>

      {!!order?.shipping_address && (
        <BlurBackdrop
          isVisible={isEditAddressModalVisible}
          onClose={() => setIsEditAddressModalVisible(false)}
          backdropMode="dark"
          className="w-full md:w-[43rem] xl:w-[50rem]"
        >
          <EditAddressModal
            addressId={orderDetails?.shipping_address.id}
            onClose={() => setIsEditAddressModalVisible(false)}
            onSuccess={getOrderDetails}
          />
        </BlurBackdrop>
      )}

      <BlurBackdrop
        isVisible={isUpgradesModalVisible}
        onClose={() => setIsUpgradesModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[43rem] xl:w-[50rem]"
      >
        <UpgradesListModal
          upgrades={uniqBy(concat(order?.order_upgrades || [], order?.upgrades || []), "title")}
          orderBikeId={order.order_bike_id}
          bikeSlug={order?.bike.slug}
          isUpgradable={PROGRESS < 100}
        />
      </BlurBackdrop>

      <BlurBackdrop
        isVisible={isTrackOrderModalVisible}
        onClose={() => setIsTrackOrderModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[43rem] xl:w-[50rem]"
      >
        <OrderTrackingModal
          shippingDate={order.shipped_at}
          deliveryDate={order.est_delivered_at}
          orderProgress={PROGRESS}
          trackNumber={order.track_number}
          courier={order.courier}
        />
      </BlurBackdrop>
    </WhiteShadowCard>
  );
};

export default OrderCard;
