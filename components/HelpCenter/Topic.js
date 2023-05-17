import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Styles from "../HelpCenter/topic.module.css";
import { useSelector, useDispatch } from "react-redux";
import { helpFullPending } from "../../app/store/helpCenterSlice";
import { helpFullGuestPending } from "../../app/store/helpCenterSlice";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import EditTopic from "../Editor/EditTopic";
import BlurBackdrop from "../Atoms/overlays/BlurBackdrop";
import classNames from "functions/classNames";
import LoadingNireeka from "../Atoms/LoadingNireeka";

export default function Topic({ topics, isModal, isPageEmbedded }) {
  function createDangerHtml() {
    return { __html: topics.data.topic.long_desc };
  }

  const router = useRouter();
  const { query } = router;
  const slugPage = query.topic;
  let strSlugPage = slugPage
  const toPascalCase = (str) =>
    (str?.match(/[a-zA-Z0-9]+/g) || [])
      .map((w) => `${w.charAt(0).toUpperCase()}${w.slice(1)}`)
      .join(" ").replace("-", " ");

  const state = useSelector((state) => state);
  let { isUserLoggedIn } = state.auth;
  const dispatch = useDispatch();
  const [messageBox, setMessageBox] = useState(1);
  const [mes, setMes] = useState(false);
  let {
    helpFullGuestData,
    helpFullData,
    helpFullStatus,
    helpFullGuestStatus,
    helpFullGuestReqSuccess,
    helpFullReqSuccess,
  } = state.helpCenter;

  const [sendMessage, setSendMessage] = useState(false);
  const [feedback, setFeedback] = useState(true);
  const [loadings, setLoadings] = useState(false);
  const [colorBold, setColorBold] = useState(false);
  const [colorBoldNo, setColorBoldNo] = useState(false);

  const [isShowTopic, setIsShowTopic] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSubmitForm = ({ topic_id, comment, help_full }) => {
    const data = { topic_id: idPage, comment, help_full: messageBox };
    const dataGuest = { topic_id: idPage, comment, help_full: messageBox };

    {
      isUserLoggedIn
        ? dispatch(helpFullPending(data))
        : dispatch(helpFullGuestPending(dataGuest));
    }
    setLoadings(true);
    // setInterval(() => {
    //   setSendMessage(true);
    // }, 2000);
    // setInterval(() => {
    //   setFeedback(false);
    // }, 5000);
  };

  if (
    (helpFullGuestReqSuccess != 0 || helpFullReqSuccess != 0) &&
    !sendMessage
  ) {
    setInterval(() => {
      setSendMessage(true);
    }, 4000);
  }

  const information = {
    topic_id: topics?.data?.topic?.id,
    title: topics?.data?.topic?.title,
    short_desc: topics?.data?.topic?.short_dec,
    long_desc: topics?.data?.topic?.long_desc,
    topic_category_id: topics?.data?.topic?.category_id,
  };

  const [topicInformation, setTopicInformation] = useState(information);

  return (
    <div className="bg-gray-100">
      {!isPageEmbedded && (
        <div
          className={classNames(
            "w-full px-3 mx-auto",
            !isPageEmbedded && "lg:w-8/12"
          )}
        >
          <nav className="w-full py-6 rounded lg:py-12 bg-grey-light">
            <ul className="flex list-reset text-grey-dark">
              <Link href="/help-center" passHref>
                <a className="font-light text-blue ">
                  <li className="flex">
                    <div className="w-8 h-8 ">
                      <Image
                        src="https://api.nireeka.com/images/logo.jpg"
                        alt="logo"
                        width={25}
                        height={25}
                        className="mt-2 rounded-full "
                      />
                    </div>
                    <h6>Home</h6>
                  </li>
                </a>
              </Link>
              <li>
                <span className="mx-2 font-light">{`>`}</span>
              </li>
              {topics.data.breadcrumbs.parent ? (
                <>
                  <Link
                    href={`/help-center/category/${topics.data.breadcrumbs.parent.slug}`}
                    passHref
                  >
                    {/* <Link href={topics.data.breadcrumbs.parent.url} passHref> */}
                    <a className="font-light text-blue whitespace-nowrap">
                      <li>{topics.data.breadcrumbs.parent.title}</li>
                    </a>
                  </Link>
                  <li>
                    <span className="mx-2 font-light">{`>`}</span>
                  </li>

                  <li className="overflow-x-hidden font-light text-blue whitespace-nowrap ">
                    {toPascalCase(strSlugPage)}
                  </li>
                </>
              ) : (
                <li>{topics.data.breadcrumbs.title}</li>
              )}
              {/* <Link href={`/help-center/category/${articles.data.slug}`} passHref>
              <a className="font-light text-blue">
                <li>{articles.data.title}</li>
              </a>
            </Link> */}
            </ul>
          </nav>
          {/* @include('layouts.tailwind.helpCenter.breadcrumbs') */}
        </div>
      )}

      <div className={`${!isModal ? 'pb-6 md:pb-16' : ''} ${Styles.tagLinks}`}>
        <div
          className={classNames(
            "w-full mx-auto bg-white",
            !isModal && "border-b border-gray-300 rounded-md",
            !isPageEmbedded && "md:w-11/12 lg:w-8/12"
          )}
        >
          <div className="flex-col pt-2 pb-5 text-left border-b border-gray-300 align-center ">
            <h2 className="px-4 pt-12 text-3xl font-light text-left md:text-4xl lg:pl-16">
              {topics.data.topic.title}
            </h2>
            <div className="px-4 py-2 text-left text-gray-500 text-md lg:pl-16">
              <p className="px-2 font-light">
                {topics.data.topic.created_at}
                {/* {{ $topic->created_at->format(' M d, Y h:i A') }} */}
              </p>

              {(topics.data.is_admin == 9 || topics.data.is_admin == 1) && !isModal && (
                <button
                  onClick={() => setIsShowTopic(true)}
                  className="flex items-center justify-center w-1/2 px-4 py-2 mt-4 font-light border rounded-md md:w-1/3 text-sky-500 border-sky-500 focus:outline-none hover:border-indigo-500 hover:text-indigo-500 "
                >
                  Edit Topic
                </button>
              )}

              {/* modal Add Topic */}
              <BlurBackdrop
                isVisible={isShowTopic}
                noXButton
                // onClose={() => setIsShowTopic(false)}
                backdropMode="dark"
                className="w-full md:w-[60%]"
              >
                <EditTopic
                  topicInformation={topicInformation}
                  categories={topics.data.categories}
                  setTopicInformation={setTopicInformation}
                  onClose={() => setIsShowTopic(false)}
                />
              </BlurBackdrop>
            </div>
          </div>
          <div className="flex justify-center w-full px-2 py-3 mx-auto mt-8 md:w-11/12 ">
            <div className="w-full mx-2">
              <p className="pb-4 text-xl font-light text-gray-800">
                {topics.data.topic.short_dec}
              </p>
              <div
                className={`mb-5 text-gray-600 font-light  ${Styles.tagText}`}
                dangerouslySetInnerHTML={createDangerHtml()}
              ></div>
              <div className="mb-5">
                {!sendMessage && (
                  <>
                    {!topics.data.has_comment && feedback ? (
                      <div id="sendBtn">
                        <div className="flex-col justify-center pt-8 border-t-2">
                          <div
                            className="flex justify-center pb-1"
                            id="msgComponents"
                          >
                            <h3 className="text-xl font-light text-gray-700">
                              Was this article helpful?
                            </h3>
                            <div className="flex justify-start px-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setMessageBox(1);
                                  setMes(true);
                                  setColorBold(true);
                                  setColorBoldNo(false);
                                }}
                                className={`inline-flex px-1 font-medium text-green-400 text-md  ${
                                  colorBold && "font-bold text-green-600"
                                } `}
                              >
                                yes
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  setMessageBox(0);
                                  setMes(true);
                                  setColorBold(false);
                                  setColorBoldNo(true);
                                }}
                                className={`inline-flex px-1 font-medium text-red-400 text-md  ${
                                  colorBoldNo && "font-bold text-red-600"
                                } `}
                              >
                                no
                              </button>
                            </div>
                            {/* text area */}
                          </div>
                          {loadings && (
                            <>
                              {" "}
                              {helpFullStatus || helpFullGuestStatus ? (
                                <>
                                  {(helpFullStatus === 200 ||
                                    helpFullGuestStatus === 200) && (
                                    <>
                                      <div
                                        className="justify-center pt-3 mx-auto w-52"
                                        id="notifyBox"
                                      >
                                        <div
                                          className="px-4 py-3 text-teal-900 bg-green-200 border-t-4 border-green-400 rounded-b shadow-md"
                                          role="alert"
                                        >
                                          <div className="flex">
                                            <div>
                                              <p className="font-light ">
                                                Thanks for your feedback
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                  {(helpFullStatus === 404 ||
                                    helpFullGuestStatus === 404) && (
                                    <>
                                      <div
                                        className="justify-center pt-3 mx-auto w-52"
                                        id="notifyBox"
                                      >
                                        <div
                                          className="px-4 py-3 text-red-900 bg-red-200 border-t-4 border-red-400 rounded-b shadow-md"
                                          role="alert"
                                        >
                                          <div className="flex">
                                            <div>
                                              <p className="font-light ">
                                                Thanks for your feedback
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </>
                              ) : (
                                <div className="px-4 py-3">
                                  <div className="flex">
                                    <div className="w-full mx-auto my-auto">
                                      <LoadingNireeka className="w-5 h-5 border-gray-600" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {mes ? (
                          <div className="flex-col justify-center">
                            <form onSubmit={handleSubmit(handleSubmitForm)}>
                              <div className="relative mx-auto mb-3 w-w-90 md:w-w-152 md:1">
                                <div className="absolute hidden top-1/3 right-1/4 left-1/4">
                                  <div className="relative">
                                    <div className="flex justify-start p-2 w-52 emptyMsg ">
                                      <div className="py-1 ">
                                        <svg
                                          className="w-6 h-6 pl-2 mr-2 text-yellow-500 fill-current"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                                        </svg>
                                      </div>
                                      <h6 className="pt-0.5 text-gray-500 font-light">
                                        Please fill out this field.
                                      </h6>
                                    </div>
                                  </div>
                                </div>

                                <textarea
                                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded
                                    transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-customColorNIR focus:outline-none"
                                  rows="5"
                                  placeholder="Would you like to add a comment?"
                                  id="comment"
                                  name="comment"
                                  type="textarea"
                                  required
                                  {...register(`comment`, {
                                    required: {
                                      value: true,
                                      message: `comment is not valid.`,
                                    },
                                  })}
                                />
                              </div>
                              <div className="flex justify-center pt-2 mx-auto">
                                <button
                                  type="submit"
                                  className="w-2/12 px-3 py-2 mx-auto text-sm font-light transition-colors duration-150 bg-transparent border border-transparent rounded-md shadow-sm hover:text-white hover:bg-customColorNIR border-customColorNIR text-customColorNIR focus:outline-none focus:ring-2"
                                >
                                  Submit
                                </button>
                              </div>
                            </form>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                  </>
                )}

                {/* @endif */}

                {!isPageEmbedded && (
                  <div
                    className={` mt-8 py-10 border-t-2 ${
                      topics.data.related_topics.length === 0
                        ? ""
                        : " border-b border-gray-300 "
                    }`}
                  >
                    <h3 className="text-lg font-light text-gray-700">
                      Not found your answer? Open a
                      {/* <Link href="dashboard/support" passHref> */}
                      <button
                        type="button"
                        onClick={() => router.push("/dashboard/support")}
                        className="px-1 text-lg underline cursor-pointer text-sky-500 hover:text-indigo-600 text-b textHelpCenter"
                      >
                        ticket
                      </button>
                      in your dashboard under the support tab.
                    </h3>
                  </div>
                )}

                {!isPageEmbedded && topics.data.related_topics.length > 0 ? (
                  <div className={`"pb-2 mt-2 " ${Styles.tagLinksRelated}`}>
                    <div className="w-full mx-auto ">
                      <div className="flex-col pt-1 pb-2 text-left align-center">
                        <h2 className="py-2 text-3xl font-light ">
                          Related articles
                        </h2>
                      </div>
                    </div>
                    <div className="mx-auto ">
                      <div>
                        <div className="flex flex-wrap w-full px-0 py-0 mx-auto lg:px-2 md:w-full">
                          {topics.data.related_topics.map((related) => {
                            let str = related.title;
                            str = str.replace(/\s+/g, "-").toLowerCase();
                            str = str.replace(/\//g, "").toLowerCase();
                            str = str.replace(/["']/g, "").toLowerCase();
                            return (
                              <>
                                <div
                                  className="w-full p-3 md:w-1/2 "
                                  key={related.id}
                                >
                                  <Link
                                    href={`/help-center/topic/${related.slug}`}
                                    passHref
                                  >
                                    <a>
                                      <div className="h-40 px-6 pt-8 bg-white border rounded-md border-customColorNIR hover:border-indigo-700">
                                        <h6 className="text-xl font-light text-left">
                                          {/* {{ $topicRelated->title }} */}
                                          {related.title}
                                        </h6>
                                        <p className="pt-2 text-sm font-light text-gray-500 ">
                                          {/* {{ $topicRelated->getDescription(40) }} */}
                                          {related.description}
                                        </p>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                              </>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}

                {/* @endif */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// href={{
//   pathname: '/help-center/category/[slug]/[seprate]',
//   query: { slug: topics.data.breadcrumbs.parent.slug ,seprate:topics.data.topic.title  }
// }}
