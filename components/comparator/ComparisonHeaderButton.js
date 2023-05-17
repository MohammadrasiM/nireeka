import { setBikes } from "app/store/comparisonSlice";
import classNames from "functions/classNames";
import Link from "next/link";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useComparator } from "services/comparator";
import ComparisonIcon from "../svg/ComparisonIcon";

const ComparisonHeaderButton = (props) => {
  const dispatch = useDispatch();

  const { comparator } = useComparator();
  const comparisonBikes = useSelector((state) => state.comparison.bikes);

  const getComparisonSize = useCallback(async () => {
    if (!comparator) return;

    const bikes = await comparator.getBikes();
    dispatch(setBikes(bikes));
  }, [dispatch, comparator]);

  useEffect(() => {
    getComparisonSize();
  }, [getComparisonSize]);

  return (
    <div className="relative my-auto">
      <div className={classNames("max-w-xs flex text-sm rounded-full cursor-pointer relative px-1")}>
        <Link href="/compare" passHref>
          <a className="w-full">
            {!!comparisonBikes && !!comparisonBikes.length && (
              <span className="absolute w-3 h-3 p-2 rounded-full bg-red-500 -top-2 -left-2 text-[0.7rem] text-white flex items-center justify-center">
                {comparisonBikes.length}
              </span>
            )}
            <span className="sr-only">Open Comparison</span>
            <ComparisonIcon
              className={(props.className, "icon-stroke-width-1 w-4 h-4")}
              fill={props.fill || "#6b7280"}
            />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default ComparisonHeaderButton;
