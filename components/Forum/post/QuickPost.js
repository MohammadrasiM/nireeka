import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, PhotographIcon, VideoCameraIcon, XIcon } from "@heroicons/react/outline";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import { useSelector } from "react-redux";
import { postNewThread } from "../../../app/api/forum/threads";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import { inputSanitizer } from "../../../functions/sanitizers";
import { isValidHttpUrl } from "../../../functions/validators";
import EmojiPickerButton from "../../Atoms/buttons/EmojiPicker";
import { isValidVimeoUrlAsync, isValidYoutubeUrlAsync } from "../../../functions/validators";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";

const Avatar = dynamic(() => import("../../Atoms/people/Avatar"));
const ImageUploadThumbnail = dynamic(() => import("../UI/ImageUploadThumbnail"));

const QuickPost = (props) => {
  const userData = useSelector((state) => state.auth.userData);

  // Ref to title input
  const titleInputRef = useRef();
  // Ref to post body input
  const postBodyInputRef = useRef();
  // Ref to file input for pictures
  const pictureUpload = useRef();
  // Ref to video url input
  const videoInputRef = useRef();

  // A map from channels IDs to their objects
  const [channelsMap, setChannelsMap] = useState(null);
  // Errors at form validation
  const [channelError, setChannelError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [bodyError, setBodyError] = useState(null);
  const [videoInputError, setVideoInputError] = useState(null);
  // State to hold channel name
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  // An array of File objects
  const [selectedPics, setSelectedPics] = useState([]);
  // A state to set input's height automatically while typing
  const [postBodyTextAreaHeight, setPostBodyTextAreaHeight] = useState("auto");
  // State to handle video url input visibility
  const [isVideoInputVisible, setIsVideoInputVisible] = useState(false);
  // A state to hold a ref to the latest focused input, needed for emoji insertion
  const [latestFocusedInputRef, setLatestFocusedInputRef] = useState(titleInputRef);
  // A state to show emoji picker dropdown
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // Submitting logic
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  // Mapping channel IDs to their object
  useEffect(() => {
    const map = new Map();
    for (let i = 0; i < props.channels.length; i++) {
      map.set(props.channels[i].id, props.channels[i].name);
    }
    setChannelsMap(map);
  }, [props.channels]);

  const fileChangeHandler = (e) => {
    // File size must be less that 5000000 bytes (5 MB)
    let filteredNewFiles = [...e.target.files];
    filteredNewFiles = filteredNewFiles.filter((file) => file.size < 5000000);
    setSelectedPics((oldFiles) => [...oldFiles, ...filteredNewFiles]);
  };

  const handleSelectedPicRemove = (picIndexToRemove) => {
    setSelectedPics((oldPics) => oldPics.filter((item, index) => picIndexToRemove !== index));
  };

  const handleTitleInputFocus = () => {
    setTitleError(null);
    setLatestFocusedInputRef(titleInputRef);
  };

  const handleBodyInputFocus = () => {
    setBodyError(null);
    setLatestFocusedInputRef(postBodyInputRef);
  };

  const handleEmojiButtonClick = () => {
    setIsEmojiPickerOpen((prevState) => !prevState);
    latestFocusedInputRef.current.focus();
  };
  const handleCloseEmojiPicker = () => {
    setIsEmojiPickerOpen(false);
  };

  const handleEmojiClick = (e, emoji) => {
    latestFocusedInputRef.current.value += emoji.emoji;
  };

  const handlePostBodyChange = (e) => {
    setPostBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setPostBodyTextAreaHeight(postBodyInputRef.current.scrollHeight);
  }, [postBodyTextAreaHeight]);

  const handleToggleVideoInput = () => {
    setIsVideoInputVisible((prevState) => !prevState);
  };

  // Submitting Logic
  const handleSubmit = async () => {
    const postTitle = titleInputRef.current.value;
    const postBody = postBodyInputRef.current.value;
    const videoUrl = videoInputRef.current ? videoInputRef.current.value : "";
    setIsSubmitLoading(true);

    // Form validation logic
    if (selectedChannelId === null) {
      setIsSubmitLoading(false);
      setChannelError("* Please select a channel from the menu.");
      return;
    }

    const sanitizedPostTitle = inputSanitizer(postTitle);
    if (sanitizedPostTitle === "") {
      setIsSubmitLoading(false);
      setTitleError("* Please write a title here.");
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const sanitizedPostBody = inputSanitizer(postBody);
    if (sanitizedPostBody === "") {
      setIsSubmitLoading(false);
      setBodyError("* Please write the post body here.");
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const sanitizedPostVideoUrl = inputSanitizer(videoUrl);

    if (isVideoInputVisible && !isValidHttpUrl(sanitizedPostVideoUrl)) {
      setIsSubmitLoading(false);
      setVideoInputError("* Please enter a valid YouTube or Vimeo URL.");
      setPostBodyTextAreaHeight("auto");
      return;
    }

    if (isVideoInputVisible && sanitizedPostVideoUrl && sanitizedPostVideoUrl !== "") {
      const isValidYoutubeVideo = await isValidYoutubeUrlAsync(sanitizedPostVideoUrl);
      const isValidVimeoVideo =
        !isValidYoutubeVideo && (await isValidVimeoUrlAsync(sanitizedPostVideoUrl));
      if (isVideoInputVisible && !isValidYoutubeVideo && !isValidVimeoVideo) {
        setIsSubmitLoading(false);
        setVideoInputError("* Please enter a valid YouTube or Vimeo URL.");
        setPostBodyTextAreaHeight("auto");
        return;
      }
    }

    const threadForm = new FormData();
    threadForm.append("title", sanitizedPostTitle);
    threadForm.append("body", sanitizedPostBody);
    threadForm.append("channel_id", selectedChannelId);
    threadForm.append("video_url", sanitizedPostVideoUrl);
    for (let i = 0; i < selectedPics.length; i++) {
      threadForm.append(`files[${i}]`, selectedPics[i]);
    }

    const res = await postNewThread(threadForm);

    if (res instanceof Error) {
      console.log('error')
      console.log("Error submitting post.", res);
      setIsSubmitLoading(false);
      return;
    }

    toast.success("Your post was submitted successfully.");

    setIsSubmitLoading(false);
    setSelectedChannelId(null);
    setPostBodyTextAreaHeight("auto");
    setSelectedPics([]);
    if (typeof props.refreshFeed() === "function") props.refreshFeed();
    titleInputRef.current.value = "";
    postBodyInputRef.current.value = "";
  };

  return (
    <WhiteShadowCard>
      <div className="flex items-center mb-3">
        {userData && <Avatar user={{ is_online: true, avatar: userData.avatar }} noUserInfoModal />}

        <p className="text-sm font-light text-gray-400 ml-3">
          Post as{" "}
          {userData && (
            <span className="text-sm font-light text-gray-700">
              {userData.name} {userData.last_name}
            </span>
          )}
        </p>
      </div>
      <div className="min-w-0 flex-1">
        <div>
          {/* Channel list dropdown */}
          <div className="flex items-center mb-4">
            <Menu as="div" className="relative inline-block text-left font-light">
              <div>
                <Menu.Button className="inline-flex justify-center w-full py-2 bg-white text-sm font-light text-gray-700">
                  {selectedChannelId ? channelsMap.get(selectedChannelId) : "Choose channel..."}
                  <ChevronDownIcon
                    className="-mr-1 ml-2 h-5 w-5 icon-stroke-width-1"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1">
                    {props.channels.map((item, index) => {
                      return (
                        <Menu.Item
                          key={`selectChannelList-${index}`}
                          onClick={() => {
                            setChannelError(null);
                            setSelectedChannelId(item.id);
                          }}
                        >
                          {({ active }) => (
                            <span
                              className={`${
                                active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                              } block px-4 py-2 text-sm cursor-pointer`}
                            >
                              {item.name}
                            </span>
                          )}
                        </Menu.Item>
                      );
                    })}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Transition
              as={Fragment}
              show={channelError ? true : false}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <span className="ml-6 text-red-500 text-sm">{channelError}</span>
            </Transition>
          </div>
          {/* Title input */}
          <div className="mb-4">
            <Transition
              as={Fragment}
              show={titleError ? true : false}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="text-red-500 text-sm mb-2">{titleError}</div>
            </Transition>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              ref={titleInputRef}
              name="title"
              id="title"
              className="w-full pb-2 border-b border-transparent bg-transparent resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
              placeholder="Title"
              defaultValue={""}
              onFocus={handleTitleInputFocus}
            />
          </div>
          {/* Post body input */}
          <div className="mb-4">
            <Transition
              as={Fragment}
              show={bodyError ? true : false}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <div className="text-red-500 text-sm mb-2">{bodyError}</div>
            </Transition>
            <label htmlFor="body" className="sr-only">
              Write your post
            </label>
            <textarea
              ref={postBodyInputRef}
              style={{ minHeight: postBodyTextAreaHeight }}
              onInput={handlePostBodyChange}
              rows={1}
              name="body"
              id="body"
              className="w-full pb-2 border-b bg-transparent overflow-y-hidden resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
              placeholder="Write your post..."
              defaultValue={""}
              onFocus={handleBodyInputFocus}
            />
          </div>
          {/* Video URL input */}
          <Transition
            as={Fragment}
            show={isVideoInputVisible ? true : false}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <div className="mb-4 flex flex-wrap items-center">
              <Transition
                as={Fragment}
                show={videoInputError ? true : false}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <div className="w-full text-red-500 text-sm mb-2">{videoInputError}</div>
              </Transition>
              <label htmlFor="body" className="sr-only">
                Enter video url to show on post
              </label>
              <input
                ref={videoInputRef}
                name="videoUrl"
                id="videoUrl"
                className="flex-1 pb-2 border-b bg-transparent resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
                placeholder="Video URL to embed..."
                defaultValue={""}
                onFocus={() => setVideoInputError(null)}
              />
              <div onClick={handleToggleVideoInput}>
                <XIcon className="w-5 h-5 icon-stroke-width-1 ml-3 cursor-pointer" />
              </div>
            </div>
          </Transition>
          {(!selectedPics || selectedPics.length !== 0) && (
            <div className="mb-4 flex flex-wrap">
              {selectedPics.map((pic, index) => {
                const blob = URL.createObjectURL(pic);
                return (
                  <ImageUploadThumbnail
                    key={`picUpload-${index}`}
                    src={blob}
                    alt={pic.name}
                    xButtonClassName="absolute top-2 left-2 w-5 h-5 p-1"
                    thumbnailClassName="w-36 mr-3"
                    className="mb-3"
                    onCloseClick={() => handleSelectedPicRemove(index)}
                  />
                );
              })}
            </div>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-5">
            <button
              type="button"
              className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
            >
              <label htmlFor="picture_upload_input" className="cursor-pointer">
                <input
                  ref={pictureUpload}
                  onChange={fileChangeHandler}
                  id="picture_upload_input"
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                />
                <PhotographIcon className="w-5 h-5 icon-stroke-width-1" />
              </label>
            </button>
            <button
              type="button"
              className="rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
              onClick={handleToggleVideoInput}
            >
              <VideoCameraIcon className="w-5 h-5 icon-stroke-width-1" />
              <span className="sr-only">Add video</span>
            </button>
            <EmojiPickerButton
              onEmojiClick={handleEmojiClick}
              inputRef={latestFocusedInputRef}
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
              <span>Post</span>
            </button>
          </div>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default QuickPost;
