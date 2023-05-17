import Avatar from "../../Atoms/people/Avatar";
import Link from "next/link";
import Name from "../../Atoms/people/Name";

const Heading = (props) => {
  return (
    <div className="flex items-center relative z-60">
      <Avatar user={props.user} />
      <div className="px-3">
        <h4 className="text-sm text-gray-500 font-light space-x-2">
          <span>By</span>
          <Name user={props.user}>{props.user.full_name}</Name>
          {props.lastUpdateDate !== undefined && (
            <>
              <span className="text-gray-900">·</span>
              <span>{props.lastUpdateDate}</span>
            </>
          )}
          {props.channel !== undefined && (
            <>
              <span className="text-gray-900">·</span>
              <span className="inline-flex items-center justify-center">
                <Link href={`/forum/channels/${props.channel.slug}/1`} passHref>
                  <a className="text-gray-900 hover:underline hover:text-blue-600">
                    {props.channel.name}
                  </a>
                </Link>
              </span>
            </>
          )}
        </h4>
      </div>
    </div>
  );
};

export default Heading;
