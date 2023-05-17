import Invoice from "@/components/Atoms/finance/Invoice";
import BlurBackdrop from "@/components/Atoms/overlays/BlurBackdrop";
import { Menu, Transition } from "@headlessui/react";
import {
  ClipboardCheckIcon,
  CreditCardIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { deletePaymentByOrderId } from "app/api/user/finance";
import { CONFIRM_ORDER_DELETE_MODAL } from "app/constants/modals";
import { useConfirmationModal } from "hooks/useConfirmationModal";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";

export default function PaymentRecordMenu(props) {
  const { getConfirmation } = useConfirmationModal();

  const [isInvoiceVisible, setIsInvoiceVisible] = useState(false);

  const handleInvoiceOpen = () => {
    setIsInvoiceVisible(true);
  };

  const handleInvoiceClose = () => {
    setIsInvoiceVisible(false);
  };

  const { onSuccess } = props;

  const handlePaymentDeletionClick = async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_ORDER_DELETE_MODAL,
    });

    if (isConfirmed) {
      try {
        const res = await deletePaymentByOrderId(props.orderId);
        toast.success("Payment deleted successfully");
        if (typeof onSuccess === "function") onSuccess();
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left ml-auto">
      <div>
        <Menu.Button className="rounded-full flex items-center text-gray-900 hover:text-blue-600 focus:outline-none">
          <span className="sr-only">Open options</span>
          <DotsHorizontalIcon
            className="h-5 w-5 opacity-70 icon-stroke-width-1"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <Menu.Item
              as="div"
              className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
              onClick={handleInvoiceOpen}
            >
              <ClipboardCheckIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
              <span>Invoice</span>
            </Menu.Item>

            {props.paymentStatus.toLowerCase() === "unpaid" && (
              <Menu.Item
                as="div"
                className="flex text-red-500 hover:bg-gray-100 px-4 py-2 text-xs font-light cursor-pointer"
                onClick={handlePaymentDeletionClick}
              >
                <TrashIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                <span>Delete</span>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>

      <BlurBackdrop
        isVisible={isInvoiceVisible}
        onClose={handleInvoiceClose}
        backdropMode="dark"
        className="w-full md:w-[43rem] xl:w-[50rem]"
      >
        <Invoice orderId={props.orderId} />
      </BlurBackdrop>
    </Menu>
  );
}
