import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import ThreadSubscriptionBtn from "./ThreadSubscriptionBtn";
import ThreadUnsubscriptionBtn from "./ThreadUnsubscriptionBtn";

const PostMenuNormal = (props) => {
  // Subscription logic
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed);
  const handleSubscribeClick = () => {
    setIsSubscribed(true);
  };
  const handleUnsubscribeClick = () => {
    setIsSubscribed(false);
  };

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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
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
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostMenuNormal;
