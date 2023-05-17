import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
  EyeOffIcon,
  EyeIcon,
} from "@heroicons/react/outline";
import {
  deleteThread,
  togglePostVisibility,
} from "../../../app/api/forum/threads";
import { useConfirmationModal } from "../../../hooks/useConfirmationModal";
import {
  CONFIRM_THREAD_DELETION_MODAL,
  CONFIRM_THREAD_HIDE_MODAL,
  CONFIRM_THREAD_SHOW_MODAL,
} from "../../../app/constants/modals";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import ThreadUnsubscriptionBtn from "./ThreadUnsubscriptionBtn";
import ThreadSubscriptionBtn from "./ThreadSubscriptionBtn";

const PostMenuAuth = (props) => {
  const router = useRouter();
  // State to decide either to show subscribe button or unsubscribe button
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed);

  // Subscription logic
  const handleSubscribeClick = () => {
    setIsSubscribed(true);
  };
  const handleUnsubscribeClick = () => {
    setIsSubscribed(false);
  };

  // Thread deletion logic
  const { getConfirmation } = useConfirmationModal();
  const deleteThreadHandler = async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_THREAD_DELETION_MODAL,
    });

    if (isConfirmed) {
      const res = await deleteThread(props.threadId);
      if (res instanceof Error) {
        console.log('error')
        return;
      }

      toast.success("Thread was deleted successfully.");
      router.push("/forum/1");
    }
  };

  const handleToggleVisibility = async () => {
    let isConfirmed;
    if (props.isThreadHidden) {
      isConfirmed = await getConfirmation({
        ...CONFIRM_THREAD_SHOW_MODAL,
      });
    } else {
      isConfirmed = await getConfirmation({
        ...CONFIRM_THREAD_HIDE_MODAL,
      });
    }

    if (isConfirmed) {
      const res = await togglePostVisibility(props.threadId);

      if (res instanceof Error) {
        const message = props.isThreadHidden
          ? "Couldn't make the thread visible, please try again later!"
          : "Couldn't hide the thread, please try again later!";
        toast.error(message);
        console.log("Error hiding/showing post", res);
        return;
      }

      const message = props.isThreadHidden
        ? "Thread is now visible"
        : "Thead is now hidden";
      toast.success(message);
      props.togglePostVisibilityStyle();
    }
  };

  return (
    <Menu as="div" className="relative inline-block text-left z-10">
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item
              as="div"
              className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 text-xs font-light cursor-pointer"
            >
              {isSubscribed ? (
                <ThreadUnsubscriptionBtn
                  handleStateUpdate={handleUnsubscribeClick}
                  threadId={props.threadId}
                />
              ) : (
                <ThreadSubscriptionBtn
                  handleStateUpdate={handleSubscribeClick}
                  threadId={props.threadId}
                />
              )}
            </Menu.Item>
            <Menu.Item
              as="div"
              className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
              onClick={props.toggleEditMode}
            >
              <PencilIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
              <span>Edit</span>
            </Menu.Item>
            <Menu.Item
              as="div"
              className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer"
              async
              onClick={handleToggleVisibility}
            >
              {props.isThreadHidden ? (
                <>
                  <EyeIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                  <span>Show Post</span>
                </>
              ) : (
                <>
                  <EyeOffIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                  <span>Hide Post</span>
                </>
              )}
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

export default PostMenuAuth;
