import { PlusSmIcon } from "@heroicons/react/outline";
import { subscribeToThread } from "../../../app/api/forum/threads";
import { useState } from "react";
import { toast } from "react-toastify";
import LoadingNireeka from "../../Atoms/LoadingNireeka";

const ThreadSubscriptionBtn = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleThreadSubscription = async () => {
    setIsLoading(true);
    const res = await subscribeToThread(props.threadId);

    if (res instanceof Error) {
      console.log("Couldn't subscribe to thread:", res);
      setIsLoading(false);
      return;
    }

    toast.success("You have successfully subscribed to this thread.");

    setIsLoading(false);
    if (props.handleStateUpdate) props.handleStateUpdate();
  };

  return (
    <div
      className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer space-x-2"
      onClick={handleThreadSubscription}
    >
      {isLoading ? (
        <LoadingNireeka className="w-4 h-4 border-gray-900" />
      ) : (
        <PlusSmIcon className="w-4 h-4 icon-stroke-width-1" />
      )}

      <span>Subscribe</span>
    </div>
  );
};

export default ThreadSubscriptionBtn;
