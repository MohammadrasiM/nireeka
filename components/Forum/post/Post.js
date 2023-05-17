import { Fragment, useEffect, useRef, useState } from "react";

import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import Heading from "./Heading";
import Interactions from "./Interactions";
import ConditionalLink from "../../Atoms/links/ConditionalLink";
import Linkify from "linkify-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { EyeOffIcon } from "@heroicons/react/outline";
import classNames from "../../../functions/classNames";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { oEmbedProviders } from "../../../configs/reactTinyOEmbedProviders";
import { separateVideoUrlAndText } from "../../../functions/separateUrlAndText";
import { isValidHttpUrl } from "../../../functions/validators";
import Image from "next/image";

const PostMenuAuth = dynamic(() => import("../menus/PostMenuAuth"), {
  ssr: false,
});
const PostMenuNormal = dynamic(() => import("../menus/PostMenuNormal"), {
  ssr: false,
});
const ImageOverlay = dynamic(
  () => import("../../Atoms/overlays/ImageOverlay"),
  { ssr: false }
);
const Embed = dynamic(() => import("react-tiny-oembed"));
const ImageThumbnail = dynamic(() => import("../UI/ImageThumbnail"));
const Comment = dynamic(() => import("@/components/Forum/comment/Comment"), {
  ssr: false,
});

const Post = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  // Checking if the component is in a thread or in a feed,
  // so we can decide whether to add a link to the post or not
  const router = useRouter();
  const isPostInThread = router.route.includes("/threads/");

  // YouTube and Vimeo URLs are separated from other texts,
  // so we can embed them in post body
  const [separatedVideoUrlAndPostBody, setSeparatedVideoUrlAndPostBody] =
    useState([props.postBody]);
  useEffect(() => {
    // It's an expensive task! Be careful!
    const separated = isPostInThread
      ? separateVideoUrlAndText(props.postBody)
      : null;
    setSeparatedVideoUrlAndPostBody(separated);
  }, [isPostInThread, props.postBody]);

  // A boolean to decide wether to show a continue reading tag in the end of the post or not
  const shouldShowContinueReading =
    !isPostInThread &&
    props.postBody.substr(props.postBody.length - 3, 3) === "...";

  // Pic overlay logic
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);
  const onOpenImageOverlay = (e) => {
    e.preventDefault();
    setIsPicOverlaid(true);
  };
  const handleImageOverlayClose = (e) => {
    e.preventDefault();
    setIsPicOverlaid(false);
  };

  // Pic array to show
  // If image_path existed, I'll append it to postPictures
  const [postPictures, setPostPictures] = useState(null);
  useEffect(() => {
    const pics = [...props.postFiles];
    if (props.imagePath !== "") {
      pics.push({
        path: props.imagePath,
        name: props.imagePath,
      });
    }
    setPostPictures(pics);
  }, [props.postFiles, props.imagePath]);

  // PGT === Post Gallery Thumbnail
  const temp = [];
  // +1 in for loop is because of the props.imagePath
  // This property might be deleted in future, it's from an api call
  for (let i = 0; i < props.postFiles.length + 1; i++) temp.push(false);
  const [isNthPGTOverlaid, setIsNthPGTOverlaid] = useState(temp);
  const handleNthPGTOpenClick = (PGTIndex) => {
    setIsNthPGTOverlaid((prevState) =>
      prevState.map((item, index) => (index === PGTIndex ? true : item))
    );
  };
  const handleNthPGTCloseClick = (PGTIndex) => {
    setIsNthPGTOverlaid((prevState) =>
      prevState.map((item, index) => (index === PGTIndex ? false : item))
    );
  };

  // Show/hide post menu
  const [isPostMenuAuthVisible, setIsPostMenuAuthVisible] = useState(false);
  const [isPostMenuNormalVisible, setIsPostMenuNormalVisible] = useState(false);
  useEffect(() => {
    if (isPostInThread) {
      if (userData) {
        if (userData.id === props.user.id || userData.is_admin) {
          setIsPostMenuAuthVisible(true);
          setIsPostMenuNormalVisible(false);
        } else {
          setIsPostMenuNormalVisible(true);
          setIsPostMenuAuthVisible(false);
        }
      } else {
        setIsPostMenuNormalVisible(false);
        setIsPostMenuAuthVisible(false);
      }
    } else {
      if (userData) {
        setIsPostMenuNormalVisible(true);
        setIsPostMenuAuthVisible(false);
      } else {
        setIsPostMenuNormalVisible(false);
        setIsPostMenuAuthVisible(false);
      }
    }
  }, [isPostInThread, props.user.id, userData]);

  const [contentContainerWidth, setContentContainerWidth] = useState(0);
  const contentContainerRef = useRef();

  useEffect(() => {
    setContentContainerWidth(contentContainerRef.current.offsetWidth);
  }, []);

  return (
    <WhiteShadowCard className={`${props.isThreadHidden ? "bg-gray-200" : ""}`}>
      {!!props.isThreadHidden && (
        <div className="mb-4">
          <p className="flex space-x-3 font-light text-sm text-red-600">
            <EyeOffIcon className="icon-stroke-width-1 w-4 h-4" />
            <span>This post is hidden</span>
          </p>
        </div>
      )}
      {/* Post Metadata */}
      <div className="flex items-center mb-4">
        <Heading
          postTitle={props.postTitle}
          user={props.user}
          channel={props.channel}
          lastUpdateDate={props.lastUpdateDate}
          isPost={true}
        />
        <div className="ml-auto">
          {isPostMenuAuthVisible && (
            <PostMenuAuth
              threadId={props.threadId}
              isThreadHidden={props.isThreadHidden}
              toggleEditMode={props.toggleEditMode}
              togglePostVisibilityStyle={props.togglePostVisibilityStyle}
              isSubscribed={props.isSubscribed}
            />
          )}
          {isPostMenuNormalVisible && (
            <PostMenuNormal
              threadId={props.threadId}
              isSubscribed={props.isSubscribed}
            />
          )}
        </div>
      </div>
      {/* Post content */}
      <div
        ref={contentContainerRef}
        className={classNames(!isPostInThread && "cursor-pointer")}
      >
        <ConditionalLink
          href={`/forum/threads/${props.channel.slug}/${props.threadId}`}
          condition={!isPostInThread}
          passHref
        >
          {/* Post Title */}
          <div className="mb-2">
            <h2
              className={`${
                !isPostInThread ? "cursor-pointer hover:text-blue-600" : ""
              } font-medium text-base text-gray-900 mb-4 transition-all`}
            >
              {props.postTitle}
            </h2>
          </div>
          {/* Post Body */}
          <div className="mb-3">
            {isPostInThread ? (
              separatedVideoUrlAndPostBody.map((item, index) => {
                if (isValidHttpUrl(item)) {
                  return (
                    <div
                      key={`embed-${index}`}
                      className="flex items-center player-rounded-xl"
                    >
                      <Embed
                        url={item}
                        providers={oEmbedProviders}
                        FallbackElement={Fragment}
                      />
                    </div>
                  );
                }
                return (
                  <p
                    key={`p-thread-${index}`}
                    className="text-gray-700 font-light text-sm break-words"
                  >
                    <Linkify
                      options={{
                        className: "text-blue-700 z-10",
                        target: "_blank",
                        defaultProtocol: "https",
                        nl2br: true,
                        attributes: {
                          onClick: (e) => {
                            // Preventing from opening post detail page
                            e.preventDefault();
                            window.open(e.target.href, "_blank");
                          },
                        },
                      }}
                    >
                      {item}
                    </Linkify>
                  </p>
                );
              })
            ) : (
              <p className="text-gray-700 font-light text-sm break-words">
                <Linkify
                  options={{
                    className: "text-blue-700 z-10",
                    target: "_blank",
                    defaultProtocol: "https",
                    nl2br: true,
                    attributes: {
                      onClick: (e) => {
                        // Preventing from opening post detail page
                        e.preventDefault();
                        window.open(e.target.href, "_blank");
                      },
                    },
                  }}
                >
                  {props.postBody.substr(props.postBody.length - 3, 3) === "..."
                    ? props.postBody.substring(0, props.postBody.length - 3)
                    : props.postBody}
                </Linkify>
              </p>
            )}
            {!!shouldShowContinueReading && (
              <span className="text-blue-700 font-light text-sm">
                continue reading...
              </span>
            )}
          </div>
        </ConditionalLink>
        {/* Post Image */}
        {postPictures && postPictures.length > 0 && (
          <div className="flex items-center justify-center">
            <div
              onClick={onOpenImageOverlay}
              className="relative w-full border border-forumGrayBorder rounded-xl cursor-pointer overflow-hidden"
              style={{ height: contentContainerWidth / 1.61 }} // Golden Ratio
            >
              <Image
                layout="fill"
                src={postPictures[0].path}
                alt={props.postTitle}
                title={props.postTitle}
                objectFit="cover"
              />
            </div>
            <ImageOverlay
              onClose={handleImageOverlayClose}
              isVisible={isPicOverlaid}
              src={postPictures[0].path}
              alt={props.postTitle}
            />
          </div>
        )}
        {postPictures && postPictures.length > 1 && (
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={15}
            id="forum-post-gallery-thumbnails"
            className="select-none mt-3"
          >
            {postPictures.map((picture, index) => {
              if (index === 0) return <Fragment key={`PGT-${index}`} />;
              return (
                <SwiperSlide className="rounded-md" key={`PGT-${index}`}>
                  <ImageThumbnail
                    onClick={() => handleNthPGTOpenClick(index)}
                    src={picture.path}
                  />
                  <ImageOverlay
                    isVisible={isNthPGTOverlaid[index]}
                    onClose={() => handleNthPGTCloseClick(index)}
                    src={picture.path}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        {/* Embedded Video */}
        {props.videoUrl && (
          <div className="flex items-center player-rounded-xl">
            <Embed
              url={props.videoUrl}
              providers={oEmbedProviders}
              FallbackElement={Fragment}
            />
          </div>
        )}
      </div>
      {/* Post Like, Comments, Views */}
      <Interactions
        viewCount={props.viewCount}
        commentCount={props.commentCount}
        likeCount={props.likeCount}
        isLiked={props.isLiked}
        postId={props.threadId}
        channelSlug={props.channel.slug}
        opName={props.user.full_name}
      />
      {!!props?.lastComment && (
        <Comment
          postId={props.threadId}
          channelSlug={props.channel.slug}
          commentCount={props.commentCount}
          commentBody={props?.lastComment?.body}
          imgPath={props?.lastComment?.image_path}
          imgAlt="lastComment"
          user={props?.lastComment?.user}
          lastUpdatedDate={props?.lastComment?.created_at}
          commentId={props?.lastComment?.id}
          likeCount={props?.lastComment?.like_count}
          isLiked={props?.lastComment?.is_like}
          isCommentHidden={props?.lastComment?.is_hidden}
          isVisible
          isReply={false}
        />
      )}
    </WhiteShadowCard>
  );
};

export default Post;
