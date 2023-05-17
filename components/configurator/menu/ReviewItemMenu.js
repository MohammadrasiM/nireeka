import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {DotsHorizontalIcon, PencilIcon, TrashIcon} from "@heroicons/react/outline";
import { useConfirmationModal } from "hooks/useConfirmationModal";
import {
  CONFIRM_THREAD_DELETION_MODAL
} from "app/constants/modals";
import {useDispatch, useSelector} from "react-redux";
import {deleteReviewPending} from "app/store/configuratorSlice";
import ButtonLoadingIcon from "@/components/Atoms/buttons/ButtonLoadingIcon";

const ReviewItemMenu = ({review, onEdit}) => {
  const dispatch = useDispatch();
  const deleteReviewIsLoading = useSelector((state) => state?.configurator.deleteReviewIsLoading);
  const deleteReviewId = useSelector((state) => state?.configurator.deleteReviewId);

  const { getConfirmation } = useConfirmationModal();
  const deleteThreadHandler = async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_THREAD_DELETION_MODAL,
    });
    if (isConfirmed)
      dispatch(deleteReviewPending(review))

  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        {deleteReviewIsLoading && deleteReviewId === review?.id ? <ButtonLoadingIcon classNames="h-4 w-4" color="border-blue-500" /> : <Menu.Button className="rounded-full flex items-center text-gray-900 hover:text-blue-600 focus:outline-none">
          <span className="sr-only">Open options</span>
          <DotsHorizontalIcon
              className="h-5 w-5 opacity-70 icon-stroke-width-1"
              aria-hidden="true"
          />
        </Menu.Button>}
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="div"
              disabled={deleteReviewIsLoading}
              className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
              onClick={onEdit}
            >
              <PencilIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
              <span>Edit</span>
            </Menu.Item>
            <Menu.Item
              as="div"
              className="flex text-red-500 hover:bg-gray-100 px-4 py-2 text-xs font-light cursor-pointer"
              onClick={deleteThreadHandler}
            >
              <TrashIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
              <span>Delete</span>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ReviewItemMenu;
