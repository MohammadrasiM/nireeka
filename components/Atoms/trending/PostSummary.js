import Link from "next/link";
// import { useState } from "react";
import Heading from "../../Forum/post/Heading";

const PostSummary = (props) => {
  const MAX_CHARS_IN_BODY = 100;
  // const [isLiked, setIsLiked] = useState(false);

  // const likeClickHandler = () => {
  //   setIsLiked((prevState) => !prevState);
  // };

  return (
    <div className="space-y-2 py-4 first:pt-0 last:pb-0">
      <Heading
        user={props.user}
        // channel={props.channel}
        // lastUpdateDate={props.lastUpdateDate}
      />
      <div className="flex-grow">
        <Link passHref href={`/forum/threads/${props.channel.slug}/${props.postId}`}>
          <a>
            <p className="font-light text-gray-700 text-sm leading-4">
              {props.postBody.length > MAX_CHARS_IN_BODY
                ? props.postBody.substr(0, MAX_CHARS_IN_BODY) + " ..."
                : props.postBody}
            </p>
          </a>
        </Link>
      </div>
      {/* Post interactions */}
      <div className="flex py-1">
        <div className="flex justify-start items-center mr-3">
          <div className="flex items-start font-light cursor-pointer">
            <Link href={`/forum/threads/${props.channel.slug}/${props.postId}`} passHref>
              <a>
                <p className="text-sm text-gray-500 hover:text-blue-600">Reply</p>
              </a>
            </Link>
          </div>
        </div>
        <div className="flex ml-auto md:ml-0 xl:ml-auto items-center">
          <Link passHref href={`/forum/threads/${props.channel.slug}/${props.postId}`}>
            <a>
              <div className="flex items-center text-sm font-light cursor-pointer text-gray-500 hover:text-blue-600">
                {props.keyInAPI === "popularity" && (
                  <>
                    <i className="mx-2 font-fontello icon-heart-empty" />
                    <span>{props.likeCount}</span>
                  </>
                )}
                {props.keyInAPI === "comment" && (
                  <>
                    <i className="mx-2 font-fontello icon-comment-empty" />
                    <span>{props.commentCount}</span>
                  </>
                )}
                {props.keyInAPI === "view" && (
                  <>
                    <i className="mx-2 font-fontello icon-eye" />
                    <span>{props.viewCount}</span>
                  </>
                )}
              </div>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostSummary;
