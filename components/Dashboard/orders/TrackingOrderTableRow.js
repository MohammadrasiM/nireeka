import { useState } from "react";
import { getPrettyDate } from "../../../functions/convertors";
import Invoice from "../../Atoms/finance/Invoice";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";

const TrackingOrderTableRow = (props) => {
  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);

  const handleInvoiceOpen = () => {
    setIsInvoiceVisible(true);
  };

  const handleInvoiceClose = () => {
    setIsInvoiceVisible(false);
  };

  return (
    <tr className="bg-white">
      <td className="w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex">
          <span className="group inline-flex space-x-2 truncate text-sm">
            <svg
              className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-gray-900 group-hover:text-gray-900 font-bold">{props.order.id}</p>
          </span>
        </div>
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900 font-bold">${props.order.total_price} </span>
        USD
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        {!!props.order.shipped_at ? (
          <span>{getPrettyDate(props.order.shipped_at)}</span>
        ) : props.order.est_shipped_at ? (
          <span>{getPrettyDate(props.order.est_shipped_at)} (Est.)</span>
        ) : (
          <span>N/A</span>
        )}
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        {props.order.est_delivered_at ? (
          <span>{getPrettyDate(props.order.est_delivered_at)}</span>
        ) : (
          <span>N/A</span>
        )}
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        {props.order.courier.name || "N/A"}
      </td>
      <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
        {props.order.track_number || "N/A"}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 flex flex-col">
        <span onClick={handleInvoiceOpen}>
          <a href="#" className="text-sky-500 hover:underline">
            Invoice
          </a>
        </span>
        {props.order.courier.url && props.order.track_number && (
          <span>
            <a
              href={props.order.courier.url + props.order.track_number}
              target="_blank"
              rel="noreferrer"
              className="text-sky-500 hover:underline"
            >
              Track Order
            </a>
          </span>
        )}
      </td>

      <BlurBackdrop
        isVisible={isInvoiceVisible}
        onClose={handleInvoiceClose}
        backdropMode="dark"
        className="w-full md:w-[43rem] xl:w-[50rem]"
      >
        <Invoice orderId={props.order.id} />
      </BlurBackdrop>
    </tr>
  );
};

export default TrackingOrderTableRow;
