import { Menu, Transition } from "@headlessui/react";
import {
  BadgeCheckIcon,
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { Fragment, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { deleteShippingAddress, setUserDefaultAddress } from "../../../app/api/user/profile";
import { CONFIRM_ADDRESS_DELETE_MODAL } from "../../../app/constants/modals";
import { useConfirmationModal } from "../../../hooks/useConfirmationModal";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import EditAddressModal from "./EditAddressModal";

const AddressEntryMenu = (props) => {
  const { getConfirmation } = useConfirmationModal();
  const [isEditAddressModalVisible, setIsEditAddressModalVisible] = useState(false);

  const { onSuccess } = props;

  const handleDeleteClick = useCallback(async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_ADDRESS_DELETE_MODAL,
    });

    if (isConfirmed) {
      try {
        await deleteShippingAddress(props.addressId);
        toast.success("Address deleted successfully");
        if (typeof onSuccess === "function") onSuccess();
      } catch (error) {
        console.log(error)
      }
    }
  }, [props.addressId, onSuccess, getConfirmation]);

  const handleSetAddressDefault = useCallback(async () => {
    try {
      const res = await setUserDefaultAddress(props.addressId);
      toast.success("Address was set as default successfully");
      if (typeof onSuccess === "function") onSuccess();
    } catch (error) {
      console.log(error)
    }
  }, [props.addressId, onSuccess]);

  return (
    <Menu as="div" className="relative inline-block text-left">
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
            {!props.isItemActive && (
              <Menu.Item
                as="div"
                className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
                onClick={() => setIsEditAddressModalVisible(true)}
              >
                <PencilIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                <span>Edit</span>
              </Menu.Item>
            )}

            {!props.isDefault && (
              <Menu.Item
                as="div"
                className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
                onClick={handleSetAddressDefault}
              >
                <BadgeCheckIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                <span>Set as Default</span>
              </Menu.Item>
            )}

            {!props.isItemActive && (
              <Menu.Item
                as="div"
                className="flex text-red-500 hover:bg-gray-100 px-4 py-2 text-xs font-light cursor-pointer"
                onClick={handleDeleteClick}
              >
                <TrashIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                <span>Delete</span>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>

      <BlurBackdrop
        isVisible={isEditAddressModalVisible}
        onClose={() => setIsEditAddressModalVisible(false)}
        backdropMode="dark"
        className="w-full md:w-[60%]"
      >
        <EditAddressModal
          addressId={props.addressId}
          onClose={() => setIsEditAddressModalVisible(false)}
          onSuccess={onSuccess}
        />
      </BlurBackdrop>
    </Menu>
  );
};

export default AddressEntryMenu;
