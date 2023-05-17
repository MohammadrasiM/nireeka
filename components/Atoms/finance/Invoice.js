import { PrinterIcon } from "@heroicons/react/outline";
import { getPrettyDate } from "functions/convertors";
import Image from "next/image";
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import { getOrderInvoiceData } from "../../../app/api/user/finance";
import { commafy } from "../../../functions/numbers";
import { printContent } from "../../../functions/printContent";
import WhiteButton from "../buttons/WhiteButton";
import WhiteShadowCard from "../cards/WhiteShadowCard";
import LoadingNireeka from "../LoadingNireeka";
import Address from "../texts/Address";
import InvoiceRow from "./InvoiceRow";

const Invoice = (props) => {
  // Array to define different item types received from API, to easily render them
  const itemTypes = useMemo(
    () => [
      { keyInAPI: "order_bikes", label: "Bike" },
      { keyInAPI: "order_spares", label: "Spare Part" },
      { keyInAPI: "order_accessories", label: "Accessory" },
      { keyInAPI: "order_warranties", label: "Warranty" },
    ],
    []
  );

  const invoiceRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState(null);
  const [bikeToUpgradesMap, setBikeToUpgradesMap] = useState(new Map());

  const shippingCost = invoiceData?.price?.shipping || 0;
  const expeditedShipping = invoiceData?.expedited_shipping || 0;
  const vat = invoiceData?.price?.vat || 0;
  const discount = Math.abs(invoiceData?.price?.discount || 0);
  const credit = invoiceData?.price?.credit || 0;
  const warranty = invoiceData?.warranty || 0;
  const refundAmount = invoiceData?.refund_amount || 0;

  const getInvoiceData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getOrderInvoiceData(props.orderId);
      for (let i = 0; i < itemTypes.length; i++) {
        for (let order of res.data[itemTypes[i].keyInAPI]) {
          if (order.refund) {
            i = itemTypes.length; // To break the outer for loop
            break;
          }
        }
      }

      setInvoiceData(res.data);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, [props.orderId]);

  useEffect(() => {
    getInvoiceData();
  }, [getInvoiceData]);

  useEffect(() => {
    if (!invoiceData) return;
    const bikeToUpgradesMapToSet = new Map();

    // Mapping upgrades to their respective bike, and calculating the upgrades price
    const upgradesToReadFrom =
      props.latestUpgrades && props.latestUpgrades.length > 0
        ? props.latestUpgrades
        : invoiceData?.order_upgrades;
    if (upgradesToReadFrom)
      for (let upgrade of upgradesToReadFrom) {

        const bikeUpgrades = bikeToUpgradesMapToSet.get(upgrade.order_bike_id);
        if (!!bikeUpgrades)
          bikeToUpgradesMapToSet.set(upgrade.order_bike_id, [...bikeUpgrades, upgrade]);
        else bikeToUpgradesMapToSet.set(upgrade.order_bike_id, [upgrade]);
      }

    // If there is no bike, I have to render the upgrades directly. And that's because no one can buy extra upgrades with a bike in one checkout
    if (
      (!invoiceData?.order_bikes || invoiceData.order_bikes.length === 0) &&
      !itemTypes.find((itemType) => itemType.keyInAPI === "order_upgrades")
    ) {
      itemTypes.unshift({ keyInAPI: "order_upgrades", label: "Upgrades" });
    }

    setBikeToUpgradesMap(bikeToUpgradesMapToSet);
  }, [
    credit,
    shippingCost,
    warranty,
    expeditedShipping,
    vat,
    discount,
    refundAmount,
    invoiceData,
    props.latestUpgrades,
  ]);

  // RENDERING
  if (isLoading) {
    return (
      <WhiteShadowCard className="flex justify-center">
        <LoadingNireeka className="w-12 h-12 border-gray-600" />
      </WhiteShadowCard>
    );
  }

  if (!invoiceData) {
    return (
      <WhiteShadowCard className="flex justify-center">
        <span>Sorry couldn&apos;t fetch your invoice data.</span>
      </WhiteShadowCard>
    );
  }

  return (
    <WhiteShadowCard ref={invoiceRef}>
      {/* Header */}
      <div className="flex px-4">
        <div>
          <h1 className="font-medium text-2xl">Order #{invoiceData.id}</h1>
          <span className="text-sm">
            Date: <span>{getPrettyDate(invoiceData.date)}</span>
          </span>
          <div className="mt-3">
            <WhiteButton
              onClick={() => {
                printContent(invoiceRef, `Order #${invoiceData.id} - Nireeka`);
              }}
              className="space-x-2"
            >
              <PrinterIcon className="w-5 h-5 icon-stroke-width-1" />
              <span>Print</span>
            </WhiteButton>
          </div>
        </div>
        <div className="ml-auto">
          <Image
            width={171}
            height={24}
            objectFit="cover"
            alt=""
            src="/images/logo_nireeka_dark.svg"
          />
          <h2 className="font-light text-sm mt-2">Nireeka Technologies Inc.</h2>
        </div>
      </div>

      {/* Using <br /> to put space in the print document version */}
      <br />
      <br />

      {/* Addresses */}
      <div className="px-4">
        <h3 className="font-medium">Billing Address</h3>
        {invoiceData.billing_address ? (
          <Address address={invoiceData.billing_address} />
        ) : (
          <p className="font-light">N/A</p>
        )}
      </div>

      {/* Using <br /> to put space in the print document version */}
      <br />
      <br />

      {/* Items */}
      <div>
        <table className="table-auto w-full">
          <thead className="bg-gray-100 h-12">
            <tr>
              <th className="text-left font-medium pl-4">Item</th>
              <th className="text-right font-medium pr-4">Final Price</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {itemTypes.map((type) =>
              invoiceData[type.keyInAPI].map((item) =>
                type.label === "Bike" ? (
                  <InvoiceRow
                    key={type.label + "-" + item.title}
                    item={item}
                    type={type.label}
                    bikeUpgrades={bikeToUpgradesMap.get(item.order_bike_id)}
                  />
                ) : (
                  <InvoiceRow key={type.label + "-" + item.title} item={item} type={type.label} />
                )
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Billing */}
      <dl className="mt-8 divide-y divide-gray-200 text-sm px-4">
        {!!invoiceData?.price?.sub_total && (
          <div className="pb-3 flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd className="font-medium text-gray-900">${commafy(invoiceData?.price?.sub_total)}</dd>
          </div>
        )}
        {!!shippingCost && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd className="font-medium text-gray-900">${commafy(shippingCost)}</dd>
          </div>
        )}
        {!!expeditedShipping && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Expedited Shipping</dt>
            <dd className="font-medium text-gray-900">${commafy(expeditedShipping)}</dd>
          </div>
        )}
        {!!vat && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Tax</dt>
            <dd className="font-medium text-gray-900">${commafy(vat)}</dd>
          </div>
        )}
        {!!warranty && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Warranty</dt>
            <dd className="font-medium text-gray-900">${commafy(warranty)}</dd>
          </div>
        )}
        {!!credit && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Credit</dt>
            {+credit > 0 ? (
              <dd className="font-medium text-green-600">${commafy(credit)}</dd>
            ) : (
              <dd className="font-medium text-red-500">-${commafy(Math.abs(credit))}</dd>
            )}
          </div>
        )}
        {!!discount && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Discount</dt>
            <dd className="font-medium text-green-600">-${commafy(Math.abs(discount))}</dd>
          </div>
        )}
        {!!refundAmount && (
          <div className="py-3 flex items-center justify-between">
            <dt className="text-gray-600">Refund</dt>
            <dd className="font-medium text-green-600">-${commafy(Math.abs(refundAmount))}</dd>
          </div>
        )}
        <div className="pt-3 flex items-center justify-between">
          <dt className="font-medium text-gray-900">Order total</dt>
          <dd className="font-medium text-indigo-600">
            ${commafy(props.orderTotalAlwaysZero ? 0 : invoiceData?.price?.total_price)}
          </dd>
        </div>
      </dl>
    </WhiteShadowCard>
  );
};

export default Invoice;
