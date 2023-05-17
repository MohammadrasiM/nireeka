import React, { useState } from "react";
import dynamic from "next/dynamic";
import StarIcon from "@heroicons/react/solid/StarIcon";
import classNames from "functions/classNames";
import StarRatings from "react-star-ratings";
import WhiteShadowCard from "@/components/Atoms/cards/WhiteShadowCard";
import GalleryThumbnail from "@/components/configurator/gallery/GalleryThumbnail";
import ConfiguratorHeader from "@/components/configurator/header/ConfiguratorHeader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config";
import useWindowSize from "hooks/useWindowSize";
import { useSelector } from "react-redux";
import range from "lodash/range";
import find from "lodash/find";
import take from "lodash/take";
import Avatar from "@/components/Atoms/people/Avatar";
import CountryBadge from "@/components/Atoms/people/CountryBadge";
import Link from "next/link";

const ConfiguratorAddReview = dynamic(() => import("./ConfiguratorAddReview"), {
  ssr: false,
});
const ReviewItemMenu = dynamic(() => import("@/components/configurator/menu/ReviewItemMenu"), { ssr: false });
const BlurBackdrop = dynamic(() => import("@/components/Atoms/overlays/BlurBackdrop"), { ssr: false });

const fullConfig = resolveConfig(tailwindConfig);
const mdScreenBreakPointInPixels = parseInt(fullConfig.theme.screens.sm);

const ConfiguratorFeatureTab = () => {
  const [reviewData, setReviewData] = useState(undefined);
  const [open, setOpen] = useState(false);
  const windowsSize = useWindowSize();
  const configuratorData = useSelector((state) => state?.configurator.configuratorData);
  const userData = useSelector((state) => state?.auth.userData);

  const collapse = () => setOpen((prevState) => !prevState);

  const onCloseModal = () => {
    document.getElementsByTagName("body")[0].style.overflow = "auto";
    setReviewData(undefined);
  };

  if (!!reviewData && windowsSize.width >= mdScreenBreakPointInPixels)
    return (
      <ConfiguratorAddReview
        isNew={reviewData === "new"}
        editData={reviewData !== "new" ? reviewData : undefined}
        onClose={() => setReviewData(undefined)}
      />
    );

  return (
    <section id="review" className="mt-[100px]">
      <ConfiguratorHeader>review</ConfiguratorHeader>
      <div className="flex flex-col items-start pb-40">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:max-w-7xl lg:gap-x-8 lg:px-8">
          <div className="col-span-5">
            <h2 className="text-2xl font-normal tracking-tight text-gray-900">Customer Reviews</h2>
            <div className="mt-3 flex items-center">
              <div>
                <div className="flex items-center">
                  <StarRatings
                    starDimension="1.25rem"
                    numberOfStars={5}
                    starEmptyColor="#d1d5db"
                    starSpacing="0.05rem"
                    svgIconViewBox="0 0 20 20"
                    svgIconPath="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    rating={configuratorData?.rating_value ? configuratorData?.rating_value : 5}
                    starRatedColor="#facc15"
                  />
                </div>
                <p className="sr-only">{configuratorData?.rating_value} out of 5 stars</p>
              </div>
              <p className="ml-2 text-sm text-gray-900">Based on {configuratorData?.count_reviews} reviews</p>
            </div>
            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>
              <dl className="space-y-3">
                {range(5, 0).map((rate) => {
                  const count = find(configuratorData?.rating_group, ["rating", rate])?.count || 0;
                  return (
                    <div key={rate} className="flex items-center text-sm">
                      <dt className="flex flex-1 items-center">
                        <p className="w-3 font-medium text-gray-900">
                          {rate}
                          <span className="sr-only"> star reviews</span>
                        </p>
                        <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                          <StarIcon
                            className={classNames(
                              count > 0 ? "text-yellow-400" : "text-gray-300",
                              "flex-shrink-0 h-5 w-5"
                            )}
                            aria-hidden="true"
                          />

                          <div className="relative ml-3 flex-1">
                            <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                            {count > 0 ? (
                              <div
                                className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                style={{
                                  width: `calc(${count} / ${configuratorData?.count_rating} * 100%)`,
                                }}
                              />
                            ) : null}
                          </div>
                        </div>
                      </dt>
                      <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                        {Math.round((count / configuratorData?.count_rating || 0) * 100)}%
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>
          {!!configuratorData?.rate_user ? (
            <div className="mt-10 lg:col-span-6 lg:col-start-7">
              <p className="mt-1 text-sm text-gray-900">
                Thanks for sharing your thoughts. We appreciate your feedback.
              </p>
            </div>
          ) : (
            <div className="mt-10 lg:col-span-6 lg:col-start-7">
              <h3 className="text-lg font-medium text-gray-900">Share your thoughts</h3>
              <p className="mt-1 text-sm text-gray-600">
                {configuratorData?.has_bike
                  ? " If you’ve used this product, share your thoughts with other customers"
                  : "You need to be a customer of this specific product and already received the product to be able to leave a review here."}
              </p>
              <button
                onClick={() => setReviewData("new")}
                disabled={!configuratorData?.has_bike || !!configuratorData?.rate_user}
                className={classNames(
                  "mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-gray-50 py-2 px-8 text-sm text-gray-400 font-medium sm:w-auto lg:w-full cursor-not-allowed",
                  configuratorData?.has_bike &&
                    !configuratorData?.rate_user &&
                    "bg-white text-gray-900 hover:bg-gray-50 cursor-pointer"
                )}
              >
                Write a review
              </button>
            </div>
          )}
        </div>
        <div className="mt-16 w-full">
          <h3 className="sr-only">Recent reviews</h3>
          <div className="flow-root">
            <div className="-my-12 divide-y divide-gray-200">
              {(!open ? take(configuratorData?.reviews?.items, 3) : configuratorData?.reviews?.items)?.map((review) => {
                console.log("review", review);
                debugger;

                return (
                  <div key={review.id} className="py-12 px-6 md:px-0">
                    <div className="flex flex-row items-center justify-between w-full">
                      <div className="flex items-center">
                        {/* <img src={review?.user?.avatar} alt={`${review?.user?.full_name}.`} className="h-12 w-12 rounded-full" /> */}
                        <div className="basis-10 mr-2 mt-1">
                          <Avatar user={review?.user} />
                        </div>
                        {/* Country flag */}

                        <div className="ml-4">
                          <Link href={`/profile/${review?.user?.id}`} passHref>
                            <a>
                              <h4 className=" cursor-pointer text-sm font-normal text-gray-900">
                                {review?.user?.full_name}
                              </h4>
                            </a>
                          </Link>
                          <div className="mt-1 flex items-center">
                            {range(1, 6).map((rating) => (
                              <StarIcon
                                key={rating}
                                className={classNames(
                                  review.rating >= rating ? "text-yellow-400" : "text-gray-300",
                                  "h-5 w-5 flex-shrink-0"
                                )}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <p className="sr-only">{review.rating} out of 5 stars</p>
                        </div>
                      </div>
                      <div className="flex flex-row space-x-2">
                        <span className="text-xs font-light text-gray-500">{review?.created_at}</span>
                        {userData?.id === review?.user?.id && (
                          <ReviewItemMenu review={review} onEdit={() => setReviewData(review)} />
                        )}
                      </div>
                    </div>
                    <div className="my-2  flex justify-between">
                      <h5 className="text-lg font-semibold text-gray-700"> {review?.title}</h5>
                      {!!(review.user.show_country && review.user.country.image_path) && (
                        <div className="flex items-center ml-auto px-4">
                          <CountryBadge src={review.user.country.image_path} />
                        </div>
                      )}
                    </div>
                    <p className="my-2 text-base font-light italic text-gray-600">{review?.body}</p>
                    <div className="flex flex-row flex-wrap items-center space-x-4">
                      {review?.files?.map((picture, index) => (
                        <GalleryThumbnail key={index} src={picture.thumbnail} alt={picture.title} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            {configuratorData?.reviews?.items?.length > 3 && (
              <div className="flex flex-row justify-center items-center my-10">
                <button
                  onClick={collapse}
                  className="mr-3 px-20 py-2 text-xs sm:text-sm font-medium text-[14px] text-indigo-600 bg-white border border-indigo-600 rounded-md shadow-sm hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  {open ? "Show Less" : `Show More (${configuratorData?.reviews?.items?.length - 3})`}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <BlurBackdrop
        isVisible={!!reviewData}
        onClose={setReviewData}
        backdropColorClass="bg-black/40"
        noXButton
        className="relative w-full mx-auto h-inherit top-7 md:max-w-3xl"
        customStyle={{ width: "calc(100% - 1rem)", overflowY: "hidden" }}
      >
        <WhiteShadowCard>
          <ConfiguratorAddReview
            isNew={reviewData === "new"}
            editData={reviewData !== "new" ? reviewData : undefined}
            onClose={onCloseModal}
          />
        </WhiteShadowCard>
      </BlurBackdrop>
    </section>
  );
};

export default ConfiguratorFeatureTab;
