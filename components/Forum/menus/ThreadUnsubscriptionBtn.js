import { MinusSmIcon } from "@heroicons/react/outline";
import { unsubscribeFromThread } from "../../../app/api/forum/threads";
import { useState } from "react";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import { toast } from "react-toastify";

const ThreadUnsubscriptionBtn = (props) => {
  const [isLoading, setIsLoading] = useState();

  const handleThreadUnsubscription = async () => {
    setIsLoading(true);
    const res = await unsubscribeFromThread(props.threadId);

    if (res instanceof Error) {
      console.log("Couldn't unsubscribe from thread:", res);
      setIsLoading(false);
      return;
    }

    toast.success(
      "You have successfully unsubscribed from this thread."
    );

    setIsLoading(false);
    if (props.handleStateUpdate) props.handleStateUpdate();
  };

  return (
    <div
      className="flex text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 text-xs font-light cursor-pointer space-x-2"
      onClick={handleThreadUnsubscription}
    >
      {isLoading ? (
        <ButtonLoadingIcon className="border-gray-700 hover:border-gray-900" />
      ) : (
        <MinusSmIcon className="w-4 h-4 icon-stroke-width-1" />
      )}
      <span>Unsubscribe</span>
    </div>
  );
};

export default ThreadUnsubscriptionBtn;
