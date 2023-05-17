import { Fragment, useEffect, useRef, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  PhotographIcon,
  VideoCameraIcon,
  EyeOffIcon,
  XIcon,
} from "@heroicons/react/outline";
import {useDispatch, useSelector} from "react-redux";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import Heading from "./Heading";
import { editThread } from "../../../app/api/forum/threads";
import ImageUploadThumbnail from "../UI/ImageUploadThumbnail";
import { useRouter } from "next/router";
import ButtonLoadingIcon from "../../Atoms/buttons/ButtonLoadingIcon";
import { inputSanitizer } from "../../../functions/sanitizers";
import { isValidHttpUrl } from "../../../functions/validators";
import EmojiPickerButton from "../../Atoms/buttons/EmojiPicker";
import { isValidVimeoUrlAsync, isValidYoutubeUrlAsync } from "../../../functions/validators";
import { toast } from "react-toastify";
import {deleteFilePending} from "app/store/generalSlice";

const EditPost = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const fileIDDeleting = useSelector((state) => state?.general?.fileIDDeleting);
  const fileTypeDeleting = useSelector((state) => state?.general?.fileTypeDeleting);

  // State to hold channel name
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  // Ref to title input
  const titleInputRef = useRef();
  // Ref to post body input
  const postBodyInputRef = useRef();
  // Ref to file input for pictures
  const pictureUpload = useRef();
  // Ref to video url input
  const videoInputRef = useRef();

  // Errors at form validation
  const [channelError, setChannelError] = useState(null);
  const [titleError, setTitleError] = useState(null);
  const [bodyError, setBodyError] = useState(null);
  const [videoInputError, setVideoInputError] = useState(null);
  // A map from channels IDs to their objects
  const [channelsMap, setChannelsMap] = useState(null);
  // An array of File objects
  const [selectedPics, setSelectedPics] = useState([]);
  // A state to set input's height automatically while typing
  const [postBodyTextAreaHeight, setPostBodyTextAreaHeight] = useState("auto");
  // State to handle video url input visibility
  const [isVideoInputVisible, setIsVideoInputVisible] = useState(!!props.videoUrl);
  // A state to hold a ref to the latest focused input, needed for emoji insersion
  const [latestFocusedInputRef, setLatestFocusedInputRef] = useState(titleInputRef);
  // A state to show emoji picker dropdown
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  // Submitting logic
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  useEffect(() => {
    // Mapping channel IDs to their object
    const map = new Map();
    for (let i = 0; i < props.channels.length; i++) {
      map.set(props.channels[i].id, props.channels[i].name);
    }
    setChannelsMap(map);

    setSelectedChannelId(props.defaultChannelId);
    setSelectedPics(props.defaultPostPics);
  }, [props.channels, props.defaultChannelId, props.defaultPostPics]);

  const fileChangeHandler = (e) => {
    let filteredNewFiles = [...e.target.files];
    filteredNewFiles = filteredNewFiles.filter((file) => file.size < 5000000);
    setSelectedPics((oldFiles) => [...oldFiles, ...filteredNewFiles]);
  };
  const removeSelectedPicHandler = (picIndexToRemove, id) => {
    if(id) {
      dispatch(deleteFilePending({
        id,
        type: 'post',
        onSuccess: () => {
          setSelectedPics((oldPics) => oldPics.filter((item, index) => picIndexToRemove !== index));
        }
      }))
    }
    else
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

  const onPostInputChange = (e) => {
    setPostBodyTextAreaHeight("auto");
  };
  useEffect(() => {
    setPostBodyTextAreaHeight(postBodyInputRef.current.scrollHeight);
  }, [postBodyTextAreaHeight]);

  const handleToggleVideoInput = () => {
    setIsVideoInputVisible((prevState) => !prevState);
  };

  // Submitting logic
  const submitClickHandler = async () => {
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
    if (sanitizedPostVideoUrl && !isValidHttpUrl(sanitizedPostVideoUrl)) {
      setIsSubmitLoading(false);
      setVideoInputError("* Please enter a valid YouTube or Vimeo URL.");
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const isValidYoutubeVideo =
      !!sanitizedPostVideoUrl && (await isValidYoutubeUrlAsync(sanitizedPostVideoUrl));
    const isValidVimeoVideo =
      !!sanitizedPostVideoUrl &&
      !isValidYoutubeVideo &&
      (await isValidVimeoUrlAsync(sanitizedPostVideoUrl));
    if (sanitizedPostVideoUrl && !isValidYoutubeVideo && !isValidVimeoVideo) {
      setIsSubmitLoading(false);
      setVideoInputError("* Please enter a valid YouTube or Vimeo URL.");
      setPostBodyTextAreaHeight("auto");
      return;
    }

    const threadForm = new FormData();
    threadForm.append("title", sanitizedPostTitle);
    threadForm.append("body", sanitizedPostBody);
    threadForm.append("channel_id", selectedChannelId);
    threadForm.append("video_url", videoUrl);
    threadForm.append("_method", "PATCH");
    for (let i = 0; i < selectedPics.length; i++) {
      let image = selectedPics[i];
      if(!image?.id) {
        threadForm.append(`files[${i}]`, image);
      }
    }

    try {
      const res = await editThread(props.threadId, threadForm);
      toast.success("Your post was edited successfully.");

      setIsSubmitLoading(false);
      router.reload();
    } catch (error) {
      if(error?.message)
      toast.error(error?.message);
      console.log(error)
      setIsSubmitLoading(false);
    }
  };

  return (
    <WhiteShadowCard className={`${props.isThreadHidden ? "bg-gray-200" : ""}`}>
      {/* Hidden post text */}
      {props.isThreadHidden ? (
        <div className="mb-4">
          <p className="flex space-x-3 font-light text-sm text-red-600">
            <EyeOffIcon className="icon-stroke-width-1 w-4 h-4" />
            <span>This post is hidden</span>
          </p>
        </div>
      ) : (
        <></>
      )}
      {/* Heading */}
      <div className="flex items-center mb-4">
        <Heading postTitle={props.postTitle} user={props.user} isPost={true} />
      </div>
      {/* Edit content */}
      <div className="min-w-0 flex-1">
        <div>
          {/* Channel list dropdown */}
          <div className="flex items-center mb-4">
            <Menu as="div" className="relative inline-block text-left font-light">
              <div>
                <Menu.Button className="inline-flex justify-center w-full py-2 text-sm font-light text-gray-700">
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
          {/* Title edit */}
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
            <label htmlFor="title" className="sr-only">Title</label>
            <input
              ref={titleInputRef}
              name="title"
              id="title"
              className="w-full pb-2 border-b border-transparent bg-transparent resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
              placeholder="Title"
              defaultValue={props.defaultPostTitle}
              onFocus={handleTitleInputFocus}
            />
          </div>
          {/* Body edit */}
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
              onInput={onPostInputChange}
              rows={1}
              name="body"
              id="body"
              className="w-full pb-2 border-b bg-transparent overflow-y-hidden resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
              placeholder="Write your post..."
              defaultValue={props.defaultPostBody}
              onFocus={handleBodyInputFocus}
            />
          </div>
          {/* Video URL */}
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
                defaultValue={props.videoUrl}
                onFocus={() => setVideoInputError(null)}
              />
              <div onClick={handleToggleVideoInput}>
                <XIcon className="w-5 h-5 icon-stroke-width-1 ml-3 cursor-pointer" />
              </div>
            </div>
          </Transition>
          {/* Pictures */}
          {selectedPics.length !== 0 && (
            <div className="mb-4 flex flex-wrap">
              {selectedPics.map((pic, index) => (
                  <ImageUploadThumbnail
                      key={`picEditUpload-${index}`}
                      src={pic.path || (pic instanceof File ? URL.createObjectURL(pic) : "")}
                      alt={pic.name}
                      className="pr-2"
                      xButtonClassName="absolute top-2 left-2 w-5 h-5 p-1"
                      thumbnailClassName="w-32"
                      isDeleting={pic?.id === fileIDDeleting && fileTypeDeleting === 'post'}
                      onCloseClick={() => removeSelectedPicHandler(index, pic?.id)}
                  />
              ))}
            </div>
          )}
        </div>
        {/* Footer buttons */}
        <div className="flex justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
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
              className="w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500"
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
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </WhiteShadowCard>
  );
};

export default EditPost;
