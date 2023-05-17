import {Fragment, useEffect, useRef, useState} from "react";
import {sendReviewPending} from "app/store/configuratorSlice";
import {deleteFilePending} from "app/store/generalSlice";
import {useDispatch, useSelector} from "react-redux";
import StarIcon from '@heroicons/react/solid/StarIcon';
import classNames from "functions/classNames";
import {Transition} from "@headlessui/react";
import {PhotographIcon} from "@heroicons/react/outline";
import ImageUploadThumbnail from "@/components/Forum/UI/ImageUploadThumbnail";
import EmojiPickerButton from "@/components/Atoms/buttons/EmojiPicker";
import ButtonLoadingIcon from "@/components/Atoms/buttons/ButtonLoadingIcon";
import {inputSanitizer} from "../../../functions/sanitizers";
import range from "lodash/range";

const ConfiguratorAddReview = ({onClose, isNew, editData}) => {
    const dispatch = useDispatch();
    const titleInputRef = useRef();
    const postBodyInputRef = useRef();
    const pictureUpload = useRef();

    const configuratorData = useSelector((state) => state?.configurator.configuratorData);
    const sendReviewIsLoading = useSelector((state) => state?.configurator.sendReviewIsLoading);
    const fileIDDeleting = useSelector((state) => state?.general?.fileIDDeleting);
    const fileTypeDeleting = useSelector((state) => state?.general?.fileTypeDeleting);

    const [ratingError, setRatingError] = useState(null);
    const [titleError, setTitleError] = useState(null);
    const [bodyError, setBodyError] = useState(null);

    const [rate, setRate] = useState(editData?.rating || 5);
    const [recommend, setIsRecommend] = useState(editData?.recommend === 'Yes' || true);
    const [selectedPics, setSelectedPics] = useState(editData?.files || []);
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);

    const [latestFocusedInputRef, setLatestFocusedInputRef] = useState(titleInputRef);

    useEffect(() => {
        if(!!editData?.rating && !isNew && rate !== editData?.rating) setRate(editData?.rating)
        if(!!editData?.recommend && !isNew && recommend !== editData?.recommend) setIsRecommend(editData?.recommend === 'Yes')
        if(editData?.files?.length && !isNew && selectedPics?.length !== editData?.files?.length) setSelectedPics(editData?.files)
    }, [editData])

    const fileChangeHandler = (e) => {
        // File size must be less that 5000000 bytes (5 MB)
        let filteredNewFiles = [...e.target.files];
        filteredNewFiles = filteredNewFiles.filter((file) => file.size < 5000000);
        setSelectedPics((oldFiles) => [...oldFiles, ...filteredNewFiles]);
    };
    const removeSelectedPicHandler = (picIndexToRemove, id) => {
        if(id) {
            dispatch(deleteFilePending({
                id,
                type: 'review',
                onSuccess: () => {
                    setSelectedPics((oldPics) => oldPics.filter((item, index) => picIndexToRemove !== index));
                }
            }))
        }
        else
            setSelectedPics((oldPics) => oldPics.filter((item, index) => picIndexToRemove !== index));
    };

    const onRateChange = (rateValue) => {
        setRatingError(null);
        setRate(rateValue);
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

    // Submitting logic
    const submitClickHandler = async () => {
        const postTitle = titleInputRef.current.value;
        const postBody = postBodyInputRef.current.value;

        if (rate === 0) {
            setRatingError("* Please choose your rate.");
            return;
        }

        const sanitizedPostTitle = inputSanitizer(postTitle);
        if (sanitizedPostTitle === "") {
            setTitleError("* Please write a title here.");
            return;
        }

        const sanitizedPostBody = inputSanitizer(postBody);
        if (sanitizedPostBody === "") {
            setBodyError("* Please write the review here.");
            return;
        }

        const reviewForm = new FormData();
        reviewForm.append("bike_id", configuratorData?.bike_id);
        reviewForm.append("rating", rate);
        reviewForm.append("title", sanitizedPostTitle);
        reviewForm.append("body", sanitizedPostBody);
        reviewForm.append("recommend", recommend ? 'Yes' : 'No');
        for (let i = 0; i < selectedPics.length; i++) {
            let image = selectedPics[i];
            if(!image?.id) {
                reviewForm.append(`files[${i}]`, image);
            }
        }
        const onSuccess = () => {
            setTimeout(onClose, 1000)
        }
        dispatch(sendReviewPending({data: reviewForm, review: editData, onSuccess}))
    };

  return (
      <div className="min-w-0 flex-1">
          <div>
              <div className="mb-4">
                  <Transition
                      as={Fragment}
                      show={ratingError ? true : false}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                  >
                      <div className="text-red-500 text-sm mb-2">{ratingError}</div>
                  </Transition>
                  <label htmlFor="title" className="sr-only">
                      Rate
                  </label>
                  <div className="flex items-center">
                      {range(1,6)?.map((rating) => (
                          <StarIcon
                              key={rating}
                              className={classNames(
                                  rate >= rating ? 'text-yellow-400' : 'text-gray-300',
                                  'flex-shrink-0 h-5 w-5 cursor-pointer'
                              )}
                              aria-hidden="true"
                              onClick={() => onRateChange(rating)}
                          />
                      ))}
                  </div>
              </div>
              {/* Title edit */}
              <div className="py-4">
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
                      defaultValue={editData?.title}
                      className="w-full pb-2 border-b bg-transparent resize-none font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
                      placeholder="Title"
                      onFocus={handleTitleInputFocus}
                  />
              </div>
              <div className="py-4">
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
                      Write your review
                  </label>
                  <textarea
                      ref={postBodyInputRef}
                      rows={5}
                      name="body"
                      id="body"
                      defaultValue={editData?.body}
                      className="w-full pb-2 border-b bg-transparent min-h-[6rem] max-h-36 font-light focus:ring-0 focus:border-b-indigo-600 sm:text-sm"
                      placeholder="Write your review..."
                      onFocus={handleBodyInputFocus}
                  />
              </div>
              <div className="relative flex items-start mb-4">
                  <div className="flex h-5 items-center">
                      <input
                          id="recommend"
                          checked={recommend}
                          aria-describedby="comments-description"
                          name="recommend"
                          type="checkbox"
                          onChange={(e) => setIsRecommend(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                  </div>
                  <div className="ml-3 text-sm">
                      <label htmlFor="recommend" className="text-gray-900">
                          Recommend This Bike
                      </label>
                  </div>
              </div>
              {/* Pictures */}
              {selectedPics.length !== 0 && (
                  <div className="mb-4 flex flex-wrap space-x-3">
                      {selectedPics.map((pic, index) => (
                          <ImageUploadThumbnail
                              key={`picEditReview-${index}`}
                              src={pic.original || (pic instanceof File ? URL.createObjectURL(pic) : "")}
                              alt={pic.name}
                              xButtonClassName="absolute top-2 left-2 w-5 h-5 p-1"
                              thumbnailClassName="w-32"
                              isDeleting={pic?.id === fileIDDeleting && fileTypeDeleting === 'review'}
                              onCloseClick={() => removeSelectedPicHandler(index, pic?.id)}
                          />
                      ))}
                  </div>
              )}
          </div>
          {/* Footer buttons */}
          <div className="flex justify-between">
              <div className="flex items-center">
                  <button type="button" className="w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-500 hover:text-gray-500">
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
                  <EmojiPickerButton
                      onEmojiClick={handleEmojiClick}
                      inputRef={postBodyInputRef}
                      onClick={handleEmojiButtonClick}
                      isPickerVisible={isEmojiPickerOpen}
                      onClickOutside={handleCloseEmojiPicker}
                  />
              </div>
              <div className="flex-shrink-0">
                  <button
                      type="button"
                      className={`inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-light transition-colors focus:border-0 focus:outline-0 ${
                          sendReviewIsLoading
                              ? "text-gray-500 cursor-not-allowed"
                              : "text-gray-900 hover:text-blue-600 focus:outline-none focus:ring-blue-500"
                      }`}
                      onClick={onClose}
                      disabled={sendReviewIsLoading}
                  >
                      <span>Cancel</span>
                  </button>
                  <button
                      type="submit"
                      className={`inline-flex items-center space-x-2 px-4 py-2 border border-transparent text-sm font-light rounded-md shadow-sm ${
                          sendReviewIsLoading
                              ? "text-gray-300 bg-gray-500 cursor-not-allowed"
                              : "text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-500"
                      }`}
                      onClick={submitClickHandler}
                      disabled={sendReviewIsLoading}
                  >
                      {sendReviewIsLoading && <ButtonLoadingIcon />}
                      <span>{isNew ? 'Send' : 'Update'}</span>
                  </button>
              </div>
          </div>
      </div>
  );
};

export default ConfiguratorAddReview;
