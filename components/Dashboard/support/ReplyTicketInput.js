import Avatar from "../../Atoms/people/Avatar";
import { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { replyToTicket } from "../../../app/api/user/ticket";
import { PaperClipIcon, PhotographIcon } from "@heroicons/react/outline";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import EmojiPickerButton from "../../Atoms/buttons/EmojiPicker";
import { inputSanitizer } from "../../../functions/sanitizers";
import { toast } from "react-toastify";
import classNames from "../../../functions/classNames";
import MediaThumbnail from "./MediaThumbnail";
import FileThumbnail from "./FileThumbnail";

const ReplyTicketInput = (props) => {
  const userData = useSelector((state) => state.auth.userData);
  const router = useRouter();

  // Auto-resizing post body input logic
  const replyInputRef = useRef();

  // An array of File objects to upload
  const [selectedAttachments, setSelectedAttachments] = useState("");
  // State to show file size error
  const [fileSizeErrorVisible, setFileSizeErrorVisible] = useState(false);
  // A state to set input's height automatically while typing
  const [ticketBodyTextAreaHeight, setTicketBodyTextAreaHeight] =
    useState("auto");
  // A state to show emoji picker dropdown
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // State to show loader when posting the reply
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleTicketBodyChange = (e) => {
    setTicketBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setTicketBodyTextAreaHeight(replyInputRef.current.scrollHeight);
  }, [ticketBodyTextAreaHeight]);

  const handleFileChange = (e) => {
    // File size must be less that 5000000 bytes (5 MB)
    let filteredNewFiles = [...e.target.files];
    filteredNewFiles = filteredNewFiles.filter((file) => file.size < 5000000);
    setSelectedAttachments((oldFiles) => [...oldFiles, ...filteredNewFiles]);
  };
  const handleFileRemove = (fileIndexToRemove) => {
    setSelectedAttachments((oldPics) =>
      oldPics.filter((item, index) => fileIndexToRemove !== index)
    );
  };

  const handleEmojiButtonClick = () => {
    setIsEmojiPickerOpen((prevState) => !prevState);
    replyInputRef.current.focus();
  };
  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerOpen(false);
  };

  const handleEmojiClick = (e, emoji) => {
    replyInputRef.current.value += emoji.emoji;
  };

  // Replying logic
  const handleSubmit = async () => {
    setIsSubmitLoading(true);

    const sanitizedReplyBody = inputSanitizer(replyInputRef.current.value);
    if (sanitizedReplyBody === "") {
      toast.error("Reply body cannot be empty.");

      setIsSubmitLoading(false);
      replyInputRef.current.value = "";
      setTicketBodyTextAreaHeight("auto");
      return;
    }

    const replyForm = new FormData();
    replyForm.append("comment", sanitizedReplyBody);
    if (router.query.ticket_id) {
      replyForm.append("ticket_id", router.query.ticket_id);
    }
    if (selectedAttachments) {
      for (let i = 0; i < selectedAttachments.length; i++) {
        replyForm.append(`files[${i}]`, selectedAttachments[i]);
      }
    }
    const res = await replyToTicket(replyForm);

    if (res instanceof Error) {
      console.log("Error replying:", res);
      setIsSubmitLoading(false);
      return;
    }

    toast.success("Your reply has been posted successfully");

    if (props.onSubmit) props.onSubmit();

    setIsSubmitLoading(false);
    replyInputRef.current.value = "";
    setSelectedAttachments([]);
    setTicketBodyTextAreaHeight("auto");
  };

  return (
    <div className={classNames("flex items-start mx-auto", props.className)}>
      {userData && (
        <Avatar user={{ is_online: true, avatar: userData.avatar }} />
      )}
      <div className="min-w-0 flex-1 pl-3">
        <div className="border-b focus-within:border-b-indigo-600 transition mb-4">
          <label htmlFor="reply" className="sr-only">
            Add your reply
          </label>
          <textarea
            ref={replyInputRef}
            style={{ minHeight: ticketBodyTextAreaHeight }}
            onInput={handleTicketBodyChange}
            rows={1}
            name="reply"
            id="reply"
            className="block w-full border-0 border-transparent bg-transparent p-0 pb-2 resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
            placeholder="Add your reply..."
            defaultValue={""}
          />
        </div>
        {fileSizeErrorVisible && (
          <p className="font-light text-sm text-red-600">
            * File is too large (maximum: 5MB)
          </p>
        )}
        {selectedAttachments.length > 0 && (
          <ul className="flex flex-wrap my-2">
            {selectedAttachments.map((file, index) => {
              if (file.type.includes("image/")) {
                return (
                  <MediaThumbnail
                    key={"fileupload" + index}
                    file={file}
                    hasXButton
                    onXClick={() => handleFileRemove(index)}
                    className="mr-5 mt-4"
                  />
                );
              }

              return (
                <FileThumbnail
                  key={"fileupload" + index}
                  file={file}
                  hasXButton
                  onXClick={() => handleFileRemove(index)}
                  className="mr-5 mt-4"
                />
              );
            })}
          </ul>
        )}
        <div className="flex justify-between">
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
            >
              <label htmlFor="ReplyTicketInput" className="cursor-pointer">
                <input
                  onChange={handleFileChange}
                  id="ReplyTicketInput"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                />
                <PhotographIcon className="w-5 h-5 icon-stroke-width-1" />
              </label>
            </button>
            <button
              type="button"
              className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
            >
              <label htmlFor="ReplyTicketInputPDF" className="cursor-pointer">
                <input
                  onChange={handleFileChange}
                  id="ReplyTicketInputPDF"
                  type="file"
                  className="hidden"
                  accept="application/pdf"
                  multiple
                />
                <PaperClipIcon className="w-5 h-5 icon-stroke-width-1" />
              </label>
            </button>
            <EmojiPickerButton
              onEmojiClick={handleEmojiClick}
              inputRef={replyInputRef}
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
              onClick={handleSubmit}
              disabled={isSubmitLoading ? true : false}
            >
              {isSubmitLoading && <ButtonLoadingIcon />}
              <span>{isSubmitLoading ? "Sending..." : "Send"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyTicketInput;
