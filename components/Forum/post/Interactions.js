import { likePostById, unlikePostById } from "../../../app/api/forum/threads";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShareIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { pushModal } from "../../../app/store/modalSlice";
import { LOGIN_TO_LIKE_POST, LOGIN_TO_REPLY_POST } from "../../../app/constants/modals";
import BlurBackdrop from "../../Atoms/overlays/BlurBackdrop";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ShareModal = dynamic(() => import("./ShareModal"));

const Interactions = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  // Like animation
  const likeCounterClass_GoUp = "-translate-y-4 opacity-0";
  const likeCounterClass_GoDown = "translate-y-4 opacity-0";
  const likeCounterClass_waitDown = "translate-y-4 opacity-0";
  const likeCounterClass_waitUp = "-translate-y-4 opacity-0";
  const likeCounterClass_initial = "";

  // Like ui states
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(props.likeCount);
  const [likeAnimation, setLikeAnimation] = useState(likeCounterClass_initial);
  useEffect(() => {
    setIsLiked(props.isLiked);
  }, [props.isLiked]);
  const likeIconClickHandler = async () => {
    if (!isUserLoggedIn) {
      dispatch(pushModal({ modal: LOGIN_TO_LIKE_POST }));
      return;
    }

    if (isLiked) {
      setTimeout(() => setLikeAnimation(likeCounterClass_GoDown), 0);
      setTimeout(() => setLikeCount((prevLikeCount) => prevLikeCount - 1), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_waitUp), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_initial), 200);
      setIsLiked(false);

      const res = await unlikePostById(props.postId);

      if (res instanceof Error) {
        console.log('error')
        setIsLiked(true);
        setLikeCount((prevLikeCount) => prevLikeCount + 1);
      }
    } else {
      setTimeout(() => setLikeAnimation(likeCounterClass_GoUp), 0);
      setTimeout(() => setLikeCount((prevLikeCount) => prevLikeCount + 1), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_waitDown), 100);
      setTimeout(() => setLikeAnimation(likeCounterClass_initial), 200);
      setIsLiked(true);

      const res = await likePostById(props.postId);

      if (res instanceof Error) {
        console.log('error')
        setIsLiked(false);
        setLikeCount((prevLikeCount) => prevLikeCount - 1);
      }
    }
  };

  // Replying logic
  const commentIconClickHandler = async () => {
    if (!isUserLoggedIn) dispatch(pushModal({ modal: LOGIN_TO_REPLY_POST }));
    else {
      router.push(`/forum/threads/${props.channelSlug}/${props.postId}`);
    }
  };

  // Share modal
  const [isShareModalVisible, setIsShareModalVisible] = useState(false);
  const handleShareIconClick = () => {
    setIsShareModalVisible(true);
  };
  const handleShareModalClose = () => {
    setIsShareModalVisible(false);
  };

  return (
    <div className="mt-6 mb-4 flex justify-between space-x-8">
      <div className="flex">
        <span className="flex items-center w-16 text-sm">
          <button
            onClick={likeIconClickHandler}
            type="button"
            className={`inline-flex space-x-2 ${
              isLiked ? "text-red-600 hover:text-red-700" : "text-gray-400  hover:text-blue-600"
            }`}
          >
            <i className={`font-fontello ${isLiked ? "icon-heart" : "icon-heart-empty"}`} />
            <span className={`font-light ${likeAnimation} transition-all`}>{likeCount}</span>
            <span className="sr-only">likes</span>
          </button>
        </span>
        <span className="flex items-center w-16 text-sm">
          <button
            onClick={commentIconClickHandler}
            type="button"
            className="inline-flex space-x-2 text-gray-400 hover:text-blue-600"
          >
            <i className="font-fontello icon-comment-empty" />
            <span className="font-light">{props.commentCount}</span>
            <span className="sr-only">replies</span>
          </button>
        </span>
        <span className="flex items-center w-16 text-sm">
          <button type="button" className="inline-flex space-x-2 text-gray-400 hover:text-blue-600">
            <i className="font-fontello icon-eye" />
            <span className="font-light">{props.viewCount}</span>
            <span className="sr-only">views</span>
          </button>
        </span>
      </div>
      <div className="flex text-sm">
        <span className="inline-flex items-center text-sm">
          <button
            type="button"
            className="inline-flex space-x-2 text-gray-400 hover:text-blue-600"
            onClick={handleShareIconClick}
          >
            <ShareIcon className="icon-stroke-width-1 h-5 w-5" aria-hidden="true" />
            <span className="font-light">Share</span>
          </button>
        </span>
        <BlurBackdrop
          isVisible={isShareModalVisible}
          onClose={handleShareModalClose}
          backdropMode="dark"
          noXButton
        >
          <ShareModal
            body="Hey check this post out!"
            url={`https://nireeka.com/forum/threads/${props.channelSlug}/${props.postId}`}
          />
        </BlurBackdrop>
      </div>
    </div>
  );
};

export default Interactions;
