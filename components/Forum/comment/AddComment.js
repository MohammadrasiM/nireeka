import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { postAReply } from "../../../app/api/forum/comments";
import { PhotographIcon } from "@heroicons/react/outline";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import EmojiPickerButton from "../../Atoms/buttons/EmojiPicker";
import { inputSanitizer } from "../../../functions/sanitizers";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const ImageUploadThumbnail = dynamic(() => import("../UI/ImageUploadThumbnail"));
const Avatar = dynamic(() => import("../../Atoms/people/Avatar"));
const ImageOverlay = dynamic(() => import("../../Atoms/overlays/ImageOverlay"));

const AddComment = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const router = useRouter();

  // Ref to file input for pictures
  const pictureUpload = useRef();
  // Auto-resizing post body input logic
  const commentBodyInputRef = useRef();

  // Selected picture FILE object to upload
  const [selectedPic, setSelectedPic] = useState(null);
  // State to show file size error
  const [fileSizeErrorVisible, setFileSizeErrorVisible] = useState(false);
  // State to handle selected pic overlay visibility
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);
  // A state to set input's height automatically while typing
  const [postBodyTextAreaHeight, setPostBodyTextAreaHeight] = useState("auto");
  // A state to show emoji picker dropdown
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // State to show loader when posting the comment
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onPostInputChange = (e) => {
    setPostBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setPostBodyTextAreaHeight(commentBodyInputRef.current.scrollHeight);
  }, [postBodyTextAreaHeight]);

  const fileChangeHandler = (e) => {
    // File size must be less that 5000000 bytes (5 MB)
    if (e.target.files[0]) {
      if (e.target.files[0].size < 5000000) {
        setSelectedPic(e.target.files[0]);
        setFileSizeErrorVisible(false);
      } else {
        setFileSizeErrorVisible(true);
      }
    }
  };
  const removeSelectedPicHandler = useCallback(() => {
    setSelectedPic(null);
  }, []);

  const handleImageOverlayOpen = useCallback((e) => {
    e.preventDefault();
    setIsPicOverlaid(true);
  }, []);
  const handleImageOverlayClose = useCallback(() => {
    setIsPicOverlaid(false);
  }, []);

  const handleEmojiButtonClick = () => {
    setIsEmojiPickerOpen((prevState) => !prevState);
    commentBodyInputRef.current.focus();
  };
  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerOpen(false);
  };

  const handleEmojiClick = useCallback((e, emoji) => {
    commentBodyInputRef.current.value += emoji.emoji;
  }, []);

  // Replying logic
  const submitClickHandler = async () => {
    setIsSubmitLoading(true);

    const sanitizedCommentBody = inputSanitizer(commentBodyInputRef.current.value);
    if (sanitizedCommentBody === "") {
      toast.error("Comment cannot be empty.");

      setIsSubmitLoading(false);
      commentBodyInputRef.current.value = "";
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const commentForm = new FormData();
    commentForm.append("body", sanitizedCommentBody);
    if (props.replyTo) {
      commentForm.append("parent_id", props.replyTo);
    }
    if (selectedPic) {
      commentForm.append(`image`, selectedPic);
    }

    try {
      const res = await postAReply(router.query.thread_id, commentForm);
      toast.success("Your comment has been posted successfully");
      if (typeof props.onSubmitUpdateUI === "function") props.onSubmitUpdateUI();

      setPostBodyTextAreaHeight("auto");
    } catch (error) {
      console.log("Error commenting:", error);
    } finally {
      setIsSubmitLoading(false);
    }
  };

  return (
    <div className="flex items-start mx-auto py-4">
      {userData && <Avatar user={{ is_online: true, avatar: userData.avatar }} />}
      <div className="min-w-0 flex-1 pl-3">
        <div className="border-b focus-within:border-b-indigo-600 transition mb-4">
          <label htmlFor="comment" className="sr-only">
            Add your comment
          </label>
          <textarea
            ref={commentBodyInputRef}
            style={{ minHeight: postBodyTextAreaHeight }}
            onInput={onPostInputChange}
            rows={1}
            name="comment"
            id="comment"
            className="block w-full border-0 border-transparent bg-transparent p-0 pb-2 resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
            placeholder="Add your comment..."
            defaultValue={""}
          />
        </div>
        {fileSizeErrorVisible && (
          <p className="font-light text-sm text-red-600">* File is too large (maximum: 5MB)</p>
        )}
        {selectedPic && (
          <div className="flex flex-wrap">
            <ImageUploadThumbnail
              src={URL.createObjectURL(selectedPic)}
              alt={selectedPic.name}
              xButtonClassName="absolute top-2 left-2 w-5 h-5 p-1"
              thumbnailClassName="w-32"
              onClick={handleImageOverlayOpen}
              onCloseClick={removeSelectedPicHandler}
            />
            <ImageOverlay
              onClose={handleImageOverlayClose}
              isVisible={isPicOverlaid}
              src={URL.createObjectURL(selectedPic)}
              alt={selectedPic.name}
            />
          </div>
        )}
        <div className="flex justify-between">
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
            >
              <label
                htmlFor={`AddComment-${router.query.thread_id}-${props.replyTo}`}
                className="cursor-pointer"
              >
                <input
                  ref={pictureUpload}
                  onChange={fileChangeHandler}
                  id={`AddComment-${router.query.thread_id}-${props.replyTo}`}
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
                <PhotographIcon className="w-5 h-5 icon-stroke-width-1" />
              </label>
            </button>
            <EmojiPickerButton
              onEmojiClick={handleEmojiClick}
              inputRef={commentBodyInputRef}
              onClick={handleEmojiButtonClick}
              isPickerVisible={isEmojiPickerOpen}
              onClickOutside={handleCloseEmojiPicker}
            />
          </div>
          <div className="flex-shrink-0">
            <button
              type="submit"
              className={`inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-light rounded-md shadow-sm ${
                isSubmitLoading
                  ? "text-gray-300 bg-gray-500 cursor-not-allowed"
                  : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
              }`}
              onClick={submitClickHandler}
              disabled={isSubmitLoading ? true : false}
            >
              {isSubmitLoading && <ButtonLoadingIcon />}
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComment;
