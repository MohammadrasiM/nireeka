import { ChevronLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import classNames from "../../functions/classNames";

const BackButton = (props) => {
  const router = useRouter();

  const backButtonClickHandler = () => {
    if (router.asPath === "/forum/1") router.push("/");
    else router.back();
  };

  return (
    <div
      onClick={backButtonClickHandler}
      className={classNames("flex justify-center items-center py-4 text-gray-800", props.className)}
    >
      <div className="mr-auto cursor-pointer">
        <ChevronLeftIcon className="w-6 h-6 icon-stroke-width-1" />
      </div>
    </div>
  );
};

export default BackButton;
