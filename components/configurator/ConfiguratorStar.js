import StarIcon from '@heroicons/react/solid/StarIcon'
import range from "lodash/range";
import {useSelector} from "react-redux";

export default function ConfiguratorStar({onReview}) {
    const configuratorData = useSelector((state) => state?.configurator.configuratorData);
    const userRating = configuratorData?.rate_user ? configuratorData?.rate_user : configuratorData?.rating_value || 5

    return (
    <div className="flex flex-col items-start bg-zinc-50 rounded-md rounded-b-none border border-b-0 border-gray-200 py-8 px-6">
        <span className="text-sm text-left text-gray-900 font-semibold">{!!configuratorData?.rating_value ? `${configuratorData?.rating_value} out of 5` : 'No review yet'}</span>
        {!!configuratorData?.count_recommended && (
            <p className="text-sm font-medium text-gray-600 cursor-pointer">
                Highly Recommended by {configuratorData?.count_recommended} people
            </p>
        )}
      <div className="my-3 flex items-center">
        {range(0,5)?.map((rating) => {
            const diff = userRating - rating
            const filled = diff < 0 ? 0 : diff >= 1 ? 1 : diff;
            return (
                <div key={rating} className="h-6 w-6 mr-1 relative">
                    <StarIcon className="h-6 w-6 flex-shrink-0 text-white p-1 absolute z-20" aria-hidden="true"/>
                    <span className="h-6 bg-[#16AB67] block absolute top-0 left-0" style={{width: `${filled * 100}%`}}></span>
                    <span className="h-6 bg-gray-300 block absolute top-0 right-0" style={{width: `${(1 - filled) * 100}%`}}></span>
                </div>
            )
        })}
      </div>
      <div className="flex flex-row items-center justify-start border-gray-200 border-b pb-6 w-full text-base md:text-xs lg:text-base">
          <a href="#review" onClick={onReview} className="underline text-blue-700">{configuratorData?.count_reviews || 'No'} Review{configuratorData?.count_reviews > 1 ? 's' : ''}</a>
        <span className="mx-2 text-gray-500">/</span>
          {configuratorData?.has_bike && !configuratorData?.rate_user ? (
              <a href="#review" onClick={onReview} className="underline text-blue-700 cursor-pointer">Write a Review</a>
          ) : (
              <span className="text-gray-600">Write a Review</span>
          )}
      </div>
    </div>
  );
}
