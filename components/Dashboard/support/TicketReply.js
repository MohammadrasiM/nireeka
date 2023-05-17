import Avatar from "../../Atoms/people/Avatar";
import Name from "../../Atoms/people/Name";
import SafeLinkifiedHtml from "../../SafeHtml/SafeLinkifiedHtml";
import FileThumbnail from "./FileThumbnail";
import MediaThumbnail from "./MediaThumbnail";

const TicketReply = (props) => {
  return (
    <li className="bg-white px-4 py-6 shadow sm:px-6">
      <div className="flex space-x-3">
        <Avatar user={props.comment.user} />
        <div>
          <div className="sm:flex sm:justify-between sm:items-baseline">
            <h3 className="text-base font-medium">
              <Name user={props.comment.user}>
                {props.comment.user.name + " " + props.comment.user.lastname}
              </Name>
              <span className="text-gray-500 font-medium text-sm">
                {" "}
                commented {props.comment.created_at}{" "}
              </span>
              {(props.comment.user.is_admin === 1 ||
                props.comment.user.is_admin === 9) && (
                <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800">
                  Admin
                </span>
              )}
            </h3>
          </div>
          <div className="mt-4 space-y-6 text-sm text-gray-800">
            <SafeLinkifiedHtml string={props.comment.message} />
          </div>
          {!!props.comment.files.length > 0 && (
            <section className="mt-4" aria-labelledby="gallery-heading">
              <ul role="list" className="flex gap-4">
                {props.comment.files.map((file, index) => {
                  if (file.path.split(".").pop() === "pdf") {
                    return <FileThumbnail key={index} file={file} />;
                  }
                  return <MediaThumbnail key={index} file={file} />;
                })}
              </ul>
            </section>
          )}
        </div>
      </div>
    </li>
  );
};

export default TicketReply;
