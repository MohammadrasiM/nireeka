import { CalendarIcon, DocumentReportIcon, ViewGridAddIcon } from "@heroicons/react/outline";
import Link from "next/link";
import classNames from "../../../functions/classNames";

const TicketListItem = (props) => {
  // If the last was from an admin, it counts as an unread ticket
  const isRead =
    !(props.ticket.is_admin === 1 || props.ticket.is_admin === 9) ||
    props.ticket.status.toLowerCase() === "closed";

  return (
    <li className="first:border-t">
      <Link href={`/dashboard/support/${props.ticket.id}`} passHref>
        <a
          className={classNames(
            "block transition-all",
            isRead ? "bg-white hover:bg-gray-50" : "bg-green-100 hover:bg-green-50"
          )}
        >
          <div className="px-4 py-4 sm:px-6">
            <div className="flex items-center flex-wrap">
              <p
                className={classNames(
                  "text-sm text-indigo-600 truncate",
                  isRead ? "font-medium" : "font-semibold"
                )}
              >
                {props.ticket.title}
              </p>
              {!isRead && (
                <span className="font-medium text-xs bg-green-50 text-green-800 rounded-full px-2 py-1 ml-3 text-center">
                  New Message
                </span>
              )}
              <div className="ml-auto flex-shrink-0 flex">
                <p
                  className={classNames(
                    "px-3 inline-flex text-xs font-normal leading-5 rounded-full",
                    props.ticket.status.toLowerCase() === "open" && "bg-green-100 text-green-800",
                    props.ticket.status.toLowerCase() === "closed" && "bg-red-100 text-red-800"
                  )}
                >
                  {props.ticket.status}
                </p>
              </div>
            </div>
            <div className="mt-2 sm:flex sm:justify-between">
              <div className="sm:flex">
                <p
                  className={classNames(
                    "flex items-center text-sm",
                    isRead ? "font-light text-gray-500" : "font-medium text-gray-700"
                  )}
                >
                  <ViewGridAddIcon
                    className={classNames("w-5 h-5 mr-1", isRead && "icon-stroke-width-1")}
                  />
                  {props.ticket.category}
                </p>
                <p
                  className={classNames(
                    "mt-2 flex items-center text-sm sm:mt-0 sm:ml-6 capitalize",
                    isRead ? "font-light text-gray-500" : "font-medium text-gray-700"
                  )}
                >
                  <DocumentReportIcon
                    className={classNames("w-5 h-5 mr-1", isRead && "icon-stroke-width-1")}
                  />
                  {props.ticket.priority} Priority
                </p>
              </div>
              <div
                className={classNames(
                  "mt-2 flex items-center text-sm sm:mt-0",
                  isRead ? "font-light text-gray-500" : "font-medium text-gray-700"
                )}
              >
                <CalendarIcon
                  className={classNames("w-5 h-5 mr-1", isRead && "icon-stroke-width-1")}
                />
                <p>
                  Updated <span>{props.ticket.updated_at}</span>
                </p>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default TicketListItem;
