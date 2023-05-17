import { useState, useRef, useEffect, useCallback } from "react";
import { PhotographIcon, EmojiHappyIcon } from "@heroicons/react/outline";
import { deletePictureFromComment, updateCommentById } from "../../../app/api/forum/comments";
import { inputSanitizer } from "../../../functions/sanitizers";
import { useRouter } from "next/router";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import ImageOverlay from "../../Atoms/overlays/ImageOverlay";
import ImageUploadThumbnail from "../UI/ImageUploadThumbnail";
import EmojiPickerButton from "../../Atoms/buttons/EmojiPicker";
import { toast } from "react-toastify";

const EditComment = (props) => {
  const router = useRouter();

  // Ref to file input for pictures
  const pictureUpload = useRef();
  // Auto-resize edit textarea
  const commentEditInputRef = useRef();

  // A state to set input's height automatically while typing
  const [postBodyTextAreaHeight, setPostBodyTextAreaHeight] = useState("auto");
  // Selected picture FILE object to upload
  const [selectedPic, setSelectedPic] = useState(null);
  // State to handle selected pic oerlay visibility
  const [isPicOverlaid, setIsPicOverlaid] = useState(false);
  // State to check of the existing image is actually fetched from server and is not a new picture to upload
  const [imageWasUploadedBefore, setImageWasUploadedBefore] = useState(
    props.imgPath !== undefined && props.imgPath !== ""
  );
  // State to show file size error
  const [fileSizeErrorVisible, setFileSizeErrorVisible] = useState(false);
  // A state to show emoji picker dropdown
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // State to show loader when posting the comment
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const onPostInputChange = (e) => {
    setPostBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setPostBodyTextAreaHeight(commentEditInputRef.current.scrollHeight);
    // Waiting for component mount so ref is available
    const timeoutId = setTimeout(() => {
      commentEditInputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [postBodyTextAreaHeight]);

  const fileChangeHandler = (e) => {
    // File size must be less that 5000000 bytes (5 MB)
    if (e.target.files[0]) {
      if (e.target.files[0].size < 5000000) {
        setSelectedPic(e.target.files[0]);
        setFileSizeErrorVisible(false);
        setImageWasUploadedBefore(false);
      } else {
        setFileSizeErrorVisible(true);
      }
    }
  };

  const handleSelectedPicRemoval = useCallback(async () => {
    if (imageWasUploadedBefore) {
      try {
        await deletePictureFromComment(props.commentId);
      } catch (error) {
        console.log(error)
      } finally {
        setImageWasUploadedBefore(false);
      }
    } else {
      setSelectedPic(null);
    }
  }, [props.commentId, imageWasUploadedBefore]);

  const onOpenImageOverlay = useCallback((e) => {
    e.preventDefault();
    setIsPicOverlaid(true);
  }, []);

  const onCloseImageOverlay = useCallback(() => {
    setIsPicOverlaid(false);
  }, []);

  const handleEmojiButtonClick = () => {
    setIsEmojiPickerOpen((prevState) => !prevState);
    commentEditInputRef.current.focus();
  };
  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerOpen(false);
  };

  const handleEmojiClick = useCallback((e, emoji) => {
    commentEditInputRef.current.value += emoji.emoji;
  }, []);

  // Submit logic
  const submitClickHandler = async () => {
    setIsSubmitLoading(true);

    const sanitizedCommentBody = inputSanitizer(commentEditInputRef.current.value);
    if (sanitizedCommentBody === "") {
      toast.error("Comment cannot be empty.");

      setIsSubmitLoading(false);
      commentEditInputRef.current.value = "";
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const editCommentForm = new URLSearchParams();
    editCommentForm.append("body", sanitizedCommentBody);
    if (selectedPic) {
      editCommentForm.append("image", selectedPic);
    }

    try {
      await updateCommentById(props.commentId, editCommentForm);
      toast.success("Your comment has been updated successfully");
      if (typeof props.onSubmitUpdateUI === "function") props.onSubmitUpdateUI();
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false);
    }
  };
  return (
    <div className="min-w-0 flex-1">
      <div className="transition">
        <label htmlFor="comment" className="sr-only">
          Edit your comment
        </label>
        <textarea
          ref={commentEditInputRef}
          style={{ minHeight: postBodyTextAreaHeight }}
          onInput={onPostInputChange}
          rows={1}
          name="edit_comment"
          id="edit_comment"
          className="text-[15px] text-gray-700 font-normal w-full block border-0 border-b bg-transparent p-0 resize-none  focus:ring-0 focus:border-b-indigo-600"
          placeholder="Edit your comment..."
          defaultValue={props.defaultValue}
        />
      </div>
      {/* Comment image */}
      {(imageWasUploadedBefore || selectedPic) && (
        <div className="flex items-center py-4">
          <ImageUploadThumbnail
            src={imageWasUploadedBefore ? props.imgPath : URL.createObjectURL(selectedPic)}
            alt={props.imgAlt}
            xButtonClassName="absolute top-2 left-2 w-5 h-5 p-1"
            thumbnailClassName="w-full"
            onClick={onOpenImageOverlay}
            onCloseClick={handleSelectedPicRemoval}
          />
          <ImageOverlay
            isVisible={isPicOverlaid}
            src={props.imgPath}
            alt={props.imgAlt}
            onClose={onCloseImageOverlay}
          />
        </div>
      )}
      <div className="pt-2 flex justify-between">
        <div className="flex items-center space-x-5">
          <button
            type="button"
            className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
          >
            <label
              htmlFor={`EditComment-${router.query.thread_id}-${props.replyTo}`}
              className="cursor-pointer"
            >
              <input
                ref={pictureUpload}
                onChange={fileChangeHandler}
                id={`EditComment-${router.query.thread_id}-${props.replyTo}`}
                type="file"
                className="hidden"
                accept="image/*"
              />
              <PhotographIcon className="w-5 h-5 icon-stroke-width-1" />
            </label>
          </button>
          <EmojiPickerButton
            onEmojiClick={handleEmojiClick}
            inputRef={commentEditInputRef}
            onClick={handleEmojiButtonClick}
            isPickerVisible={isEmojiPickerOpen}
            onClickOutside={handleCloseEmojiPicker}
          />
        </div>
        <div className="flex-shrink-0 space-x-2">
          <button
            type="button"
            className={`inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-light transition-colors ${
              isSubmitLoading
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-blue-500"
            }`}
            onClick={props.toggleEditMode}
            disabled={isSubmitLoading ? true : false}
          >
            <span>Cancel</span>
          </button>
          <button
            type="button"
            className={`inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-light rounded-md shadow-sm transition-colors ${
              isSubmitLoading
                ? "text-gray-300 bg-gray-500 cursor-not-allowed"
                : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
            }`}
            onClick={submitClickHandler}
            disabled={isSubmitLoading ? true : false}
          >
            {isSubmitLoading && <ButtonLoadingIcon />}
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditComment;
