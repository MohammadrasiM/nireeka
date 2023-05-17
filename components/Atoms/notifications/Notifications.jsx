import { BellIcon } from "@heroicons/react/outline";
import classNames from "../../../functions/classNames";

const Notifications = (props) => {
  return (
    <div className="relavtive">
      <button
        type="button"
        className={classNames(
          "flex items-center text-sm  transition ease-in-out duration-150",
          props.iconClassName
            ? props.iconClassName
            : "text-gray-500 hover:text-sky-500"
        )}
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="w-6 h-8 icon-stroke-width-1" />
      </button>
    </div>
  );
};

export default Notifications;
