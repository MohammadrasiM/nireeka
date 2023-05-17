import { useState } from "react";
import { toast } from "react-toastify";
import { claimChallengeById } from "../../../app/api/challenges";
import classNames from "../../../functions/classNames";
import LoadingNireeka from "../../Atoms/LoadingNireeka";

const ChallengeTableRow = (props) => {
  const [isClaimingLoading, setIsClaimingLoading] = useState(false);
  const handleClaimClick = async () => {
    try {
      setIsClaimingLoading(true);
      const res = await claimChallengeById(props.challenge.id);
      toast.success("Challenge claimed successfully");
      props.updateUI();
    }  catch (error) {
      console.log("Error in message field:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Sorry, we couldn't check. Try again later.");
      }
    } finally {
      setIsClaimingLoading(false);
    }
  };

  return (
    <tr className="bg-white">
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="flex">
          <p className="text-gray-900 truncate group-hover:text-gray-900 font-bold">
            {props.challenge.title}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <div className="flex">
          <p className="text-gray-900 truncate group-hover:text-gray-900 font-bold">
            {props.challenge.score}
          </p>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <div className="flex">
          <button
            className={classNames(
              "relative inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md border-green-300 text-green-800  hover:bg-white disabled:text-gray-600 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-500",
              !props.challenge.is_claim && "bg-green-100",
              props.challenge.is_claim && "cursor-default"
            )}
            onClick={props.challenge.is_claim ? () => {} : handleClaimClick}
            disabled={isClaimingLoading}
          >
            {" "}
            {isClaimingLoading && <LoadingNireeka className="w-4 h-4 border-gray-600 mr-2" />}
            {props.challenge.is_claim
              ? "Claimed"
              : isClaimingLoading
              ? "Checking..."
              : "Claim"}{" "}
          </button>
        </div>
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
        <span className="text-gray-900">{props.challenge.expire_date}</span>
      </td>
    </tr>
  );
};

export default ChallengeTableRow;
