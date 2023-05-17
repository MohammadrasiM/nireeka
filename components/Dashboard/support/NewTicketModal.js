import { PaperClipIcon } from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  getTicketCategories,
  getTicketPriorities,
  openNewTicket,
} from "../../../app/api/user/ticket";
import { inputSanitizer } from "../../../functions/sanitizers";
import PrimaryButton from "../../Atoms/buttons/PrimaryButton";
import WhiteButton from "../../Atoms/buttons/WhiteButton";
import WhiteShadowCard from "../../Atoms/cards/WhiteShadowCard";
import SelectDropdown from "../../Atoms/inputs/SelectDropdown";
import TextArea from "../../Atoms/inputs/TextArea";
import TextInput from "../../Atoms/inputs/TextInput";
import LoadingNireeka from "../../Atoms/LoadingNireeka";
import FileThumbnail from "./FileThumbnail";
import MediaThumbnail from "./MediaThumbnail";

const NewTicketModal = (props) => {
  const fileUploadRef = useRef();
  const titleInputRef = useRef();
  const messageInputRef = useRef();

  // Categories to list (fetched from server)
  const [categories, setCategories] = useState(null);
  // Priorities to list (fetched from server)
  const [priorities, setPriorities] = useState(null);
  // State to show loader while fetching data from server
  const [isLoading, setIsLoading] = useState(true);
  // Selected category
  const [selectedCategory, setSelectedCategory] = useState({
    id: -1,
    name: "Select Category",
  });
  // Selected priority
  const [selectedPriority, setSelectedPriority] = useState({
    id: -1,
    name: "Select Priority",
  });
  // Attachment files
  const [selectedAttachments, setSelectedAttachments] = useState("");
  // Showing loader spinner when user hits submit
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  // Error lines to show
  const [errorLines, setErrorLines] = useState([]);

  const getData = async () => {
    setIsLoading(true);
    const categoriesRes = await getTicketCategories();
    const prioritiesRes = await getTicketPriorities();

    const prioritiesToSet = [...prioritiesRes.data];
    // Reformatting priority object, renaming "value" property to "name"
    for (let item of prioritiesToSet) {
      item.name = item.value;
      delete item.value;
    }

    setCategories(categoriesRes.data);
    setPriorities(prioritiesToSet);
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const handleFileChange = (e) => {
    const fileSizeErrorMessage =
      "There was a file that was too large to upload. The maximum allowed file size is 3 MB.";

    const tooManyFilesErrorMessage =
      "Maximum file count exceeded. You can upload only 3 files.";

    // File size must be less that 3000000 bytes (3 MB)
    setErrorLines((prevState) =>
      prevState.filter(
        (errorMessage) =>
          errorMessage !== fileSizeErrorMessage &&
          errorMessage !== tooManyFilesErrorMessage
      )
    );
    for (let file of e.target.files) {
      if (file.size >= 3000000) {
        setErrorLines((prevState) => [...prevState, fileSizeErrorMessage]);
      }
    }

    if (selectedAttachments.length + e.target.files.length > 3) {
      setErrorLines((prevState) => [...prevState, tooManyFilesErrorMessage]);
      return;
    }

    let filteredNewFiles = [...e.target.files];
    filteredNewFiles = filteredNewFiles.filter((file) => file.size < 3000000);
    setSelectedAttachments((oldFiles) => [...oldFiles, ...filteredNewFiles]);
  };

  const handleFileRemove = (fileIndex) => {
    setSelectedAttachments((prevState) =>
      prevState.filter((file, index) => index !== fileIndex)
    );
  };

  const handleTicketSubmit = async () => {
    const sanitizedTitle = inputSanitizer(titleInputRef.current.value);
    const sanitizedMessage = inputSanitizer(messageInputRef.current.value);

    const errorsToSet = [];
    if (sanitizedTitle === "") {
      errorsToSet.push("Title field cannot be empty");
    }
    if (sanitizedMessage === "") {
      errorsToSet.push("Message field cannot be empty");
    }
    if (selectedCategory.id === -1) {
      errorsToSet.push("You have to select a category");
    }
    if (selectedPriority.id === -1) {
      errorsToSet.push("You have to specify the ticket priority");
    }

    if (errorsToSet.length > 0) {
      setErrorLines(errorsToSet);
      return;
    }

    const ticketForm = new FormData();
    ticketForm.append("title", sanitizedTitle);
    ticketForm.append("category", selectedCategory.id);
    ticketForm.append("priority", selectedPriority.id);
    ticketForm.append("message", sanitizedMessage);
    for (let i = 0; i < selectedAttachments.length; i++) {
      ticketForm.append(`files[${i}]`, selectedAttachments[i]);
    }

    setIsSubmitLoading(true);

    const formRes = await openNewTicket(ticketForm);
    if (formRes instanceof Error) {
      if (formRes.response) {
        if (formRes.response.status === 403) {
          toast.error("There was some errors validating the form.");
          setIsSubmitLoading(false);
          return;
        }

        if (formRes.response.status === 402) {
          toast.error(formRes?.response?.data?.data);
          setIsSubmitLoading(false);
          return;
        }
        setIsSubmitLoading(false);
        return;
      }
    }

    setIsSubmitLoading(false);
    toast.success("Your ticket was submitted successfully");
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    props.onSubmit();
    props.onClose();
  };

  return (
    <WhiteShadowCard>
      {!isLoading ? (
        <form className="w-full">
          <div className="space-y-8 sm:space-y-5">
            <div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl pb-5">
                  New Ticket
                </h3>
              </div>
              <div className="border-t border-gray-200 py-5">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <TextInput
                    inputMode="full-border"
                    name="title"
                    type="text"
                    label="Title"
                    ref={titleInputRef}
                  />
                </div>
              </div>
              <div className="border-t sm:border-gray-200 py-5">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectDropdown
                    label="Category"
                    list={categories}
                    helpText="Please select the category carefully as tickets with the
                    wrong category will not be processed and will be closed."
                    selected={selectedCategory}
                    onSelect={(item) => setSelectedCategory(item)}
                  />
                </div>
              </div>
              <div className="border-t border-gray-200 py-5">
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <SelectDropdown
                    label="Priority"
                    list={priorities}
                    selected={selectedPriority}
                    onSelect={(item) => setSelectedPriority(item)}
                  />
                </div>
              </div>
              <div>
                <div className="border-t border-gray-200 py-5">
                  <div className="sm:mt-0 sm:col-span-2">
                    <TextArea
                      label="Message"
                      helpText="Write a few sentences about your Ticket (Max. 500
                      Characters)."
                      maxLength={500}
                      ref={messageInputRef}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 py-5">
                  <label
                    htmlFor="file-upload"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Attachments
                  </label>
                  <div>
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
                                backdropMode="light"
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
                  </div>
                  <div className="mt-1 sm:mt-0">
                    <div className="w-full flex justify-center border-2 border-gray-300 border-dashed rounded-md">
                      <label
                        htmlFor="file-upload"
                        className="w-full py-6 cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-1 focus-within:ring-indigo-500 focus-within:ring-offset-1 text-center"
                      >
                        <div className="space-y-1 text-center">
                          <PaperClipIcon className="mx-auto h-12 w-12 text-gray-400 icon-stroke-width-1" />
                          <div className="text-sm text-gray-600">
                            <span className="text-indigo-600">
                              Upload files (max. 3 files)
                            </span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              ref={fileUploadRef}
                              onChange={handleFileChange}
                              accept="image/*,application/pdf"
                              multiple
                            />
                          </div>
                          <p className="text-xs text-gray-500">
                            Image or PDF up to 3MB
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {errorLines.length > 0 && (
            <div className="bg-red-50 py-3 px-5">
              <ul>
                {errorLines.map((error, index) => (
                  <li key={index} className="text-red-700 text-sm">
                    &bull;
                    <span className="ml-1">{error}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="pt-5">
            <div className="flex justify-end space-x-3">
              <WhiteButton
                onClick={() => {
                  if (!isSubmitLoading) {
                    document.getElementsByTagName("body")[0].style.overflow =
                      "auto";
                    props.onClose();
                  }
                }}
                disabled={isSubmitLoading}
              >
                Cancel
              </WhiteButton>
              <PrimaryButton
                onClick={handleTicketSubmit}
                disabled={isSubmitLoading}
              >
                {isSubmitLoading ? (
                  <>
                    <LoadingNireeka className="w-3 h-3 mr-2" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </PrimaryButton>
            </div>
          </div>
        </form>
      ) : (
        <div className="flex justify-center">
          <LoadingNireeka className="w-12 h-12 border-gray-700" />
        </div>
      )}
    </WhiteShadowCard>
  );
};

export default NewTicketModal;
