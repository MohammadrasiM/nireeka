import { PlusSmIcon } from "@heroicons/react/outline";
import Avatar from "../../Atoms/people/Avatar";

const FollowListItem = (props) => {
  return (
    <li className="flex items-center py-4 space-x-3">
      <div className="flex-shrink-0">
        <Avatar user={{ is_online: true, avatar: props.user.avatar }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-900">
          <a href={props.user.href}>{props.user.full_name}</a>
        </p>
        <p className="text-sm font-light text-gray-500">
          <a href={props.user.href}>{"@" + props.user.username}</a>
        </p>
      </div>
      <div className="flex-shrink-0">
        <button
          type="button"
          className="inline-flex items-center px-3 py-0.5 rounded-full bg-blue-100 text-sm font-medium text-blue-700 hover:bg-blue-200 transition-colors"
        >
          <PlusSmIcon
            className="-ml-1 mr-0.5 h-5 w-5 text-blue-400 icon-stroke-width-1"
            aria-hidden="true"
          />
          <span className="font-light">Follow</span>
        </button>
      </div>
    </li>
  );
};

export default FollowListItem;
