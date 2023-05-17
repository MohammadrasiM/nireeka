import {
  useEffect,
  useState,
  useRef,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "@headlessui/react";
import BikeBadge from "../../Atoms/people/BikeBadge";
import Avatar from "../../Atoms/people/Avatar";
import CountryBadge from "../../Atoms/people/CountryBadge";
import ImageOverlay from "../../Atoms/overlays/ImageOverlay";
import { pushModal } from "../../../app/store/modalSlice";
import {
  LOGIN_TO_LIKE_COMMENT,
  LOGIN_TO_REPLY_COMMENT,
} from "../../../app/constants/modals";
import {
  likeCommentById,
  toggleCommentHiddenMode,
  unlikeCommentById,
} from "../../../app/api/forum/comments";
import CommentContext from "../../../app/store/CommentContext";
import { EyeOffIcon } from "@heroicons/react/outline";
import classNames from "../../../functions/classNames";
import Name from "../../Atoms/people/Name";
import { toast } from "react-toastify";
import SafeLinkifiedHtml from "../../SafeHtml/SafeLinkifiedHtml";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import WhiteButton from "@/components/Atoms/buttons/WhiteButton";

const AddComment = dynamic(() => import("./AddComment"), { ssr: false });
const EditComment = dynamic(() => import("./EditComment", { ssr: false }));
const CommentMenu = dynamic(() => import("../menus/CommentMenu"), {
  ssr: false,
});

const Comment = (props) => {
  const dispatch = useDispatch();

  // Destructuring because of dependency array
  const refreshThreadData = useMemo(() => props.refreshThreadData, [props]);

  const commentContainer = useRef();

  const commentCtx = useContext(CommentContext);

  const comment_has_image = props.imgPath !== undefined && props.imgPath !== "";

  // Like animation
  const likeCounterClass_GoUp = "-translate-y-4 opacity-0";
  const likeCounterClass_GoDown = "translate-y-4 opacity-0";
  const likeCounterClass_waitDown = "translate-y-4 opacity-0";
  const likeCounterClass_waitUp = "-translate-y-4 opacity-0";
  const likeCounterClass_initial = "";

  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const userData = useSelector((state) => state.auth.userData);

  // Liking Logic
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [likeAnimation, setLikeAnimation] = useState(likeCounterClass_initial);

  const [isReplyToCommentVisible, setIsReplyToCommentVisible] = useState(false);
  const [areRepliesVisible, setAreRepliesVisible] = useState(false);
  const [isCommentDotMenuVisible, setIsCommentDotMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [contentContainerWidth, setContentContainerWidth] = useState(0);

  // Pic overlay logic
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);

  const handleImageOverlayOpen = useCallback(() => {
    setIsPicOverlaid(true);
  }, []);
  const handleImageOverlayClose = useCallback(() => {
    setIsPicOverlaid(false);
  }, []);

  const likeClickHandler = useCallback(async () => {
    if (!isUserLoggedIn) {
      dispatch(pushModal({ modal: LOGIN_TO_LIKE_COMMENT }));
      return;
    }

    if (isLiked) {
      setTimeout(() => setLikeAnimation(likeCounterClass_GoDown), 0);
      setTimeout(() => setLikeCount((prevLikeCount) => prevLikeCount - 1), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_waitUp), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_initial), 200);
      setIsLiked(false);

      try {
        await unlikeCommentById(props.commentId);
      } catch (error) {
        setIsLiked(true);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
    } else {
      setTimeout(() => setLikeAnimation(likeCounterClass_GoUp), 0);
      setTimeout(() => setLikeCount((prevLikeCount) => prevLikeCount + 1), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_waitDown), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_initial), 200);
      setIsLiked(true);

      try {
        await likeCommentById(props.commentId);
      } catch (error) {
        setIsLiked(false);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }
    }
  }, [dispatch, isLiked, isUserLoggedIn, props.commentId]);

  // Show/hide reply input logic
  const openReplyClickHandler = () => {
    if (isUserLoggedIn) {
      setIsReplyToCommentVisible((prevState) => !prevState);
    } else {
      dispatch(pushModal({ modal: LOGIN_TO_REPLY_COMMENT }));
    }
  };

  // Show/hide comment dot menu
  const commentMouseEnterHandler = useCallback(() => {
    if (userData && (userData?.id === props?.user?.id || userData.is_admin))
      setIsCommentDotMenuVisible(true);
  }, [userData, props?.user?.id]);

  const commentMouseLeaveHandler = () => {
    setIsCommentDotMenuVisible(false);
  };

  // Show/hide replies logic
  const toggleRepliesClickHandler = () => {
    setAreRepliesVisible((prevState) => !prevState);
  };

  // Reply to comment submit handler
  const replyToCommentSubmitHandler = useCallback(() => {
    if (typeof refreshThreadData === "function") refreshThreadData();
    setIsReplyToCommentVisible(false);
    setAreRepliesVisible(true);
  }, [refreshThreadData]);

  // Comment edit logic
  const toggleEditMode = useCallback(() => {
    setIsEditing((prevState) => !prevState);
  }, []);
  const onCommentEditSubmit = useCallback(() => {
    if (typeof refreshThreadData === "function") refreshThreadData();
    setIsEditing(false);
  }, [refreshThreadData]);

  const toggleHiddenMode = useCallback(async () => {
    try {
      const res = await toggleCommentHiddenMode(props.commentId);

      if (props.isCommentHidden) toast.success("Comment is now visible");
      else toast.success("Comment is now hidden");
    } catch (error) {
      console.log(error);
    }
    if (typeof refreshThreadData === "function") refreshThreadData();
  }, [props.commentId, props.isCommentHidden, refreshThreadData]);

  // Image max height logic
  useEffect(() => {
    commentCtx.bubbleContentWidth = Math.max(
      commentContainer.current.offsetWidth,
      commentCtx.bubbleContentWidth
    );
    setContentContainerWidth(commentCtx.bubbleContentWidth);
  }, [commentCtx]);

  return (
    <li
      ref={commentContainer}
      className={classNames(
        "list-none",
        !props.isReply && !props.isVisible && "sr-only"
      )}
      id={props.commentId}
    >
      {/* Container */}
      <div
        className="flex pt-1"
        onMouseEnter={commentMouseEnterHandler}
        onMouseLeave={commentMouseLeaveHandler}
      >
        {/* Avatar */}
        <div className="basis-10 mr-2 mt-1">
          <Avatar user={props.user} />
        </div>
        {/* Content */}
        <div
          className={`${
            comment_has_image || isEditing || props.isFullWidth
              ? "w-commentFull"
              : "max-w-commentFull"
          } py-1`}
        >
          {/* Bubble */}
          <div
            className={classNames(
              "rounded-2xl p-3 space-y-1",
              props.bubbleColorClass
                ? props.bubbleColorClass
                : props.isCommentHidden
                ? "bg-red-50 border border-red-200"
                : "bg-[#f0f2f5]"
            )}
          >
            {props.isCommentHidden && (
              <div className="mb-2">
                <p className="flex items-center space-x-2 font-light text-sm text-red-600">
                  <EyeOffIcon className="icon-stroke-width-1 w-4 h-4" />
                  <span>This comment is hidden</span>
                </p>
              </div>
            )}
            {/* User's name */}
            <Name user={props.user} className="text-[13px] font-medium">
              {props.user.full_name}
            </Name>
            {(props.user.is_admin === 1 || props.user.is_admin === 9) && (
              <span className="flex items-center text-xs font-light space-x-2">
                <span>Nireeka Official Team</span>
                <span className="w-5 h-5">
                  <Image
                    width={20}
                    height={20}
                    src="/images/logos/nireeka_official_badge.svg"
                    alt="Nireeka"
                  />
                </span>
              </span>
            )}
            <div className="flex">
              {/* Bike badges */}
              <div className="flex">
                {props.user.bikes.map((item, index) => (
                  <BikeBadge
                    key={`bikeBadge-${index}`}
                    bikeName={item.name}
                    bikeColor={item.color}
                  />
                ))}
              </div>
              {/* Country flag */}
              {!!(props.user.show_country && props.user.country.image_path) && (
                <div className="flex items-center ml-auto">
                  <CountryBadge src={props.user.country.image_path} />
                </div>
              )}
            </div>
            {/* Comment body */}
            {isEditing ? (
              <EditComment
                commentId={props.commentId}
                defaultValue={props.commentBody}
                imgPath={props.imgPath}
                imgAlt={props.imgAlt}
                contentContainerWidth={contentContainerWidth}
                onSubmitUpdateUI={onCommentEditSubmit}
                toggleEditMode={toggleEditMode}
              />
            ) : (
              <SafeLinkifiedHtml
                className="comment-body-p text-gray-700 font-normal text-sm break-words"
                string={props.commentBody}
              />
            )}
            {/* Comment image */}
            {comment_has_image && !isEditing && (
              <div className="flex items-center justify-center py-4">
                <img
                  src={props.imgPath}
                  alt={props.imgAlt}
                  className="w-full border border-forumGrayBorder object-cover rounded-xl cursor-pointer"
                  style={{ maxHeight: contentContainerWidth / 1.61 }} // Golden ratio
                  onClick={handleImageOverlayOpen}
                  loading="lazy"
                />
                <ImageOverlay
                  isVisible={isPicOverlaid}
                  src={props.imgPath}
                  alt={props.imgAlt}
                  onClose={handleImageOverlayClose}
                />
              </div>
            )}
          </div>
          {/* Interactions */}
          <div className="relative flex pl-3">
            <div className="space-x-3">
              {!props.actionsAreHidden && (
                <span
                  onClick={likeClickHandler}
                  className={`text-[12px] font-medium ${
                    isLiked ? "text-blue-600" : "text-[#65676b]"
                  } hover:underline cursor-pointer`}
                >
                  Like
                </span>
              )}
              {!props.actionsAreHidden && (
                <span
                  onClick={openReplyClickHandler}
                  className="text-[12px] font-medium text-[#65676b] hover:underline cursor-pointer"
                >
                  Reply
                </span>
              )}
              <span className="text-[12px] font-normal text-[#65676b]">
                {props.lastUpdatedDate}
              </span>
            </div>
            <Transition
              show={likeCount !== 0}
              as="div"
              className="absolute -top-[10px] right-0 space-x-1.5 px-2 bg-white text-[#65676b] text-sm shadow-md rounded-3xl"
              enter="transition ease duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <i
                className={`font-fontello text-red-600 ${
                  isLiked ? "icon-heart" : "icon-heart-empty"
                }`}
              />
              <span className={`${likeAnimation} transition-all`}>
                {likeCount}
              </span>
            </Transition>
          </div>
        </div>
        {/* Dot menu */}
        {!props.actionsAreHidden && (
          <CommentMenu
            isVisible={isCommentDotMenuVisible}
            isCommentHidden={props.isCommentHidden}
            toggleEditMode={toggleEditMode}
            toggleHiddenMode={toggleHiddenMode}
            refreshThreadData={refreshThreadData}
            commentId={props.commentId}
          />
        )}
      </div>
      {props.commentCount > 1 && (
        <div className="flex justify-center mx-auto w-900">
          <Link
            href={`/forum/threads/${props.channelSlug}/${props.postId}`}
            passHref
          >
            <a className="w-full">
              <WhiteButton
                // onClick={() =>
                //   setShowComments((prevState) =>
                //     prevState === props?.threadId ? !prevState : props?.threadId
                //   )
                // }
                className="bg-gray-300 mb-2 text-gray-800 w-full font-light text-center  mx-1 rounded-md py-1 shadow-sm"
              >
                {`View all replies (${props.commentCount})`}
              </WhiteButton>
            </a>
          </Link>
        </div>
      )}
      {/* Write a reply */}
      <Transition
        show={isReplyToCommentVisible}
        as="div"
        enter="transition ease duration-300 transform"
        enterFrom="opacity-0 -translate-y-200"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-200"
      >
        <div className="mx-auto w-commentFull">
          <AddComment
            replyTo={props.commentId}
            onSubmitUpdateUI={replyToCommentSubmitHandler}
          />
        </div>
      </Transition>
      {/* Replies */}
      <div>
        <ul className="pl-11">
          {props.children && (
            <div
              onClick={toggleRepliesClickHandler}
              className="inline-block pl-4"
            >
              <p className="flex text-sm space-x-2 text-gray-500 cursor-pointer">
                <i className="font-fontello icon-reply block rotate-[180deg]"></i>
                <span>
                  {areRepliesVisible
                    ? "Hide replies"
                    : `Show replies (${props?.children?.length})`}
                </span>
              </p>
            </div>
          )}
          <Transition
            show={areRepliesVisible}
            as="div"
            enter="transition ease duration-300 transform"
            enterFrom="opacity-0 -translate-y-200"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease duration-200 transform"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-200"
            className="relative z-10"
          >
            {props.children}
          </Transition>
        </ul>
      </div>
    </li>
  );
};
export default Comment;
