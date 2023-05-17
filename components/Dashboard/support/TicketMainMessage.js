import classNames from "../../../functions/classNames";
import { createFileFromPath } from "../../../functions/createFileFromPath";
import SafeLinkifiedHtml from "../../SafeHtml/SafeLinkifiedHtml";
import FileThumbnail from "./FileThumbnail";
import MediaThumbnail from "./MediaThumbnail";

const TicketMainMessage = (props) => {
  return (
    <div className="bg-white pt-5 pb-2 shadow">
      <div className="px-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8">
        <div className="sm:w-0 sm:flex-1">
          <h1
            id="message-heading"
            className="text-lg font-medium text-gray-900"
          >
            {props.ticket.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500 truncate">
            Created {props.ticket.created_diff}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between sm:mt-0 sm:ml-6 sm:flex-shrink-0 sm:justify-start">
          <span
            className={classNames(
              "inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium mr-3",
              props.ticket.status.toLowerCase() === "open" &&
                "bg-green-100 text-green-800",
              props.ticket.status.toLowerCase() === "closed" &&
                "bg-red-100 text-red-800"
            )}
          >
            {props.ticket.status}
          </span>
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800 mr-2">
            {props.ticket.category_name}
          </span>
        </div>
      </div>
      <div className="px-4 py-4 sm:flex sm:justify-between sm:items-baseline sm:px-6 lg:px-8 text-sm">
        <SafeLinkifiedHtml string={props.ticket.message} />
      </div>
      {props.ticket.files.length > 0 && (
        <ul className="flex px-4 sm:px-6 lg:px-8">
          {props.ticket.files.map((file, index) => {
            if (file.path.split(".").pop() === "pdf") {
              return <FileThumbnail key={"file" + index} file={file} className="mr-5 mt-4" />;
            }
            return <MediaThumbnail key={"file" + index} file={file} className="mr-5 mt-4" />;
          })}
        </ul>
      )}
    </div>
  );
};

export default TicketMainMessage;
