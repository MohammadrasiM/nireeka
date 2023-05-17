import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import {
  DotsHorizontalIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  EyeOffIcon,
} from "@heroicons/react/outline";
import { useConfirmationModal } from "../../../hooks/useConfirmationModal";
import { CONFIRM_COMMENT_DELETION_MODAL } from "../../../app/constants/modals";
import { deleteCommentById } from "../../../app/api/forum/comments";
import { toast } from "react-toastify";

const CommentMenu = (props) => {
  // Comment deletion logic
  const { getConfirmation } = useConfirmationModal();
  const commentDeleteHandler = async () => {
    const isConfirmed = await getConfirmation({
      ...CONFIRM_COMMENT_DELETION_MODAL,
    });

    if (isConfirmed) {
      const res = await deleteCommentById(props.commentId);
      if (res instanceof Error) {
        toast.error("Couldn't delete your comment!");
        return;
      }

      toast.success("Comment deleted successfully.");

      props.refreshThreadData();
    }
  };

  return (
    <div className="basis-10 flex-shrink-0 flex items-center ml-2 mt-1 pb-6">
      <Transition
        show={props.isVisible}
        as="div"
        className="w-full h-full flex items-center justify-center"
        enter="transition ease duration-300 transform"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease duration-20 transform"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu as="div" className="relative">
          <Menu.Button className="rounded-full p-2 flex items-center hover:bg-[#f0f2f5] focus:outline-none text-gray-900 hover:text-blue-600">
            <span className="sr-only">Open options</span>
            <DotsHorizontalIcon
              className="h-5 w-5 opacity-70 icon-stroke-width-1"
              aria-hidden="true"
            />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
              <div className="py-1">
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
                  onClick={props.toggleHiddenMode}
                >
                  {props.isCommentHidden ? (
                    <>
                      <EyeIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                      <span>Show</span>
                    </>
                  ) : (
                    <>
                      <EyeOffIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                      <span>Hide</span>
                    </>
                  )}
                </Menu.Item>
                <Menu.Item
                  as="div"
                  className="flex text-red-500 hover:bg-gray-100 hover:text-red-700 px-4 py-2 text-xs font-light cursor-pointer"
                  onClick={commentDeleteHandler}
                >
                  <TrashIcon className="w-4 h-4 icon-stroke-width-1 mr-2" />
                  <span>Delete</span>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </Transition>
    </div>
  );
};

export default CommentMenu;
